"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";
import type { Product } from "@/lib/woo";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const discount = product.onSale && product.regularPrice > product.price
    ? Math.round((1 - product.price / product.regularPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:shadow-lg">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-dark">
        <SafeImage src={product.thumbnail ?? product.image} alt={product.imageAlt ?? product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">-{discount}%</span>
        )}
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">Εξαντλήθηκε</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[2.8rem] font-semibold leading-snug text-ink hover:text-brand">
          {product.name}
        </Link>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            {discount > 0 && <div className="text-xs text-ink/50 line-through">{eur(product.regularPrice)}</div>}
            <div className="text-lg font-bold text-brand">
              {eur(product.price)} <span className="text-xs font-medium text-ink/60">{SITE.priceSuffix}</span>
            </div>
          </div>
          <button
            onClick={() => add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.thumbnail ?? product.image }, 1)}
            disabled={!product.inStock}
            className="btn-primary !px-4 !py-2 text-sm"
            aria-label={`Προσθήκη ${product.name}`}>
            + Προσθήκη
          </button>
        </div>
      </div>
    </div>
  );
}
