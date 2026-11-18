"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/woo";

const STEP = 0.5;

export function QtyStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink/20 bg-white">
      <button type="button" aria-label="Λιγότερο" className="h-10 w-10 text-xl text-ink hover:text-brand"
        onClick={() => onChange(Math.round(Math.max(0, value - STEP) * 100) / 100)}>−</button>
      <span className="min-w-[4.5rem] text-center text-sm font-semibold tabular-nums">
        {value.toLocaleString("el-GR")} kg
      </span>
      <button type="button" aria-label="Περισσότερο" className="h-10 w-10 text-xl text-ink hover:text-brand"
        onClick={() => onChange(Math.round((value + STEP) * 100) / 100)}>+</button>
    </div>
  );
}

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <QtyStepper value={qty} onChange={(v) => setQty(Math.max(STEP, v))} />
      <button
        className="btn-primary flex-1 sm:flex-none"
        disabled={!product.inStock}
        onClick={() => add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.thumbnail ?? product.image }, qty)}>
        {product.inStock ? "Προσθήκη στο καλάθι" : "Εξαντλήθηκε"}
      </button>
    </div>
  );
}
