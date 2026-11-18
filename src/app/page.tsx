import Link from "next/link";
import BadgesStrip from "@/components/BadgesStrip";
import HeroVideo from "@/components/HeroVideo";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import SuppliersCarousel from "@/components/SuppliersCarousel";
import { CAT, KREATA_GROUPS } from "@/lib/categories";
import { BANNERS } from "@/lib/data";
import { getProducts } from "@/lib/woo";

export const revalidate = 600;

const TILES = [CAT.premium, ...KREATA_GROUPS.map((g) => CAT[g.slug]), CAT.kreatoskevasmata, CAT.katepsygmena];

export default async function Home() {
  const [premium, latest, kreatoskevasmata] = await Promise.all([
    getProducts({ category: "premium", perPage: 8 }),
    getProducts({ perPage: 10, orderby: "date", order: "desc" }),
    getProducts({ category: "kreatoskevasmata", perPage: 5 }),
  ]);

  return (
    <>
      <HeroVideo />

      {/* Σηματάκια + λωρίδα που ρολάρει — full bleed */}
      <BadgesStrip />
      <Marquee />

      {/* Κατηγορίες */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="section-title">Οι κατηγορίες μας</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {TILES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`}
              className="group flex flex-col items-center justify-center rounded-2xl border border-ink/10 bg-white px-4 py-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand hover:shadow-xl">
              <span className="font-serif text-lg font-bold leading-tight text-ink transition group-hover:text-brand">{c.name}</span>
              <span className="mt-1 text-xs text-ink/50">{c.count} προϊόντα</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Premium — full bleed σκούρα ζώνη */}
      {premium.length > 0 && (
        <section className="bg-slate-board py-20">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Premium κοπές</span>
                <h2 className="mt-2 text-3xl text-white sm:text-4xl">Για τους γνώστες της σχάρας</h2>
              </div>
              <Link href="/category/premium"
                className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-ink">
                Όλα τα Premium
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {premium.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Νέα προϊόντα */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
          <h2 className="section-title">Νέα προϊόντα</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {latest.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-10 text-center"><Link href="/shop" className="btn-outline">Όλα τα προϊόντα</Link></div>
        </section>
      )}

      {/* Εργαστήριο — full bleed */}
      {kreatoskevasmata.length > 0 && (
        <section className="bg-cream-dark py-20">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <h2 className="section-title">Από το παραδοσιακό μας εργαστήριο</h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-ink-soft">
              Σουβλάκια, κιμάδες, λουκάνικα και ρολά που φτιάχνονται καθημερινά στο δικό μας εργαστήριο.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {kreatoskevasmata.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Banners */}
      <section className="mx-auto grid max-w-[1600px] gap-5 px-5 py-20 sm:px-8 md:grid-cols-3 lg:px-12">
        {BANNERS.map((b) => (
          <Link key={b.title} href={b.href} className="group relative overflow-hidden rounded-3xl shadow-sm">
            <div className="aspect-[16/10]">
              <SafeImage src={b.img} alt={b.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 to-transparent p-6 font-serif text-2xl text-white">
              {b.title}
            </span>
          </Link>
        ))}
      </section>

      {/* Προμηθευτές — full bleed */}
      <section className="border-y border-ink/10 bg-white py-20">
        <div className="mx-auto max-w-[1600px] px-8 sm:px-12 lg:px-16">
          <h2 className="section-title">Οι προμηθευτές μας</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-ink-soft">
            Στηρίζουμε την ελληνική κτηνοτροφία και συνεργαζόμαστε με σταθερούς παραγωγούς,
            ελληνικές φάρμες και επιλεγμένα σφαγεία.
          </p>
          <SuppliersCarousel />
        </div>
      </section>

      {/* Ιστορία — full bleed με φωτογραφία */}
      <section className="relative isolate overflow-hidden bg-ink py-24">
        <div className="absolute inset-0 opacity-20">
          <SafeImage src="https://www.psichogiosmeat.gr/image/catalog/slider/slide_5.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Η ιστορία μας</span>
          <h2 className="mt-3 text-3xl text-white sm:text-4xl">Τρεις γενιές κρεοπώλες στη Λυκόβρυση</h2>
          <p className="mt-5 leading-relaxed text-cream/80">
            Η οικογενειακή μας επιχείρηση ιδρύθηκε το 1952 στη Λυκόβρυση Αττικής από τον παππού Δημήτρη Ψυχογυιό και
            τη σύζυγό του. Τρεις γενιές αργότερα, συνεχίζουμε με την ίδια αρχή: επιλεγμένο κρέας από ελληνικές φάρμες
            και σφαγεία, κοπή στο παραδοσιακό μας εργαστήριο και εξυπηρέτηση που θυμίζει γειτονιά.
          </p>
          <Link href="/epikoinonia" className="btn-gold mt-8">Ελάτε να μας γνωρίσετε</Link>
        </div>
      </section>
    </>
  );
}
