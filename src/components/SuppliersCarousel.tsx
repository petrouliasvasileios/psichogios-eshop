"use client";

import { useRef } from "react";
import SafeImage from "./SafeImage";
import { SUPPLIERS, type Supplier } from "@/lib/data";

function Logo({ name, logo }: { name: string; logo?: string }) {
  if (!logo) {
    return (
      <div className="flex h-28 w-full items-center justify-center rounded-xl border border-ink/10 bg-white px-4">
        <span className="text-center font-serif text-lg font-bold leading-tight text-ink/75">{name}</span>
      </div>
    );
  }
  return (
    <div className="flex h-28 w-full items-center justify-center px-4">
      <SafeImage src={logo} alt={name} className="max-h-24 w-auto object-contain" />
    </div>
  );
}

function Item({ s }: { s: Supplier }) {
  const body = (
    <>
      <Logo name={s.name} logo={s.logo} />
      {s.note && <p className="mt-2 text-center text-xs text-ink/50">{s.note}</p>}
    </>
  );
  const cls = "block w-[46%] flex-none snap-start sm:w-[30%] lg:w-[20%] xl:w-[16%]";

  return s.url ? (
    <a href={s.url} target="_blank" rel="noopener noreferrer"
      className={`${cls} transition hover:opacity-70`} title={s.name}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function SuppliersCarousel() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2">
        {SUPPLIERS.map((s) => <Item key={s.name} s={s} />)}
      </div>

      <button onClick={() => scroll(-1)} aria-label="Προηγούμενα"
        className="absolute -left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:text-brand lg:-left-6">
        ‹
      </button>
      <button onClick={() => scroll(1)} aria-label="Επόμενα"
        className="absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:text-brand lg:-right-6">
        ›
      </button>
    </div>
  );
}
