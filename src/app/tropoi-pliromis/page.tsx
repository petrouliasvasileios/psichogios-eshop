import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PAYMENT_METHODS } from "@/lib/policies";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Τρόποι πληρωμής",
  description:
    "Αντικαταβολή, χρεωστική ή πιστωτική κάρτα, τραπεζική κατάθεση και τιμολόγηση για επαγγελματίες στο e-shop του ΨΥΧΟΓΥΙΟΣ Delicatessen.",
  alternates: { canonical: "/tropoi-pliromis" },
};

export default function PaymentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Πληρωμές"
        title="Τρόποι πληρωμής"
        lead="Διαλέγετε τον τρόπο που σας βολεύει. Όλες οι τιμές αναγράφονται με ΦΠΑ."
      />

      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {PAYMENT_METHODS.map((m) => (
            <div key={m.title} className="card">
              <span className="text-3xl">{m.icon}</span>
              <h2 className="mt-3 text-xl">{m.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{m.text}</p>
              {m.note && <p className="mt-3 text-xs text-ink/50">{m.note}</p>}
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-xl">Ασφάλεια συναλλαγών</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Οι πληρωμές με κάρτα γίνονται σε ασφαλές περιβάλλον της συνεργαζόμενης τράπεζας, με
            κρυπτογράφηση SSL. Το κατάστημα δεν βλέπει ούτε αποθηκεύει τον αριθμό της κάρτας σας.
          </p>
          <h2 className="mt-7 text-xl">Τιμολόγιο</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Αν χρειάζεστε τιμολόγιο, επιλέξτε το αντίστοιχο πεδίο στο ταμείο και συμπληρώστε
            επωνυμία, Α.Φ.Μ., Δ.Ο.Υ. και επάγγελμα. Για τακτική συνεργασία χονδρικής, δείτε το{" "}
            <Link href="/chondriki" className="text-brand hover:underline">πρόγραμμα χονδρικής</Link>.
          </p>
          <p className="mt-7 text-sm text-ink-soft">
            Απορίες για πληρωμές: {SITE.phones.join(" · ")} ·{" "}
            <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">{SITE.email}</a>
          </p>
        </section>
      </div>
    </>
  );
}
