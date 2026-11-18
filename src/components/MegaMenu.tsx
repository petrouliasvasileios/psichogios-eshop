"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { KREATA_GROUPS, KREATOSKEVASMATA_CHILDREN, type Cat } from "@/lib/categories";
import { MEGA_IMAGE } from "@/lib/data";

function Column({ title, href, items, onNavigate }: {
  title: string; href: string; items: Cat[]; onNavigate?: () => void;
}) {
  return (
    <div>
      <Link href={href} onClick={onNavigate}
        className="mb-3 block font-serif text-lg font-bold text-ink hover:text-brand">
        {title}
      </Link>
      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c.slug}>
            <Link href={`/category/${c.slug}`} onClick={onNavigate}
              className="group flex items-baseline gap-2 text-[15px] text-ink-soft hover:text-brand">
              <span className="group-hover:underline">{c.name}</span>
              <span className="text-xs text-ink/35">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MegaMenu({ type, onNavigate }: {
  type: "kreata" | "kreatoskevasmata";
  onNavigate?: () => void;
}) {
  const third = Math.ceil(KREATOSKEVASMATA_CHILDREN.length / 3);

  return (
    <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 lg:px-12 py-8 lg:grid-cols-[1fr_1fr_1fr_1fr_18rem]">
      {type === "kreata" ? (
        KREATA_GROUPS.map((gr) => (
          <Column key={gr.slug} title={gr.name} href={`/category/${gr.slug}`} items={gr.children} onNavigate={onNavigate} />
        ))
      ) : (
        <>
          {[0, 1, 2].map((i) => (
            <Column key={i}
              title={i === 0 ? "Κρεατοσκευάσματα" : " "}
              href="/category/kreatoskevasmata"
              items={KREATOSKEVASMATA_CHILDREN.slice(i * third, (i + 1) * third)}
              onNavigate={onNavigate} />
          ))}
          <div className="hidden lg:block" />
        </>
      )}

      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-2xl bg-cream-dark">
          <SafeImage src={MEGA_IMAGE} alt="ΨΥΧΟΓΥΙΟΣ Delicatessen" className="h-56 w-full object-cover transition duration-700 hover:scale-105" />
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Κοπή την ημέρα της παραγγελίας, από το παραδοσιακό μας εργαστήριο.
        </p>
        <Link href="/shop" onClick={onNavigate} className="btn-primary mt-3 !px-5 !py-2 text-sm">
          Όλα τα προϊόντα
        </Link>
      </div>
    </div>
  );
}
