import type { Metadata } from "next";
import Link from "next/link";
import B2BRegistrationForm from "@/components/B2BRegistrationForm";
import { DeliveryCheckerButton } from "@/components/DeliveryChecker";
import SafeImage from "@/components/SafeImage";
import { B2B, B2B_PERKS, B2B_STEPS } from "@/lib/b2b";
import { SITE, WHOLESALE_IMAGES as IMG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Χονδρική — B2B πρόγραμμα για επαγγελματίες",
  description:
    "Χονδρική πώληση κρέατος σε εστιατόρια, ξενοδοχεία, catering και μαζική εστίαση. Κάντε αίτηση για λογαριασμό χονδρικής στον ΨΥΧΟΓΥΙΟ Delicatessen, Λυκόβρυση Αττικής.",
  alternates: { canonical: "/chondriki" },
};

const HERO_POINTS = [
  "Τιμοκατάλογος χονδρικής ανά όγκο",
  "Κοπές στις δικές σας προδιαγραφές",
  "Τακτικό πρόγραμμα παραδόσεων",
  "Μεταφορά υπό ψύξη",
];

const SERVE = [
  "Εστιατόρια & ταβέρνες",
  "Ψητοπωλεία",
  "Ξενοδοχεία",
  "Catering & εκδηλώσεις",
  "Κρεοπωλεία",
  "Μαζική εστίαση",
];

const RANGE = [
  { title: "Μοσχάρι", text: "Ελλάδος, Black Angus, Ισπανίας, Γάλακτος, Αμερικής.", href: "/category/moschari" },
  { title: "Χοιρινό", text: "Ελληνικό, Ισπανίας και γάλακτος, σε όλες τις κοπές.", href: "/category/choirino" },
  { title: "Αμνοερίφια", text: "Αρνί, κατσίκι, ζυγούρι, γίδα, πρόβατο.", href: "/category/oplifora" },
  { title: "Πουλερικά", text: "Κοτόπουλο και γαλοπούλα, ολόκληρα ή σε μερίδες.", href: "/category/poulerika" },
  { title: "Premium κοπές", text: "Για μενού που ξεχωρίζουν, με σταθερή προέλευση.", href: "/category/premium" },
  { title: "Κρεατοσκευάσματα", text: "Σουβλάκια, κιμάδες, μπιφτέκια, λουκάνικα, γύρος.", href: "/category/kreatoskevasmata" },
];

const FAQ = [
  { q: "Ποιος μπορεί να κάνει αίτηση;", a: "Κάθε επιχείρηση με Α.Φ.Μ.: εστιατόρια, ψητοπωλεία, ξενοδοχεία, catering, κρεοπωλεία και φορείς μαζικής εστίασης." },
  { q: "Πότε ενεργοποιείται ο λογαριασμός μου;", a: `Ελέγχουμε τα στοιχεία και τον ενεργοποιούμε εντός ${B2B.responseTime}. Θα σας καλέσουμε πρώτα για να συμφωνήσουμε τιμές και δρομολόγιο.` },
  { q: "Υπάρχει ελάχιστη παραγγελία;", a: "Εξαρτάται από την περιοχή και τη συχνότητα παράδοσης. Θα τη συμφωνήσουμε μαζί στο πρώτο τηλεφώνημα." },
  { q: "Μπορείτε να κάνετε ειδικές κοπές;", a: "Ναι. Οι κοπές γίνονται κατά παραγγελία στο εργαστήριό μας, στο βάρος μερίδας και τη συσκευασία που ζητάτε. Τις αποθηκεύουμε και τις εφαρμόζουμε σε κάθε επόμενη παραγγελία." },
  { q: "Τιμολογείτε;", a: "Ναι, η χονδρική γίνεται αποκλειστικά με τιμολόγιο. Γι' αυτό ζητάμε Α.Φ.Μ. στην αίτηση." },
  { q: "Σε ποιες περιοχές παραδίδετε;", a: "Με δικό μας δρομολόγιο στην Αττική. Για εκτός Αττικής εξυπηρετούμε κατόπιν συνεννόησης, με μεταφορά υπό ψύξη." },
];

export default function WholesalePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-30">
          <SafeImage src={IMG.hero} fallback={IMG.heroFallback} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />

        <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-12 lg:py-28">
          <div className="self-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
              B2B πρόγραμμα χονδρικής
            </span>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl">
              Φρέσκο κρέας, στην ποσότητα και την κοπή που χρειάζεστε
            </h1>
            <p className="mt-5 max-w-xl text-lg text-cream/85">
              Εξυπηρετούμε επαγγελματίες της εστίασης από το {SITE.founded}, με σταθερή ποιότητα,
              τιμές χονδρικής και παραδόσεις που δεν σας αφήνουν ποτέ χωρίς εμπόρευμα.
            </p>

            <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {HERO_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-cream/90">
                  <span className="text-gold-light">✓</span> {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#aitisi" className="btn-gold !px-8 !py-4 text-base">Κάντε αίτηση συνεργασίας</a>
              <a href={B2B.loginUrl} target="_blank" rel="noopener noreferrer"
                className="btn-outline !border-white/70 !px-8 !py-4 text-base !text-white hover:!bg-white hover:!text-ink">
                Είμαι ήδη πελάτης — Σύνδεση
              </a>
            </div>
          </div>

          {/* Κάρτα σύνδεσης */}
          <div className="self-center rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
            <h2 className="font-serif text-2xl text-white">Έχετε ήδη λογαριασμό χονδρικής;</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Συνδεθείτε για να δείτε τον δικό σας τιμοκατάλογο, το ιστορικό παραγγελιών και να
              επαναλάβετε μια παραγγελία με ένα κλικ.
            </p>
            <a href={B2B.loginUrl} target="_blank" rel="noopener noreferrer"
              className="btn-gold mt-6 w-full !py-4">
              Σύνδεση στο B2B
            </a>
            <p className="mt-4 text-center text-xs text-cream/60">
              Δεν έχετε λογαριασμό; <a href="#aitisi" className="underline hover:text-white">Κάντε αίτηση</a> —
              η έγκριση γίνεται εντός {B2B.responseTime}.
            </p>
          </div>
        </div>
      </section>

      {/* Ποιους εξυπηρετούμε */}
      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 text-sm font-semibold text-ink-soft sm:px-8 lg:px-12">
          {SERVE.map((s) => <span key={s}>{s}</span>)}
        </div>
      </section>

      {/* ΠΩΣ ΛΕΙΤΟΥΡΓΕΙ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="section-title">Πώς λειτουργεί</h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-ink-soft">
          Τρία βήματα, καμία δέσμευση. Οι τιμές χονδρικής εμφανίζονται μόλις εγκριθεί ο λογαριασμός σας.
        </p>
        <ol className="grid gap-6 md:grid-cols-3">
          {B2B_STEPS.map((s) => (
            <li key={s.n} className="relative rounded-3xl border border-ink/10 bg-white p-8 shadow-sm">
              <span className="font-serif text-5xl text-cream-dark">{s.n}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ΟΦΕΛΗ */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <h2 className="section-title">Τι κερδίζετε με λογαριασμό χονδρικής</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {B2B_PERKS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="mt-3 text-lg">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ΕΡΓΑΣΤΗΡΙΟ + ΨΥΞΗ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { img: IMG.workshop, fb: IMG.workshopFallback, t: "Το εργαστήριό μας", d: "Παραδοσιακό εργαστήριο κρέατος στη Λυκόβρυση. Οι κοπές και τα παρασκευάσματα γίνονται εδώ, στις προδιαγραφές της δικής σας κουζίνας." },
            { img: IMG.cold, fb: IMG.coldFallback, t: "Από το ψυγείο στο ψυγείο", d: "Σταθερή θερμοκρασία σε όλη τη διαδρομή, με δικά μας οχήματα και προγραμματισμένο δρομολόγιο στην Αττική." },
          ].map((b) => (
            <div key={b.t} className="group relative isolate overflow-hidden rounded-3xl bg-ink">
              <div className="aspect-[16/10]">
                <SafeImage src={b.img} fallback={b.fb} alt={b.t}
                  className="h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/40 to-transparent p-8">
                <h3 className="font-serif text-2xl text-white sm:text-3xl">{b.t}</h3>
                <p className="mt-2 max-w-md text-sm text-cream/85">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ΑΡΙΘΜΟΙ */}
      <section className="bg-brand py-14 text-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 text-center sm:grid-cols-3 sm:px-8">
          {[
            { n: `${new Date().getFullYear() - SITE.founded}+`, l: "χρόνια στο κρέας" },
            { n: "3", l: "γενιές κρεοπώλες" },
            { n: "Αττική", l: "με δικό μας δρομολόγιο" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-5xl text-gold-light">{s.n}</div>
              <div className="mt-1 text-sm text-white/80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ΓΚΑΜΑ */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="section-title">Πλήρης σειρά προϊόντων</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-ink-soft">
          Ό,τι χρειάζεται μια επαγγελματική κουζίνα, από μία πηγή.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RANGE.map((r) => (
            <Link key={r.title} href={r.href} className="card transition hover:-translate-y-1 hover:border-brand hover:shadow-lg">
              <h3 className="text-xl">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Δείτε τα προϊόντα →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-cream-dark p-6 text-center">
          <p className="w-full text-ink-soft">Θέλετε να δείτε αν σας εξυπηρετούμε στην περιοχή σας;</p>
          <DeliveryCheckerButton className="btn-outline">📍 Δείτε πού παραδίδουμε</DeliveryCheckerButton>
        </div>
      </section>

      {/* ΑΙΤΗΣΗ */}
      <section id="aitisi" className="scroll-mt-24 bg-cream-dark py-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div className="lg:sticky lg:top-40 lg:self-start">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Αίτηση συνεργασίας</span>
              <h2 className="mt-3 text-3xl sm:text-4xl">Ανοίξτε λογαριασμό χονδρικής</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Συμπληρώστε τα στοιχεία της επιχείρησής σας. Μόλις τα ελέγξουμε, ενεργοποιούμε τον
                λογαριασμό σας και σας καλούμε για να συμφωνήσουμε τιμές και πρόγραμμα παραδόσεων.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-ink-soft">
                <li>📍 {SITE.address}</li>
                {SITE.phones.map((p) => (
                  <li key={p}>📞 <a href={`tel:${p.replace(/\s/g, "")}`} className="text-brand hover:underline">{p}</a></li>
                ))}
                <li>💬 <a href={`viber://chat?number=%2B30${SITE.mobile.replace(/\s/g, "")}`} className="text-brand hover:underline">{SITE.mobile}</a> — {SITE.mobileNote}</li>
                <li>✉️ <a href={`mailto:${SITE.b2bEmail}`} className="text-brand hover:underline">{SITE.b2bEmail}</a></li>
                <li>🕕 {SITE.hours}</li>
              </ul>

              <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-5">
                <p className="text-sm font-semibold">Έχετε ήδη λογαριασμό;</p>
                <a href={B2B.loginUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-outline mt-3 w-full !py-3 text-sm">
                  Σύνδεση στο B2B
                </a>
              </div>
            </div>

            <B2BRegistrationForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <h2 className="section-title">Συχνές ερωτήσεις</h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-ink/10 bg-white p-5">
              <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span className="mr-2 text-brand group-open:hidden">+</span>
                <span className="mr-2 hidden text-brand group-open:inline">−</span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
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
