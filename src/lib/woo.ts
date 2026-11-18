/**
 * Ζωντανά δεδομένα από το WooCommerce Store API (δημόσιο, read-only).
 * Τρέχει μόνο server-side. Τα αποτελέσματα κρατιούνται σε cache για 10 λεπτά.
 */

import { CAT } from "./categories";

const BASE = process.env.NEXT_PUBLIC_WC_BASE_URL ?? "https://shop.psichogiosmeat.gr";
const API = `${BASE}/wp-json/wc/store/v1`;
const REVALIDATE = 600;

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  regularPrice: number;
  onSale: boolean;
  image?: string;
  thumbnail?: string;
  imageAlt?: string;
  categories: { id: number; name: string; slug: string }[];
  shortDescription: string;
  description: string;
  inStock: boolean;
  permalink: string;
};

type RawPrices = { price: string; regular_price: string; currency_minor_unit: number };
type RawProduct = {
  id: number; name: string; slug: string; permalink: string;
  short_description: string; description: string; on_sale: boolean; is_in_stock: boolean;
  prices: RawPrices;
  images: { src: string; thumbnail: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
};

const money = (v: string, minor: number) => Number(v) / 10 ** minor;

const strip = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
      .replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();

function map(p: RawProduct): Product {
  const minor = p.prices?.currency_minor_unit ?? 2;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: money(p.prices.price, minor),
    regularPrice: money(p.prices.regular_price, minor),
    onSale: p.on_sale,
    image: p.images?.[0]?.src,
    thumbnail: p.images?.[0]?.thumbnail ?? p.images?.[0]?.src,
    imageAlt: p.images?.[0]?.alt || p.name,
    categories: p.categories ?? [],
    shortDescription: strip(p.short_description ?? ""),
    description: p.description ?? "",
    inStock: p.is_in_stock,
    permalink: p.permalink,
  };
}

async function get(path: string, params: Record<string, string | number | undefined> = {}) {
  const url = new URL(`${API}${path}`);
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, String(v));
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Χωρίς δίκτυο ή αν το shop δεν απαντά: η σελίδα δείχνει άδειο κατάλογο αντί για σφάλμα.
    return null;
  }
}

export async function getProducts(opts: {
  category?: string; // slug
  search?: string;
  perPage?: number;
  page?: number;
  onSale?: boolean;
  /** Σε λεπτά του ευρώ, όπως τα θέλει το Store API. */
  minPrice?: number;
  maxPrice?: number;
  orderby?: "date" | "price" | "popularity" | "title";
  order?: "asc" | "desc";
} = {}): Promise<Product[]> {
  const id = opts.category ? CAT[opts.category]?.id : undefined;
  const data = await get("/products", {
    category: id,
    search: opts.search || undefined,
    per_page: opts.perPage ?? 24,
    page: opts.page ?? 1,
    on_sale: opts.onSale ? "true" : undefined,
    min_price: opts.minPrice,
    max_price: opts.maxPrice,
    orderby: opts.orderby,
    order: opts.order,
  });
  return Array.isArray(data) ? data.map(map) : [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await get("/products", { slug, per_page: 1 });
  return Array.isArray(data) && data[0] ? map(data[0]) : null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const out: string[] = [];
  for (let page = 1; page <= 2; page++) {
    const data = await get("/products", { per_page: 100, page });
    if (!Array.isArray(data) || data.length === 0) break;
    out.push(...data.map((p: RawProduct) => p.slug));
    if (data.length < 100) break;
  }
  return out;
}
