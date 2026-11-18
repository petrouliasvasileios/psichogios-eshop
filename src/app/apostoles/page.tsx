import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { DeliveryCheckerButton } from "@/components/DeliveryChecker";
import { PICKUP, SHIPPING_ZONES } from "@/lib/policies";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Μέθοδοι και κόστος μεταφορικών",
  description:
    `Τρόποι και κόστος αποστολής του ΨΥΧΟΓΥΙΟΣ Delicatessen. Δωρεάν μεταφορικά άνω των ${SITE.freeShippingFrom}€ εντός Αττικής, παραλαβή από το κατάστημα και αποστολές σε όλη την Ελλάδα.`,
  alternates: { canonical: "/apostoles" },
};

export default function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="Πολιτική αποστολών"
        title="Μέθοδοι και κόστος μεταφορικών"
        lead="Μεταφέρουμε νωπά τρόφιμα, οπότε η ψύξη και ο χρόνος παράδοσης δεν είναι λεπτομέρεια. Δείτε πώς και πού παραδίδουμε."
      />

      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cream-dark p-6">
          <p className="text-ink-soft">Θέλετε να δείτε αν παραδίδουμε στη δική σας περιοχή;</p>
          <DeliveryCheckerButton className="btn-primary !py-3">📍 Έλεγχος με Τ.Κ.</DeliveryCheckerButton>
        </div>

        <div className="space-y-10">
          {SHIPPING_ZONES.map((z) => (
            <section key={z.id} className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm">
              <h2 className="text-2xl">{z.title}</h2>
              <p className="mt-2 text-sm text-ink/60">{z.areas}</p>

              <h3 className="mt-6 text-base font-semibold uppercase tracking-wide text-gold">
                Χρόνος και τρόπος παράδοσης
              </h3>
              <ul className="mt-2 space-y-2 text-ink-soft">
                {z.when.map((w) => <li key={w}>• {w}</li>)}
              </ul>

              <h3 className="mt-6 text-base font-semibold uppercase tracking-wide text-gold">
                Κόστος μεταφορικών
              </h3>
              <ul className="mt-2 space-y-2 text-ink-soft">
                {z.costs.map((c) => <li key={c}>• {c}</li>)}
              </ul>
            </section>
          ))}

          <section className="rounded-3xl border-2 border-gold/40 bg-cream p-7">
            <h2 className="text-2xl">{PICKUP.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{PICKUP.text}</p>
            <dl className="mt-5 space-y-1.5 text-sm text-ink-soft">
              <div><dt className="inline font-semibold">Διεύθυνση: </dt><dd className="inline">{PICKUP.address}</dd></div>
              <div><dt className="inline font-semibold">Ώρες: </dt><dd className="inline">{PICKUP.hours}</dd></div>
            </dl>
          </section>
        </div>

        <section className="mt-12 rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-xl">Καλό να γνωρίζετε</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
            <li>• Το κρέας κόβεται την ημέρα της παραγγελίας και χρεώνεται στο πραγματικό του βάρος.</li>
            <li>• Επειδή πρόκειται για νωπά τρόφιμα, η παραγγελία παραδίδεται σε εσάς και δεν αφήνεται σε κοινόχρηστο χώρο.</li>
            <li>• Αν η παράδοση καθυστερήσει για λόγο που δεν εξαρτάται από εμάς (καιρός, κυκλοφοριακό), θα ενημερωθείτε τηλεφωνικά.</li>
          </ul>
          <p className="mt-5 text-sm text-ink-soft">
            Ερωτήσεις; Δείτε τις <Link href="/syxnes-erotiseis" className="text-brand hover:underline">συχνές ερωτήσεις</Link>
            {" "}ή καλέστε μας στο {SITE.phones[0]}.
          </p>
        </section>
      </div>
    </>
  );
}
