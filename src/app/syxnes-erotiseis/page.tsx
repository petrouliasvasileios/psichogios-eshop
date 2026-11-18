import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { FAQ_SECTIONS } from "@/lib/policies";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Συχνές ερωτήσεις",
  description:
    "Απαντήσεις για παραγγελίες, τιμές και βάρος, παράδοση και προϊόντα στο e-shop του ΨΥΧΟΓΥΙΟΣ Delicatessen.",
  alternates: { canonical: "/syxnes-erotiseis" },
};

export default function FaqPage() {
  const all = FAQ_SECTIONS.flatMap((s) => s.items);

  return (
    <>
      <PageHero
        eyebrow="Κέντρο βοήθειας"
        title="Συχνές ερωτήσεις"
        lead="Τα πιο συνηθισμένα που μας ρωτάτε. Αν δεν βρείτε αυτό που ψάχνετε, πάρτε μας τηλέφωνο."
      />

      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        {FAQ_SECTIONS.map((section) => (
          <section key={section.title} className="mb-12">
            <h2 className="mb-5 text-2xl">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-ink/10 bg-white p-5">
                  <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-brand group-open:hidden">+</span>
                    <span className="mr-2 hidden text-brand group-open:inline">−</span>
                    {f.q}
                  </summary>
                  <p className="mt-3 pl-6 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-3xl bg-slate-board p-8 text-center text-white">
          <h2 className="text-2xl text-white">Δεν βρήκατε απάντηση;</h2>
          <p className="mt-3 text-cream/80">Είμαστε στο τηλέφωνο {SITE.hours}.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SITE.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="btn-gold">📞 {p}</a>
            ))}
            <Link href="/epikoinonia" className="btn-outline !border-white/70 !text-white hover:!bg-white hover:!text-ink">
              Φόρμα επικοινωνίας
            </Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: all.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
