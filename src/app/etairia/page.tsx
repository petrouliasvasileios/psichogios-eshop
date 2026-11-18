import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { DeliveryCheckerButton } from "@/components/DeliveryChecker";
import {
  COMPANY_IMAGES as IMG, FACILITIES, MILESTONES, PARTNER_REGIONS, SITE, VALUES,
} from "@/lib/data";

const YEARS = new Date().getFullYear() - SITE.founded;

export const metadata: Metadata = {
  title: "Η εταιρία μας — Σχετικά με εμάς",
  description:
    `Η οικογενειακή επιχείρηση ΨΥΧΟΓΥΙΟΣ ιδρύθηκε το ${SITE.founded} στη Λυκόβρυση Αττικής. ` +
    "Τρεις γενιές στην εκτροφή και εμπορία κρέατος και πουλερικών, με αποκλειστικά ελληνική προέλευση.",
  alternates: { canonical: "/etairia" },
};

export default function CompanyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      foundingDate: String(SITE.founded),
      founder: { "@type": "Person", name: "Δημήτρης Ψυχογυιός" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Λεωφόρος Σοφοκλή Βενιζέλου 92",
        addressLocality: "Λυκόβρυση",
        addressRegion: "Αττική",
        addressCountry: "GR",
      },
      telephone: SITE.phones[0],
      email: SITE.email,
      logo: SITE.logo,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-30">
          <SafeImage src={IMG.hero} fallback={IMG.heroFallback} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

        <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Η εταιρία μας</span>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl">
            {YEARS} χρόνια κρέας με ελληνική σφραγίδα
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">
            Η οικογενειακή επιχείρηση εκτροφής και εμπορίας πουλερικών ΨΥΧΟΓΥΙΟΣ ιδρύθηκε το {SITE.founded}
            {" "}στη Λυκόβρυση Αττικής, από τον παππού Δημήτρη Ψυχογυιό και τη σύζυγό του. Τρεις γενιές
            αργότερα, συνεχίζουμε να προμηθεύουμε το ελληνικό κοινό με κρέατα και πουλερικά εξαιρετικής
            ποιότητας.
          </p>
        </div>
      </section>

      {/* ΙΣΤΟΡΙΚΟ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="section-title">Η διαδρομή μας</h2>
        <ol className="relative mt-14 space-y-10 border-l-2 border-cream-dark pl-8 lg:space-y-14 lg:pl-12">
          {MILESTONES.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[2.6rem] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white lg:-left-[3.6rem] lg:h-9 lg:w-9">
                ●
              </span>
              <span className="font-serif text-3xl text-gold lg:text-4xl">{m.year}</span>
              <h3 className="mt-1 text-xl lg:text-2xl">{m.title}</h3>
              <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ΣΥΝΕΡΓΑΤΕΣ */}
      <section className="bg-slate-board py-20 text-white">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
              Από πού έρχεται το κρέας μας
            </span>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl">Μικρές ελληνικές φάρμες</h2>
            <p className="mt-5 leading-relaxed text-cream/80">
              Για να ανταποκριθούμε στη ζήτηση χωρίς να υποχωρήσουμε στην ποιότητα, εγκαινιάσαμε
              συνεργασίες με πιστοποιημένους κρεοπαραγωγούς και μικρές ελληνικές οικογενειακές φάρμες,
              που μοιράζονται την ίδια φιλοσοφία με εμάς: αγνά και γευστικά κρέατα, παραγμένα υπό
              άρτιες υγειονομικά συνθήκες.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {PARTNER_REGIONS.map((r) => (
                <li key={r} className="rounded-full border border-white/25 px-4 py-2 text-sm">
                  📍 {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <div className="aspect-[4/3]">
              <SafeImage src={IMG.workshop} fallback={IMG.workshopFallback}
                alt="Το εργαστήριο της ΨΥΧΟΓΥΙΟΣ Delicatessen" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ΕΓΚΑΤΑΣΤΑΣΕΙΣ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="section-title">Οι εγκαταστάσεις μας</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-ink-soft">
          Όλα τα στάδια γίνονται από εμάς, στον ίδιο χώρο στη Λυκόβρυση.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f) => (
            <div key={f.title} className="card">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-3 text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ΑΞΙΕΣ */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <h2 className="section-title">Οι αξίες μας</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="font-serif text-4xl text-cream-dark">0{i + 1}</span>
                <h3 className="mt-2 text-lg">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ΤΙ ΚΑΝΟΥΜΕ ΣΗΜΕΡΑ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="section-title">Τι κάνουμε σήμερα</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { t: "Λιανική", d: "Φρέσκο κρέας και κρεατοσκευάσματα στο κατάστημά μας και με παράδοση στην Αττική.", href: "/shop", cta: "Δείτε τα προϊόντα" },
            { t: "Χονδρική", d: "Τροφοδοσία εστιατορίων, ξενοδοχείων, catering και μαζικής εστίασης σε όλη την Ελλάδα.", href: "/chondriki", cta: "Πρόγραμμα χονδρικής" },
            { t: "Ψητά κατόπιν παραγγελίας", d: "Προετοιμασία ψητών εδεσμάτων για το τραπέζι ή την εκδήλωσή σας.", href: "/epikoinonia", cta: "Ρωτήστε μας" },
          ].map((c) => (
            <div key={c.t} className="card flex flex-col">
              <h3 className="text-xl">{c.t}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{c.d}</p>
              <Link href={c.href} className="mt-4 font-semibold text-brand hover:underline">{c.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-ink py-20">
        <div className="absolute inset-0 opacity-20">
          <SafeImage src={IMG.store} fallback={IMG.storeFallback} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-3xl text-white sm:text-4xl">Ελάτε να μας γνωρίσετε</h2>
          <p className="mt-4 text-cream/80">
            {SITE.address} · {SITE.hours}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SITE.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="btn-gold">📞 {p}</a>
            ))}
            <a href={`mailto:${SITE.email}`}
              className="btn-outline !border-white/70 !text-white hover:!bg-white hover:!text-ink">
              ✉️ {SITE.email}
            </a>
            <DeliveryCheckerButton className="btn-outline !border-white/70 !text-white hover:!bg-white hover:!text-ink">
              📍 Δείτε πού παραδίδουμε
            </DeliveryCheckerButton>
          </div>
        </div>
      </section>
    </>
  );
}
