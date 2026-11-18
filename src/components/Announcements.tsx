"use client";

import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/data";

export default function Announcements() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % ANNOUNCEMENTS.length), 4500);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((x) => (x + d + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  return (
    <div className="flex flex-1 items-center justify-center gap-4">
      <button onClick={() => go(-1)} aria-label="Προηγούμενο" className="text-cream/50 hover:text-white">‹</button>
      <span className="text-center text-xs sm:text-sm">{ANNOUNCEMENTS[i]}</span>
      <button onClick={() => go(1)} aria-label="Επόμενο" className="text-cream/50 hover:text-white">›</button>
    </div>
  );
}
