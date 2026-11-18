/**
 * Άρθρα από το WordPress (headless), μέσω του δημόσιου REST API.
 * Στις 17/11/2026 δεν υπάρχει κανένα δημοσιευμένο άρθρο — η σελίδα δείχνει
 * μήνυμα «σύντομα» και γεμίζει μόνη της μόλις δημοσιευτεί το πρώτο.
 */

const BASE = process.env.NEXT_PUBLIC_WC_BASE_URL ?? "https://shop.psichogiosmeat.gr";
const API = `${BASE}/wp-json/wp/v2`;
const REVALIDATE = 600;

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  imageAlt?: string;
};

type Raw = {
  id: number; slug: string; date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[];
  };
};

const strip = (html: string) =>
  html.replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#8217;/g, "’")
    .replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();

const decode = (html: string) =>
  html.replace(/&amp;/g, "&").replace(/&#8217;/g, "’").replace(/&#8211;/g, "–")
    .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function map(p: Raw): Post {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: p.id,
    slug: p.slug,
    title: decode(p.title.rendered),
    excerpt: strip(p.excerpt.rendered),
    content: p.content.rendered,
    date: p.date,
    image: media?.source_url,
    imageAlt: media?.alt_text || decode(p.title.rendered),
  };
}

async function get(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${API}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getPosts(perPage = 12): Promise<Post[]> {
  const data = await get("/posts", { per_page: perPage, _embed: "wp:featuredmedia" });
  return Array.isArray(data) ? data.map(map) : [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await get("/posts", { slug, _embed: "wp:featuredmedia" });
  return Array.isArray(data) && data[0] ? map(data[0]) : null;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" });
