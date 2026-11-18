"use client";

import Link from "next/link";
import { DeliveryCheckerButton } from "./DeliveryChecker";
import { INSTALLMENTS, SITE } from "@/lib/data";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconB2B = () => (
  <svg viewBox="0 0 64 64" className="h-14 w-14">
    <circle cx="32" cy="32" r="22" {...stroke} />
    <circle cx="32" cy="32" r="17" {...stroke} strokeDasharray="3 3" />
    <rect x="13" y="26" width="38" height="12" rx="2" fill="currentColor" transform="rotate(-8 32 32)" />
    <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" transform="rotate(-8 32 32)">B2B</text>
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 64 64" className="h-14 w-14">
    <rect x="4" y="20" width="30" height="22" rx="2" {...stroke} />
    <path d="M34 26h11l7 8v8H34z" {...stroke} />
    <circle cx="17" cy="46" r="5" {...stroke} />
    <circle cx="44" cy="46" r="5" {...stroke} />
    <circle cx="19" cy="31" r="7" {...stroke} />
    <path d="M19 27.5V31l2.5 2" {...stroke} />
  </svg>
);

const IconEuro = () => (
  <svg viewBox="0 0 64 64" className="h-14 w-14">
    <circle cx="32" cy="32" r="21" {...stroke} />
    <path d="M39 24a11 11 0 1 0 0 16" {...stroke} />
    <path d="M20 29h14M20 35h14" {...stroke} />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 64 64" className="h-14 w-14">
    <path d="M32 55s15-14.5 15-24a15 15 0 1 0-30 0c0 9.5 15 24 15 24z" {...stroke} />
    <circle cx="32" cy="30" r="6" {...stroke} />
  </svg>
);

function Badge({ icon, title, href, onClickButton }: {
  icon: React.ReactNode; title: string; href?: string; onClickButton?: boolean;
}) {
  const inner = (
    <>
      <span className="text-ink transition group-hover:text-brand">{icon}</span>
      <span className="mt-3 max-w-[15rem] font-serif text-sm font-bold leading-snug text-ink transition group-hover:text-brand sm:text-base">
        {title}
      </span>
    </>
  );
  const cls = "group flex flex-col items-center text-center";

  if (onClickButton) return <DeliveryCheckerButton className={cls}>{inner}</DeliveryCheckerButton>;
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <div className={cls}>{inner}</div>;
}

export default function BadgesStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4 lg:px-12">
        <Badge icon={<IconB2B />} title="Γίνετε μέλος του προγράμματος χονδρικής" href="/chondriki" />
        <Badge icon={<IconTruck />} title="Αυθημερόν παράδοση στα βόρεια προάστια" />
        {INSTALLMENTS.enabled ? (
          <Badge icon={<IconEuro />} title={INSTALLMENTS.text} />
        ) : (
          <Badge icon={<IconEuro />} title={`Δωρεάν μεταφορικά άνω των ${SITE.freeShippingFrom}€`} />
        )}
        <Badge icon={<IconPin />} title="Παράδοση σε όλη την Αττική — Δείτε αν εξυπηρετούμε →" onClickButton />
      </div>
    </section>
  );
}
