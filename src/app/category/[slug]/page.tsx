import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { ALL_CATEGORIES, CAT, PARENT_OF, childrenOf, getCategory } from "@/lib/categories";
import { SORTS, parsePrice, type SearchParams } from "@/lib/filters";
import { getProducts } from "@/lib/woo";

export const revalidate = 600;

export function generateStaticParams() {
  return ALL_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.name} – φρέσκο κρέας από τον ΨΥΧΟΓΥΙΟ Delicatessen, με παράδοση στην Αττική.`,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params, searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const cat = getCategory(slug);
  if (!cat) notFound();

  const [orderby, order] = (sp.sort ?? "date-desc").split("-") as ["date" | "price" | "title", "asc" | "desc"];
  const { minPrice, maxPrice } = parsePrice(sp.price);

  const products = await getProducts({
    category: slug,
    onSale: sp.offers === "1",
    minPrice,
    maxPrice,
    orderby,
    order,
    perPage: 48,
  });

  const kids = childrenOf(slug);
  const parentSlug = PARENT_OF[slug];
  const parent = parentSlug ? CAT[parentSlug] : undefined;
  const grandparentSlug = parentSlug ? PARENT_OF[parentSlug] : undefined;
  const grandparent = grandparentSlug ? CAT[grandparentSlug] : undefined;
  const base = `/category/${slug}`;

  const link = (patch: Partial<SearchParams>) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) params.set(k, String(v));
    return params.toString() ? `${base}?${params}` : base;
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12">
      <nav className="mb-4 text-sm text-ink/60">
        <Link href="/" className="hover:text-brand">Αρχική</Link>
        {grandparent && <> / <Link href={`/category/${grandparent.slug}`} className="hover:text-brand">{grandparent.name}</Link></>}
        {parent && <> / <Link href={`/category/${parent.slug}`} className="hover:text-brand">{parent.name}</Link></>}
        {" / "}<span className="text-ink">{cat.name}</span>
      </nav>

      <h1 className="text-3xl sm:text-5xl">{cat.name}</h1>
      <p className="mt-4 text-ink/50">{products.length || cat.count} προϊόντα</p>

      {kids.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {kids.map((k) => (
            <Link key={k.slug} href={`/category/${k.slug}`}
              className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand hover:text-brand">
              {k.name} <span className="text-ink/40">{k.count}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 gap-10 lg:grid lg:grid-cols-[17rem_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar base="/shop" sp={{ ...sp, cat: slug }} />
        </div>
        <details className="mb-6 rounded-2xl border border-ink/15 bg-white p-4 lg:hidden">
          <summary className="cursor-pointer list-none font-serif font-bold [&::-webkit-details-marker]:hidden">
            Φίλτρα ⌄
          </summary>
          <div className="mt-2"><FilterSidebar base="/shop" sp={{ ...sp, cat: slug }} /></div>
        </details>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-ink/50">Ταξινόμηση:</span>
            {SORTS.map((s) => (
              <Link key={s.key} href={link({ sort: s.key })}
                className={`rounded-full px-3 py-1.5 transition ${
                  (sp.sort ?? "date-desc") === s.key ? "bg-ink text-white" : "bg-white text-ink-soft hover:text-brand"
                }`}>
                {s.label}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="rounded-2xl bg-white p-12 text-center text-ink/60">
              Δεν βρέθηκαν προϊόντα με αυτά τα φίλτρα.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
