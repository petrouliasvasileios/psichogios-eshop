"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Announcements from "./Announcements";
import SocialLinks from "./SocialLinks";
import { DeliveryCheckerButton } from "./DeliveryChecker";
import MegaMenu from "./MegaMenu";
import SafeImage from "./SafeImage";
import { useCart } from "@/lib/cart";
import { KREATA_GROUPS, KREATOSKEVASMATA_CHILDREN, MAIN_MENU } from "@/lib/categories";
import { SITE } from "@/lib/data";
import { eur } from "@/lib/format";

export default function Header() {
  const { count, subtotal, setDrawerOpen } = useCart();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = (label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(label);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 150);
  };

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
    setMobile(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Μαύρη μπάρα ανακοινώσεων */}
      <div className="bg-ink text-cream/90">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 sm:px-8 lg:px-12 py-2">
          <SocialLinks className="hidden sm:flex" />
          <Announcements />
          <div className="hidden items-center gap-4 whitespace-nowrap text-sm md:flex">
            <DeliveryCheckerButton className="underline-offset-4 hover:text-white hover:underline">
              📍 Πού παραδίδουμε
            </DeliveryCheckerButton>
            <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="hover:text-white">📞 {SITE.phones[0]}</a>
            <a href={`viber://chat?number=%2B30${SITE.mobile.replace(/\s/g, "")}`} className="hover:text-white"
              title={SITE.mobileNote}>💬 {SITE.mobile} · 24/7</a>
          </div>
        </div>
      </div>

      {/* Κύρια μπάρα */}
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 sm:px-8 lg:px-12 py-3">
        <button className="text-3xl leading-none lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Μενού">☰</button>

        <Link href="/" className="flex-none">
          <SafeImage src={SITE.logo} alt={SITE.name} className="h-12 w-auto sm:h-14" />
        </Link>

        <form onSubmit={search} className="relative mx-auto hidden max-w-2xl flex-1 md:block">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Αναζήτηση για…"
            className="w-full rounded-full border border-ink/15 bg-white py-3.5 pl-12 pr-5 outline-none transition focus:border-brand" />
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-ink/50 hover:text-brand" aria-label="Αναζήτηση">⌕</button>
        </form>

        <button onClick={() => setDrawerOpen(true)}
          className="relative ml-auto flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-white transition hover:bg-brand md:ml-0">
          <span className="text-lg">🛒</span>
          <span className="text-sm font-semibold">{eur(subtotal)} ({count})</span>
        </button>
      </div>

      {/* Γραμμή πλοήγησης με mega menu */}
      <nav className="hidden border-t border-ink/10 lg:block" onMouseLeave={leave}>
        <ul className="mx-auto flex max-w-[1600px] items-center gap-1 px-5 sm:px-8 lg:px-12">
          {MAIN_MENU.map((m) => (
            <li key={m.label} onMouseEnter={() => (m.mega ? enter(m.label) : setOpen(null))}>
              <Link href={m.href}
                className={`flex items-center gap-1.5 px-4 py-4 font-serif text-[17px] font-bold transition hover:text-brand ${
                  m.highlight ? "text-brand" : "text-ink"
                } ${open === m.label ? "text-brand underline decoration-2 underline-offset-8" : ""}`}>
                {m.label}
                {m.mega && <span className="text-[10px]">▾</span>}
              </Link>
            </li>
          ))}
          <li className="ml-auto flex items-center gap-6 text-sm text-ink-soft">
            <Link href="/epikoinonia" className="hover:text-brand">Επικοινωνία</Link>
            <DeliveryCheckerButton className="rounded-full border border-ink/15 px-4 py-2 text-left transition hover:border-brand hover:text-brand" />
          </li>
        </ul>

        {MAIN_MENU.filter((m) => m.mega).map((m) => (
          <div key={m.label}
            onMouseEnter={() => enter(m.label)}
            className={`absolute inset-x-0 border-t border-ink/10 bg-white shadow-2xl transition-all duration-200 ${
              open === m.label ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
            }`}>
            <MegaMenu type={m.mega!} onNavigate={() => setOpen(null)} />
          </div>
        ))}
      </nav>

      {/* Mobile μενού */}
      {mobile && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-ink/10 lg:hidden">
          <form onSubmit={search} className="p-4 md:hidden">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Αναζήτηση για…"
              className="w-full rounded-full border border-ink/15 px-5 py-3 outline-none focus:border-brand" />
          </form>
          <ul className="divide-y divide-ink/10">
            {MAIN_MENU.map((m) => {
              const groups = m.mega === "kreata" ? KREATA_GROUPS : null;
              const flat = m.mega === "kreatoskevasmata" ? KREATOSKEVASMATA_CHILDREN : null;
              const expandable = Boolean(groups || flat);
              const isOpen = openMobileGroup === m.label;
              return (
                <li key={m.label}>
                  <div className="flex items-center">
                    <Link href={m.href} onClick={() => setMobile(false)}
                      className={`flex-1 px-5 py-3.5 font-serif font-bold ${m.highlight ? "text-brand" : ""}`}>
                      {m.label}
                    </Link>
                    {expandable && (
                      <button onClick={() => setOpenMobileGroup(isOpen ? null : m.label)}
                        className="px-5 py-3.5 text-ink/50" aria-label="Υποκατηγορίες">
                        {isOpen ? "−" : "+"}
                      </button>
                    )}
                  </div>
                  {isOpen && (
                    <div className="bg-cream px-5 py-3">
                      {groups?.map((gr) => (
                        <div key={gr.slug} className="mb-3">
                          <Link href={`/category/${gr.slug}`} onClick={() => setMobile(false)}
                            className="block py-1 font-semibold text-ink">{gr.name}</Link>
                          {gr.children.map((c) => (
                            <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobile(false)}
                              className="block py-1 pl-4 text-sm text-ink-soft">{c.name}</Link>
                          ))}
                        </div>
                      ))}
                      {flat?.map((c) => (
                        <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobile(false)}
                          className="block py-1 text-sm text-ink-soft">{c.name}</Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
            <li><Link href="/epikoinonia" onClick={() => setMobile(false)} className="block px-5 py-3.5 font-serif font-bold">Επικοινωνία</Link></li>
            <li>
              <DeliveryCheckerButton className="block w-full px-5 py-3.5 text-left font-serif font-bold text-brand">
                Δείτε πού παραδίδουμε
              </DeliveryCheckerButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
