"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import FreeShippingBar from "@/components/FreeShippingBar";
import { QtyStepper } from "@/components/AddToCart";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, shipping, total, setQty, remove, ready } = useCart();

  if (!ready) return <div className="py-20 text-center text-ink/60">Φόρτωση…</div>;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-4 text-3xl">Το καλάθι σας είναι άδειο</h1>
        <Link href="/shop" className="btn-primary mt-6">Δείτε τα προϊόντα</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-8">
      <h1 className="text-3xl sm:text-4xl">Το καλάθι σας</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {lines.map(({ item, qty, total: lineTotal }) => (
            <div key={item.slug} className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <SafeImage src={item.image} alt={item.name} className="h-24 w-24 flex-none rounded-xl object-cover" />
              <div className="min-w-[10rem] flex-1">
                <Link href={`/product/${item.slug}`} className="font-semibold hover:text-brand">{item.name}</Link>
                <div className="text-sm text-ink/60">{eur(item.price)} {SITE.priceSuffix}</div>
              </div>
              <QtyStepper value={qty} onChange={(v) => setQty(item.slug, v)} />
              <div className="w-24 text-right text-lg font-bold text-brand">{eur(lineTotal)}</div>
              <button onClick={() => remove(item.slug)} className="text-xl text-ink/40 hover:text-brand" aria-label="Αφαίρεση">×</button>
            </div>
          ))}
        </div>

        <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl">Σύνοψη</h2>
          <FreeShippingBar />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Υποσύνολο</dt><dd>{eur(subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt>Μεταφορικά</dt>
              <dd>{shipping === 0 ? <span className="font-semibold text-green-700">Δωρεάν</span> : eur(shipping)}</dd>
            </div>
          </dl>
          <div className="flex justify-between border-t border-ink/10 pt-3 text-xl font-bold">
            <span>Σύνολο</span><span className="text-brand">{eur(total)}</span>
          </div>
          <p className="text-xs text-ink/60">Η τελική χρέωση γίνεται στο πραγματικό βάρος κατά την κοπή.</p>
          <Link href="/checkout" className="btn-primary w-full">Ολοκλήρωση παραγγελίας</Link>
          <Link href="/shop" className="btn-outline w-full">Συνέχεια αγορών</Link>
        </aside>
      </div>
    </div>
  );
}
