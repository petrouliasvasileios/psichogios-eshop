"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/data";

/**
 * <img> με δύο επίπεδα εναλλακτικής:
 * 1) αν το `src` δεν φορτώσει και υπάρχει `fallback`, δοκιμάζει εκείνο,
 * 2) αν αποτύχει κι αυτό, δείχνει το λογότυπο σε ουδέτερο φόντο.
 */
export default function SafeImage({
  src,
  fallback,
  alt,
  className = "",
}: {
  src?: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(src ?? fallback);
  const [failed, setFailed] = useState(!src && !fallback);

  useEffect(() => {
    setCurrent(src ?? fallback);
    setFailed(!src && !fallback);
  }, [src, fallback]);

  if (failed || !current) {
    return (
      <div className={`flex items-center justify-center bg-cream-dark ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SITE.logo} alt={alt} className="h-1/3 w-auto opacity-40" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
        else setFailed(true);
      }}
      className={className}
    />
  );
}
