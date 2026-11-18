"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SafeImage from "./SafeImage";
import { HERO, SITE } from "@/lib/data";

/**
 * Full-bleed hero.
 * Αν υπάρχει αρχείο στο HERO.video (public/videos/…), παίζει βίντεο.
 * Αλλιώς εναλλάσσει φωτογραφίες με αργό ζουμ.
 */
export default function HeroVideo() {
  const [i, setI] = useState(0);
  const [videoOk, setVideoOk] = useState(Boolean(HERO.video));

  useEffect(() => {
    if (videoOk) return;
    const t = setInterval(() => setI((x) => (x + 1) % HERO.images.length), 6000);
    return () => clearInterval(t);
  }, [videoOk]);

  return (
    <section className="relative isolate h-[72vh] min-h-[480px] w-full overflow-hidden bg-ink lg:h-[82vh]">
      {/* Φόντο */}
      <div className="absolute inset-0">
        {videoOk && HERO.video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            poster={HERO.images[0]}
            onError={() => setVideoOk(false)}
          >
            <source src={HERO.video} />
          </video>
        ) : (
          HERO.images.map((src, idx) => (
            <div key={src}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ${idx === i ? "opacity-100" : "opacity-0"}`}>
              <SafeImage src={src} alt=""
                className={`h-full w-full object-cover ${idx === i ? "animate-kenburns" : ""}`} />
            </div>
          ))
        )}
      </div>

      {/* Σκίαση για αναγνωσιμότητα */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      {/* Περιεχόμενο */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
        <div className="max-w-2xl">
          <div className="animate-rise inline-block rounded-2xl bg-white/95 px-5 py-3 shadow-xl backdrop-blur">
            <SafeImage src={SITE.logo} alt={SITE.name} className="h-12 w-auto sm:h-16" />
          </div>

          <h1 className="animate-rise mt-6 font-serif text-4xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}>
            Κρέας με όνομα<br />
            <span className="text-gold-light">από το 1952</span>
          </h1>

          <p className="animate-rise mt-5 max-w-lg text-base text-cream/85 sm:text-lg" style={{ animationDelay: "0.2s" }}>
            Επιλεγμένες κοπές, παραδοσιακό εργαστήριο στη Λυκόβρυση και παράδοση στην πόρτα σας.
          </p>

          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
            <Link href="/shop" className="btn-gold !px-8 !py-4 text-base">Δείτε τα προϊόντα</Link>
            <Link href="/category/premium"
              className="btn-outline !border-white/70 !px-8 !py-4 text-base !text-white backdrop-blur hover:!bg-white hover:!text-ink">
              Premium κοπές
            </Link>
          </div>
        </div>
      </div>

      {/* Κουκκίδες */}
      {!videoOk && (
        <div className="absolute bottom-6 right-5 z-10 flex gap-1.5 sm:right-8 lg:right-12">
          {HERO.images.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Εικόνα ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      )}
    </section>
  );
}
