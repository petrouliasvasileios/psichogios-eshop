"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import FreeShippingBar from "./FreeShippingBar";
import { QtyStepper } from "./AddToCart";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";

export default function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, setQty, remove } = useCart();
  return (
    <>
      <div onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
          <h2 className="font-serif text-xl">Το καλάθι σας</h2>
          <button onClick={() => setDrawerOpen(false)} className="text-2xl leading-none hover:text-gold-light" aria-label="Κλείσιμο">×</button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {lines.length === 0 ? (
            <div className="py-16 text-center text-ink/60">
              <div className="mb-3 text-5xl">🥩</div>
              Το καλάθι σας είναι άδειο.
              <div className="mt-5">
                <Link href="/shop" onClick={() => setDrawerOpen(false)} className="btn-primary">Δείτε τα προϊόντα</Link>
              </div>
            </div>
          ) : (
            <>
              <FreeShippingBar />
              {lines.map(({ item, qty, total }) => (
                <div key={item.slug} className="flex gap-3 rounded-xl bg-white p-3 shadow-sm">
                  <SafeImage src={item.image} alt={item.name} className="h-20 w-20 flex-none rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-sm font-semibold">{item.name}</div>
                    <div className="text-xs text-ink/60">{eur(item.price)} {SITE.priceSuffix}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="origin-left scale-90"><QtyStepper value={qty} onChange={(v) => setQty(item.slug, v)} /></div>
                      <div className="font-bold text-brand">{eur(total)}</div>
                    </div>
                  </div>
                  <button onClick={() => remove(item.slug)} className="self-start text-ink/40 hover:text-brand" aria-label="Αφαίρεση">×</button>
                </div>
              ))}
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-3 border-t border-ink/10 bg-white p-5">
            <div className="flex justify-between text-lg font-bold"><span>Υποσύνολο</span><span>{eur(subtotal)}</span></div>
            <p className="text-xs text-ink/60">Τα μεταφορικά υπολογίζονται στο ταμείο. Τελική χρέωση στο πραγματικό βάρος.</p>
            <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="btn-primary w-full">Ολοκλήρωση παραγγελίας</Link>
            <Link href="/cart" onClick={() => setDrawerOpen(false)} className="btn-outline w-full">Προβολή καλαθιού</Link>
          </div>
        )}
      </aside>
    </>
  );
}
