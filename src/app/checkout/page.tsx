"use client";

import Link from "next/link";
import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";

type Method = "delivery" | "pickup";
type Payment = "cod" | "card" | "bank";

const STEPS = ["Παράδοση", "Στοιχεία", "Πληρωμή"];

export default function CheckoutPage() {
  const { lines, subtotal, shipping, total, ready, clear } = useCart();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<Method>("delivery");
  const [payment, setPayment] = useState<Payment>("cod");
  const [terms, setTerms] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "", notes: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const shippingCost = method === "pickup" ? 0 : shipping;
  const grand = subtotal + shippingCost;

  const detailsValid =
    form.firstName && form.lastName && form.phone && /\S+@\S+\.\S+/.test(form.email) &&
    (method === "pickup" || (form.address && form.city && form.zip));

  if (!ready) return <div className="py-20 text-center text-ink/60">Φόρτωση…</div>;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-5 sm:px-8 py-20 text-center">
        <div className="text-6xl">✅</div>
        <h1 className="mt-4 text-3xl">Η παραγγελία καταχωρήθηκε</h1>
        <p className="mt-3 text-ink-soft">
          Σας ευχαριστούμε! Θα επικοινωνήσουμε μαζί σας στο {form.phone} για επιβεβαίωση.
        </p>
        <p className="mt-4 rounded-xl bg-cream-dark p-4 text-sm text-ink/70">
          Demo: η παραγγελία δεν στάλθηκε πουθενά. Στη Φάση 3 το ταμείο θα συνδεθεί με το WooCommerce.
        </p>
        <Link href="/" className="btn-primary mt-6">Επιστροφή στην αρχική</Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 text-center">
        <h1 className="text-3xl">Το καλάθι σας είναι άδειο</h1>
        <Link href="/shop" className="btn-primary mt-6">Δείτε τα προϊόντα</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl">Ολοκλήρωση παραγγελίας</h1>

      <ol className="mt-6 flex items-center gap-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${i <= step ? "bg-brand text-white" : "bg-ink/10 text-ink/50"}`}>{i + 1}</span>
            <span className={i <= step ? "font-semibold" : "text-ink/50"}>{s}</span>
            {i < STEPS.length - 1 && <span className="mx-2 h-px w-6 bg-ink/20 sm:w-12" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          {step === 0 && (
            <div className="card space-y-4">
              <h2 className="text-xl">Τρόπος παράδοσης</h2>
              {([
                { id: "delivery", title: "Παράδοση στο χώρο σας", text: `Αθήνα & περίχωρα. Δωρεάν άνω των ${SITE.freeShippingFrom}€, αλλιώς ${eur(SITE.shippingFee)}.` },
                { id: "pickup", title: "Παραλαβή από το κατάστημα", text: `${SITE.address} — ${SITE.hours}` },
              ] as const).map((o) => (
                <label key={o.id}
                  className={`flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition ${method === o.id ? "border-brand bg-cream" : "border-ink/15 hover:border-ink/30"}`}>
                  <input type="radio" name="method" checked={method === o.id} onChange={() => setMethod(o.id)} className="mt-1 accent-brand" />
                  <div>
                    <div className="font-semibold">{o.title}</div>
                    <div className="text-sm text-ink/60">{o.text}</div>
                  </div>
                </label>
              ))}
              <button className="btn-primary w-full" onClick={() => setStep(1)}>Συνέχεια</button>
            </div>
          )}

          {step === 1 && (
            <div className="card space-y-4">
              <h2 className="text-xl">Στοιχεία επικοινωνίας</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label">Όνομα *</label><input className="field" value={form.firstName} onChange={set("firstName")} /></div>
                <div><label className="label">Επώνυμο *</label><input className="field" value={form.lastName} onChange={set("lastName")} /></div>
                <div><label className="label">Email *</label><input type="email" className="field" value={form.email} onChange={set("email")} /></div>
                <div><label className="label">Τηλέφωνο *</label><input type="tel" className="field" value={form.phone} onChange={set("phone")} /></div>
              </div>

              {method === "delivery" && (
                <>
                  <h2 className="pt-2 text-xl">Διεύθυνση παράδοσης</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><label className="label">Διεύθυνση & αριθμός *</label><input className="field" value={form.address} onChange={set("address")} /></div>
                    <div><label className="label">Πόλη / Περιοχή *</label><input className="field" value={form.city} onChange={set("city")} /></div>
                    <div><label className="label">Τ.Κ. *</label><input className="field" value={form.zip} onChange={set("zip")} /></div>
                  </div>
                </>
              )}

              <div><label className="label">Σημειώσεις παραγγελίας</label><textarea rows={3} className="field" value={form.notes} onChange={set("notes")} placeholder="π.χ. κοπή σε μερίδες, ώρα παράδοσης…" /></div>

              <div className="flex gap-3">
                <button className="btn-outline flex-1" onClick={() => setStep(0)}>Πίσω</button>
                <button className="btn-primary flex-1" disabled={!detailsValid} onClick={() => setStep(2)}>Συνέχεια</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card space-y-4">
              <h2 className="text-xl">Τρόπος πληρωμής</h2>
              {([
                { id: "cod", title: "Αντικαταβολή", text: "Πληρωμή με μετρητά ή κάρτα κατά την παράδοση." },
                { id: "card", title: "Κάρτα", text: "Ασφαλής πληρωμή — ενεργοποιείται με τη σύνδεση στο WooCommerce." },
                { id: "bank", title: "Τραπεζική κατάθεση", text: "Θα λάβετε τα στοιχεία λογαριασμού με email." },
              ] as const).map((o) => (
                <label key={o.id}
                  className={`flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition ${payment === o.id ? "border-brand bg-cream" : "border-ink/15 hover:border-ink/30"}`}>
                  <input type="radio" name="payment" checked={payment === o.id} onChange={() => setPayment(o.id)} className="mt-1 accent-brand" />
                  <div>
                    <div className="font-semibold">{o.title}</div>
                    <div className="text-sm text-ink/60">{o.text}</div>
                  </div>
                </label>
              ))}

              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={invoice} onChange={(e) => setInvoice(e.target.checked)} className="mt-1 accent-brand" />
                Θέλω τιμολόγιο
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1 accent-brand" />
                Αποδέχομαι τους όρους χρήσης και την πολιτική απορρήτου *
              </label>

              <div className="flex gap-3">
                <button className="btn-outline flex-1" onClick={() => setStep(1)}>Πίσω</button>
                <button className="btn-primary flex-1" disabled={!terms} onClick={() => { clear(); setDone(true); }}>
                  Καταχώρηση παραγγελίας — {eur(grand)}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl">Η παραγγελία σας</h2>
          <div className="space-y-3">
            {lines.map(({ item, qty, total: lineTotal }) => (
              <div key={item.slug} className="flex gap-3 text-sm">
                <SafeImage src={item.image} alt={item.name} className="h-14 w-14 flex-none rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 font-medium">{item.name}</div>
                  <div className="text-ink/60">{qty.toLocaleString("el-GR")} kg</div>
                </div>
                <div className="font-semibold">{eur(lineTotal)}</div>
              </div>
            ))}
          </div>
          <dl className="space-y-2 border-t border-ink/10 pt-3 text-sm">
            <div className="flex justify-between"><dt>Υποσύνολο</dt><dd>{eur(subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt>{method === "pickup" ? "Παραλαβή" : "Μεταφορικά"}</dt>
              <dd>{shippingCost === 0 ? <span className="font-semibold text-green-700">Δωρεάν</span> : eur(shippingCost)}</dd>
            </div>
          </dl>
          <div className="flex justify-between border-t border-ink/10 pt-3 text-xl font-bold">
            <span>Σύνολο</span><span className="text-brand">{eur(grand)}</span>
          </div>
          <p className="text-xs text-ink/60">Η τελική χρέωση γίνεται στο πραγματικό βάρος κατά την κοπή.</p>
        </aside>
      </div>
    </div>
  );
}
