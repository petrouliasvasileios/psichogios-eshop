"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SITE } from "./data";

/** Το καλάθι κρατά αντίγραφο των στοιχείων του προϊόντος, ώστε να μη χρειάζεται νέο fetch. */
export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image?: string;
};

type Line = CartItem & { qty: number };
export type DetailedLine = { item: CartItem; qty: number; total: number };

type CartCtx = {
  lines: DetailedLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  add: (item: CartItem, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  ready: boolean;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "psichogios-cart-v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setRaw(JSON.parse(s));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {}
  }, [raw, ready]);

  const add = useCallback((item: CartItem, qty = 1) => {
    setRaw((r) => {
      const found = r.find((l) => l.slug === item.slug);
      return found
        ? r.map((l) => (l.slug === item.slug ? { ...l, qty: Math.round((l.qty + qty) * 100) / 100 } : l))
        : [...r, { ...item, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setRaw((r) => (qty <= 0 ? r.filter((l) => l.slug !== slug) : r.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((slug: string) => setRaw((r) => r.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartCtx>(() => {
    const lines: DetailedLine[] = raw.map(({ qty, ...item }) => ({
      item,
      qty,
      total: Math.round(item.price * qty * 100) / 100,
    }));
    const subtotal = Math.round(lines.reduce((s, l) => s + l.total, 0) * 100) / 100;
    const shipping = lines.length === 0 || subtotal >= SITE.freeShippingFrom ? 0 : SITE.shippingFee;
    return {
      lines, count: lines.length, subtotal, shipping, total: subtotal + shipping,
      drawerOpen, setDrawerOpen, add, setQty, remove, clear, ready,
    };
  }, [raw, drawerOpen, add, setQty, remove, clear, ready]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
