"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SafeImage from "./SafeImage";
import { SLIDES } from "@/lib/data";

export default function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative overflow-hidden rounded-3xl bg-ink shadow-xl">
      <div className="relative aspect-[16/7] min-h-[220px] w-full">
        {SLIDES.map((s, idx) => (
          <div key={s} className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}>
            <SafeImage src={s} alt={`Ψυχογυιός – προσφορά ${idx + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-10 sm:left-10">
          <h1 className="font-serif text-2xl leading-tight drop-shadow sm:text-4xl lg:text-5xl">
            Φρέσκο κρέας από το 1952
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/90 sm:text-base">
            Επιλεγμένα κρέατα και delicatessen από τη Λυκόβρυση, κατευθείαν στην πόρτα σας.
          </p>
          <Link href="/shop" className="btn-gold mt-4">Δείτε τα προϊόντα</Link>
        </div>
      </div>
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold" : "w-2 bg-white/60"}`} />
        ))}
      </div>
    </section>
  );
}
