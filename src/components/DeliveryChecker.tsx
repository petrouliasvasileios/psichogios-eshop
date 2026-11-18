"use client";

import { createContext, useContext, useState } from "react";
import { SITE } from "@/lib/data";
import { ZONES, checkPostcode, type Result } from "@/lib/delivery";
import { eur } from "@/lib/format";

const Ctx = createContext<{ open: () => void } | null>(null);

export function useDeliveryChecker() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useDeliveryChecker must be used inside DeliveryCheckerProvider");
  return c;
}

export function DeliveryCheckerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const close = () => setIsOpen(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(checkPostcode(zip));
  };

  return (
    <Ctx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <div onClick={close}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-start justify-between px-6 pb-4 pt-6">
          <div>
            <h2 className="font-serif text-2xl text-ink">Πού εξυπηρετούμε</h2>
            <p className="mt-1 text-sm text-ink/60">Δώστε τον Τ.Κ. σας για να δείτε αν παραδίδουμε στην περιοχή σας.</p>
          </div>
          <button onClick={close} className="text-3xl leading-none text-ink/50 hover:text-brand" aria-label="Κλείσιμο">×</button>
        </div>

        <form onSubmit={submit} className="space-y-3 px-6">
          <div>
            <label className="label" htmlFor="zip">Τ.Κ.</label>
            <input id="zip" inputMode="numeric" autoComplete="postal-code" placeholder="π.χ. 141 23"
              value={zip} onChange={(e) => { setZip(e.target.value); setResult(null); }} className="field" />
          </div>
          <div>
            <label className="label" htmlFor="addr">Διεύθυνση <span className="font-normal text-ink/50">(προαιρετικά)</span></label>
            <input id="addr" autoComplete="street-address" placeholder="Οδός και αριθμός, περιοχή"
              value={address} onChange={(e) => setAddress(e.target.value)} className="field" />
          </div>
          <button className="btn-primary w-full !bg-ink hover:!bg-brand">Δείτε διαθεσιμότητα</button>
        </form>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-5">
          {result?.status === "invalid" && (
            <p className="rounded-xl bg-cream-dark p-4 text-sm text-ink-soft">
              Ο Τ.Κ. πρέπει να έχει 5 ψηφία, π.χ. 141 23.
            </p>
          )}

          {result?.status === "covered" && (
            <div className="rounded-2xl border-2 border-green-600/30 bg-green-50 p-5">
              <p className="font-serif text-lg text-green-800">✓ Παραδίδουμε στην περιοχή σας</p>
              <p className="mt-1 font-semibold text-ink">{result.zone.title} — {result.zone.when}</p>
              {address && <p className="mt-1 text-sm text-ink/60">{address}</p>}
              <p className="mt-3 text-sm text-ink-soft">
                Μεταφορικά {result.zone.fee === null ? "δωρεάν" : eur(result.zone.fee)}, δωρεάν για παραγγελίες
                άνω των {SITE.freeShippingFrom}€.
              </p>
            </div>
          )}

          {result?.status === "on-request" && (
            <div className="rounded-2xl border-2 border-gold/40 bg-cream p-5">
              <p className="font-serif text-lg text-ink">Εκτός Αττικής</p>
              <p className="mt-2 text-sm text-ink-soft">
                Για αποστολές εκτός Αττικής εξυπηρετούμε κατόπιν συνεννόησης, με μεταφορά υπό ψύξη.
                Καλέστε μας για να το κανονίσουμε.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SITE.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="btn-outline !px-4 !py-2 text-sm">📞 {p}</a>
                ))}
              </div>
            </div>
          )}

          <h3 className="mb-3 mt-7 text-sm font-semibold uppercase tracking-wider text-ink/50">Οι ζώνες μας</h3>
          <ul className="space-y-3">
            {ZONES.map((z) => (
              <li key={z.id} className="rounded-xl border border-ink/10 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-ink">{z.title}</span>
                  <span className={`text-xs font-semibold ${z.tone === "best" ? "text-green-700" : "text-gold"}`}>{z.when}</span>
                </div>
                <p className="mt-1 text-sm text-ink/60">{z.areas}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/50">
            Δωρεάν μεταφορικά για παραγγελίες άνω των {SITE.freeShippingFrom}€. Ωράριο καταστήματος: {SITE.hours}.
          </p>
        </div>
      </aside>
    </Ctx.Provider>
  );
}

/** Το κουμπί που ανοίγει την καρτέλα. */
export function DeliveryCheckerButton({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  const { open } = useDeliveryChecker();
  return (
    <button onClick={open} className={className}>
      {children ?? (
        <>
          <span className="block text-xs leading-tight text-ink/60">Δείτε πού</span>
          <span className="block font-semibold leading-tight">Παραδίδουμε</span>
        </>
      )}
    </button>
  );
}
