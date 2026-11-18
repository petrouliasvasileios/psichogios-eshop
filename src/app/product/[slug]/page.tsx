import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import { CAT, PARENT_OF } from "@/lib/categories";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";
import { getProductBySlug, getProducts } from "@/lib/woo";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  const desc = p.shortDescription.slice(0, 160);
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: p.name, description: desc, images: p.image ? [p.image] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const catSlug = p.categories[0]?.slug;
  const related = catSlug ? (await getProducts({ category: catSlug, perPage: 5 })).filter((r) => r.id !== p.id).slice(0, 4) : [];
  const parentSlug = catSlug ? PARENT_OF[catSlug] : undefined;
  const parent = parentSlug ? CAT[parentSlug] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.image ? [p.image] : [],
    description: p.shortDescription,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: p.price.toFixed(2),
      priceCurrency: "EUR",
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-sm text-ink/60">
        <Link href="/" className="hover:text-brand">Αρχική</Link>
        {parent && <> / <Link href={`/category/${parent.slug}`} className="hover:text-brand">{parent.name}</Link></>}
        {catSlug && CAT[catSlug] && <> / <Link href={`/category/${catSlug}`} className="hover:text-brand">{CAT[catSlug].name}</Link></>}
        {" / "}<span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="aspect-square">
            <SafeImage src={p.image} alt={p.imageAlt ?? p.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl">{p.name}</h1>

          <div className="mt-5 flex items-end gap-3">
            {p.onSale && p.regularPrice > p.price && (
              <span className="text-lg text-ink/40 line-through">{eur(p.regularPrice)}</span>
            )}
            <span className="text-4xl font-bold text-brand">{eur(p.price)}</span>
            <span className="pb-1.5 text-ink/60">{SITE.priceSuffix}</span>
          </div>

          {p.shortDescription && <p className="mt-5 leading-relaxed text-ink-soft">{p.shortDescription}</p>}

          <div className="mt-7"><AddToCart product={p} /></div>

          <ul className="mt-7 space-y-2 rounded-2xl bg-white p-5 text-sm text-ink-soft shadow-sm">
            <li>✓ Κοπή την ημέρα της παραγγελίας</li>
            <li>✓ Δωρεάν μεταφορικά εντός Αττικής άνω των {SITE.freeShippingFrom}€</li>
            <li>✓ Η τελική χρέωση γίνεται στο πραγματικό βάρος κατά την κοπή</li>
            <li>✓ Τηλεφωνικές παραγγελίες: {SITE.phones.join(" · ")}</li>
          </ul>
        </div>
      </div>

      {p.description && (
        <section className="mt-12">
          <h2 className="section-title !text-left">Περιγραφή</h2>
          <div className="prose-psichogios max-w-none" dangerouslySetInnerHTML={{ __html: p.description }} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title">Σχετικά προϊόντα</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
