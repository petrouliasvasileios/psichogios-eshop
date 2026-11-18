/**
 * Φίλτρα καταλόγου.
 *
 * Δουλεύουν πάνω σε ΠΡΑΓΜΑΤΙΚΑ δεδομένα του WooCommerce: κατηγορίες, εκπτώσεις, τιμές.
 *
 * ⚠ Τα φίλτρα «Τρόπος κοπής», «Τρόπος μαγειρέματος» και «Προμηθευτής» ΔΕΝ μπορούν να
 * υπάρξουν ακόμη: το WooCommerce δεν έχει κανένα product attribute. Μόλις δημιουργηθούν
 * τα attributes και χαρακτηριστούν τα προϊόντα, προστίθενται εδώ ως νέα ομάδα.
 */

import { CAT, type Cat } from "./categories";

export type SearchParams = {
  q?: string;
  cat?: string;
  offers?: string;
  price?: string;
  sort?: string;
};

export type FilterOption = {
  label: string;
  /** Τιμή της παραμέτρου στο URL. */
  value: string;
  count?: number;
  /** Σημαία ως emoji, για την προέλευση. */
  flag?: string;
  /** Κλειδί εικονιδίου (βλ. FilterIcons). */
  icon?: string;
  /** Υποκατηγορίες, εμφανίζονται με εσοχή. */
  children?: FilterOption[];
};

const opt = (c: Cat, extra: Partial<FilterOption> = {}): FilterOption => ({
  label: c.name,
  value: c.slug,
  count: c.count,
  ...extra,
});

/** Ομάδα «Κατηγορία» — με εικονίδια ζώων, όπως στο siakos. */
export const CATEGORY_FILTER: FilterOption[] = [
  opt(CAT.moschari, {
    icon: "moschari",
    children: [
      opt(CAT["moschari-ellados"], { flag: "🇬🇷" }),
      opt(CAT["black-angus"]),
      opt(CAT["moschari-ispanias"], { flag: "🇪🇸" }),
      opt(CAT["moschari-galaktos"]),
      opt(CAT["moschari-amerikis"], { flag: "🇺🇸" }),
    ],
  }),
  opt(CAT.choirino, {
    icon: "choirino",
    children: [
      opt(CAT["choirino-ispanias"], { flag: "🇪🇸" }),
      opt(CAT["choirino-galaktos"]),
    ],
  }),
  opt(CAT.poulerika, {
    icon: "poulerika",
    children: [opt(CAT.kotopoulo), opt(CAT.galopoula)],
  }),
  opt(CAT.oplifora, {
    icon: "oplifora",
    children: [
      opt(CAT.arni), opt(CAT.katsiki), opt(CAT.zygouri),
      opt(CAT.gida), opt(CAT.provato), opt(CAT.kouneli, { icon: "kouneli" }),
    ],
  }),
  opt(CAT.kreatoskevasmata, {
    icon: "kreatoskevasmata",
    children: [
      opt(CAT.souvlakia), opt(CAT.kimades), opt(CAT.loukanika),
      opt(CAT["mpiftekia-keftedes"]), opt(CAT["rola-gemista"]), opt(CAT.gyros),
      opt(CAT.kontosouvli), opt(CAT["kokoretsi-gardoumpa"]), opt(CAT.pane),
      opt(CAT["tigania-marinarismena"]), opt(CAT.kapnista),
    ],
  }),
  opt(CAT.premium, { icon: "premium" }),
  opt(CAT.katepsygmena, { icon: "katepsygmena" }),
];

/**
 * Ομάδα «Χώρα προέλευσης» — με σημαίες.
 * Στηρίζεται στις κατηγορίες προέλευσης που υπάρχουν ήδη στο WooCommerce.
 * Για πλήρη λίστα χωρών χρειάζεται attribute «Χώρα προέλευσης» στα προϊόντα.
 */
export const ORIGIN_FILTER: FilterOption[] = [
  { label: "Ελλάδα", value: "moschari-ellados", flag: "🇬🇷", count: CAT["moschari-ellados"].count },
  { label: "Ισπανία", value: "moschari-ispanias", flag: "🇪🇸", count: CAT["moschari-ispanias"].count },
  { label: "Αμερική", value: "moschari-amerikis", flag: "🇺🇸", count: CAT["moschari-amerikis"].count },
];

export const PRICE_FILTER: FilterOption[] = [
  { label: "έως 5€", value: "0-500" },
  { label: "5€ – 10€", value: "500-1000" },
  { label: "10€ – 20€", value: "1000-2000" },
  { label: "20€ και άνω", value: "2000-" },
];

export const SORTS = [
  { key: "date-desc", label: "Νεότερα" },
  { key: "price-asc", label: "Τιμή ↑" },
  { key: "price-desc", label: "Τιμή ↓" },
  { key: "title-asc", label: "Α–Ω" },
];

/** Μετατρέπει το «1000-2000» σε παραμέτρους του Store API (λεπτά του ευρώ). */
export function parsePrice(price?: string) {
  if (!price) return {};
  const [min, max] = price.split("-");
  return {
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
  };
}

/** Φτιάχνει URL κρατώντας τα υπόλοιπα φίλτρα. Τιμή undefined καθαρίζει το φίλτρο. */
export function buildUrl(base: string, current: SearchParams, patch: Partial<SearchParams>) {
  const merged: Record<string, string | undefined> = { ...current, ...patch };
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export const activeCount = (sp: SearchParams) =>
  [sp.cat, sp.offers, sp.price].filter(Boolean).length;
