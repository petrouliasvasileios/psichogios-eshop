"use client";

import { useState } from "react";
import { B2B, BUSINESS_TYPES, COUNTRIES } from "@/lib/b2b";
import { SITE } from "@/lib/data";

const EMPTY = {
  company: "", email: "", country: COUNTRIES[0], firstName: "", lastName: "",
  careOf: "", address: "", address2: "", zip: "", city: "", phone: "",
  vat: "", businessType: BUSINESS_TYPES[0], message: "",
};

export default function B2BRegistrationForm() {
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-3xl border border-ink/10 bg-white p-10 text-center shadow-sm">
        <div className="text-5xl">✅</div>
        <h3 className="mt-4 text-2xl">Λάβαμε την αίτησή σας</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Θα ελέγξουμε τα στοιχεία της <strong>{form.company}</strong> και θα επικοινωνήσουμε
          στο {form.phone} εντός {B2B.responseTime}, για να ενεργοποιήσουμε τον λογαριασμό σας
          και να συμφωνήσουμε τιμές και δρομολόγιο.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
      <input required className="field" placeholder="Επωνυμία επιχείρησης *" value={form.company} onChange={set("company")} />
      <input required type="email" className="field mt-3" placeholder="Email *" value={form.email} onChange={set("email")} />

      <h3 className="mb-2 mt-7 text-lg">Διεύθυνση επιχείρησης</h3>
      <select className="field" value={form.country} onChange={set("country")} aria-label="Χώρα">
        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
      </select>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input required className="field" placeholder="Όνομα *" value={form.firstName} onChange={set("firstName")} />
        <input required className="field" placeholder="Επίθετο *" value={form.lastName} onChange={set("lastName")} />
      </div>

      <input className="field mt-3" placeholder="Εταιρεία / Υπόψη" value={form.careOf} onChange={set("careOf")} />
      <input required className="field mt-3" placeholder="Διεύθυνση *" value={form.address} onChange={set("address")} />
      <input className="field mt-3" placeholder="Διαμέρισμα, σουίτα, κ.λπ." value={form.address2} onChange={set("address2")} />

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input required inputMode="numeric" className="field" placeholder="Ταχυδρομικός κώδικας *" value={form.zip} onChange={set("zip")} />
        <input required className="field" placeholder="Πόλη *" value={form.city} onChange={set("city")} />
      </div>

      <div className="mt-3 flex gap-3">
        <span className="flex items-center gap-1 rounded-xl border border-ink/20 bg-cream px-4 text-sm font-medium">
          🇬🇷 +30
        </span>
        <input required type="tel" className="field flex-1" placeholder="Τηλέφωνο *" value={form.phone} onChange={set("phone")} />
      </div>

      <input required className="field mt-3" placeholder="Α.Φ.Μ. (VAT) *" value={form.vat} onChange={set("vat")} />

      <select className="field mt-3" value={form.businessType} onChange={set("businessType")} aria-label="Είδος επιχείρησης">
        {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>

      <textarea rows={3} className="field mt-3"
        placeholder="Τι σας ενδιαφέρει; (π.χ. μοσχαρίσιες κοπές, κιμάς, σουβλάκια — ποσότητες και συχνότητα)"
        value={form.message} onChange={set("message")} />

      <label className="mt-5 flex items-start gap-2 text-sm text-ink-soft">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-brand" />
        <span>
          Συναινώ στην επεξεργασία των στοιχείων της επιχείρησής μου για τον σκοπό της αίτησης
          συνεργασίας χονδρικής. *
        </span>
      </label>

      {state === "error" && (
        <p className="mt-4 rounded-xl bg-brand/10 p-3 text-sm text-brand">
          Κάτι πήγε στραβά. Καλέστε μας στο {SITE.phones[0]} και το τακτοποιούμε.
        </p>
      )}

      <button disabled={!consent || state === "sending"} className="btn-primary mt-6 w-full !py-4 text-base">
        {state === "sending" ? "Αποστολή…" : "Υποβολή αίτησης"}
      </button>

      <p className="mt-3 text-center text-xs text-ink/50">
        Ή καλέστε μας στο {SITE.phones.join(" · ")} ({SITE.hours}) ή στείλτε email στο{" "}
        <a href={`mailto:${SITE.b2bEmail}`} className="text-brand hover:underline">{SITE.b2bEmail}</a>.
      </p>
    </form>
  );
}
