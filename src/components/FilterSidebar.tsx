import Link from "next/link";
import { ICONS, IconEuro, IconTag } from "./FilterIcons";
import {
  CATEGORY_FILTER, ORIGIN_FILTER, PRICE_FILTER,
  buildUrl, activeCount, type FilterOption, type SearchParams,
} from "@/lib/filters";

function Row({ o, base, sp, param, indent = false }: {
  o: FilterOption; base: string; sp: SearchParams; param: "cat" | "price"; indent?: boolean;
}) {
  const active = sp[param] === o.value;
  const Icon = o.icon ? ICONS[o.icon] : undefined;

  return (
    <li>
      <Link
        href={buildUrl(base, sp, { [param]: active ? undefined : o.value })}
        className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[15px] transition hover:bg-cream ${
          indent ? "pl-7" : ""
        } ${active ? "font-semibold text-brand" : "text-ink-soft"}`}
      >
        <span className={`flex h-4 w-4 flex-none items-center justify-center rounded border transition ${
          active ? "border-brand bg-brand text-white" : "border-ink/25"
        }`}>
          {active && <span className="text-[10px] leading-none">✓</span>}
        </span>

        {o.flag && <span className="text-base leading-none">{o.flag}</span>}
        {Icon && !o.flag && <Icon />}

        <span className="flex-1">{o.label}</span>
        {o.count !== undefined && <span className="text-xs text-ink/40">({o.count})</span>}
      </Link>

      {o.children && (
        <ul className="mt-0.5">
          {o.children.map((c) => (
            <Row key={c.value} o={c} base={base} sp={sp} param={param} indent />
          ))}
        </ul>
      )}
    </li>
  );
}

function Group({ title, children, open = true }: {
  title: string; children: React.ReactNode; open?: boolean;
}) {
  return (
    <details open={open} className="group border-b border-ink/10 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-ink/40 transition group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

export default function FilterSidebar({ base, sp }: { base: string; sp: SearchParams }) {
  const n = activeCount(sp);

  return (
    <aside className="lg:sticky lg:top-40 lg:self-start">
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-serif text-lg font-bold">Φίλτρο:</h2>
        {n > 0 && (
          <Link href={buildUrl(base, {}, { q: sp.q, sort: sp.sort })}
            className="text-xs font-semibold text-brand hover:underline">
            Καθαρισμός ({n})
          </Link>
        )}
      </div>

      <Group title="Κατηγορία">
        <ul className="space-y-0.5">
          {CATEGORY_FILTER.map((o) => (
            <Row key={o.value} o={o} base={base} sp={sp} param="cat" />
          ))}
        </ul>
      </Group>

      <Group title="Χώρα προέλευσης">
        <ul className="space-y-0.5">
          {ORIGIN_FILTER.map((o) => (
            <Row key={o.value} o={o} base={base} sp={sp} param="cat" />
          ))}
        </ul>
        <p className="mt-2 px-2 text-xs leading-snug text-ink/40">
          Περισσότερες χώρες μόλις μπει το πεδίο προέλευσης στα προϊόντα.
        </p>
      </Group>

      <Group title="Σε έκπτωση">
        <Link href={buildUrl(base, sp, { offers: sp.offers === "1" ? undefined : "1" })}
          className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[15px] transition hover:bg-cream ${
            sp.offers === "1" ? "font-semibold text-brand" : "text-ink-soft"
          }`}>
          <span className={`flex h-4 w-4 flex-none items-center justify-center rounded border transition ${
            sp.offers === "1" ? "border-brand bg-brand text-white" : "border-ink/25"
          }`}>
            {sp.offers === "1" && <span className="text-[10px] leading-none">✓</span>}
          </span>
          <IconTag />
          <span>Μόνο προσφορές</span>
        </Link>
      </Group>

      <Group title="Τιμή">
        <ul className="space-y-0.5">
          {PRICE_FILTER.map((o) => (
            <Row key={o.value} o={{ ...o, icon: undefined }} base={base} sp={sp} param="price" />
          ))}
        </ul>
        <div className="mt-2 flex items-center gap-2 px-2 text-xs text-ink/40">
          <IconEuro /> Τιμές ανά κιλό
        </div>
      </Group>
    </aside>
  );
}
