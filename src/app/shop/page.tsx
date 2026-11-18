import type { Metadata } from "next";
import Link from "next/link";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { SORTS, parsePrice, type SearchParams } from "@/lib/filters";
import { getCategory } from "@/lib/categories";
import { getProducts } from "@/lib/woo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Κρεατικά — Μοσχάρι, Χοιρινό, Πουλερικά & Premium Κρέατα",
  description:
    "Ο πλήρης κατάλογος του ΨΥΧΟΓΥΙΟΣ Delicatessen: μοσχάρι, χοιρινό, πουλερικά, αμνοερίφια, κρεατοσκευάσματα και premium κοπές, με παράδοση στην Αττική.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const [orderby, order] = (sp.sort ?? "date-desc").split("-") as ["date" | "price" | "title", "asc" | "desc"];
  const { minPrice, maxPrice } = parsePrice(sp.price);

  const products = await getProducts({
    search: sp.q,
    category: sp.cat,
    onSale: sp.offers === "1",
    minPrice,
    maxPrice,
    orderby,
    order,
    perPage: 48,
  });

  const cat = sp.cat ? getCategory(sp.cat) : undefined;
  const title = sp.q
    ? `Αναζήτηση: «${sp.q}»`
    : sp.offers === "1"
      ? "Προσφορές"
      : cat
        ? cat.name
        : "Κρεατικά — Μοσχάρι, Χοιρινό, Πουλερικά & Premium Κρέατα";

  const link = (patch: Partial<SearchParams>) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) params.set(k, String(v));
    return params.toString() ? `/shop?${params}` : "/shop";
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12">
      <h1 className="max-w-3xl text-3xl leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 text-ink/50">{products.length} προϊόντα</p>

      <div className="mt-8 gap-10 lg:grid lg:grid-cols-[17rem_1fr]">
        {/* Φίλτρα: πλαϊνά σε desktop, πτυσσόμενα σε κινητό */}
        <div className="hidden lg:block">
          <FilterSidebar base="/shop" sp={sp} />
        </div>
        <details className="mb-6 rounded-2xl border border-ink/15 bg-white p-4 lg:hidden">
          <summary className="cursor-pointer list-none font-serif font-bold [&::-webkit-details-marker]:hidden">
            Φίλτρα ⌄
          </summary>
          <div className="mt-2"><FilterSidebar base="/shop" sp={sp} /></div>
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
