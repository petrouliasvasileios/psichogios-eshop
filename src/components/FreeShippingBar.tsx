"use client";

import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";

export default function FreeShippingBar() {
  const { subtotal } = useCart();
  const left = Math.max(0, SITE.freeShippingFrom - subtotal);
  const pct = Math.min(100, (subtotal / SITE.freeShippingFrom) * 100);
  return (
    <div className="rounded-xl bg-cream-dark p-3 text-sm">
      <p className="mb-2 text-ink-soft">
        {left > 0 ? (
          <>Προσθέστε <strong className="text-brand">{eur(left)}</strong> για δωρεάν μεταφορικά εντός Αθηνών</>
        ) : (
          <strong className="text-green-700">✓ Έχετε δωρεάν μεταφορικά εντός Αθηνών!</strong>
        )}
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-brand transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
