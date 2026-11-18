import type { MetadataRoute } from "next";
import { ALL_CATEGORIES } from "@/lib/categories";
import { getAllProductSlugs } from "@/lib/woo";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, posts] = await Promise.all([getAllProductSlugs(), getPosts(50)]);
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/shop`, priority: 0.9 },
    { url: `${BASE}/etairia`, priority: 0.7 },
    { url: `${BASE}/chondriki`, priority: 0.7 },
    { url: `${BASE}/blog`, priority: 0.7 },
    { url: `${BASE}/epikoinonia`, priority: 0.5 },
    { url: `${BASE}/apostoles`, priority: 0.5 },
    { url: `${BASE}/tropoi-pliromis`, priority: 0.5 },
    { url: `${BASE}/syxnes-erotiseis`, priority: 0.5 },
    { url: `${BASE}/epistrofes`, priority: 0.3 },
    { url: `${BASE}/oroi-xrisis`, priority: 0.3 },
    { url: `${BASE}/aporrito`, priority: 0.3 },
    ...ALL_CATEGORIES.map((c) => ({ url: `${BASE}/category/${c.slug}`, priority: 0.8 })),
    ...slugs.map((s) => ({ url: `${BASE}/product/${s}`, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, priority: 0.6 })),
  ];
}
