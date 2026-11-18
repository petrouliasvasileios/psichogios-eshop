/**
 * Πραγματική δομή κατηγοριών από το WooCommerce (shop.psichogiosmeat.gr), 17/11/2026.
 * Τα IDs χρησιμοποιούνται για τα queries στο Store API.
 */

export type Cat = { id: number; name: string; slug: string; count: number };
export type CatGroup = Cat & { children: Cat[] };

export const CAT: Record<string, Cat> = {
  premium: { id: 95, name: "Premium", slug: "premium", count: 14 },
  katepsygmena: { id: 103, name: "Κατεψυγμένα", slug: "katepsygmena", count: 15 },
  kreata: { id: 112, name: "Κρέατα", slug: "kreata", count: 127 },
  kreatoskevasmata: { id: 106, name: "Κρεατοσκευάσματα", slug: "kreatoskevasmata", count: 52 },

  moschari: { id: 91, name: "Μοσχάρι", slug: "moschari", count: 49 },
  choirino: { id: 89, name: "Χοιρινό", slug: "choirino", count: 23 },
  poulerika: { id: 87, name: "Πουλερικά", slug: "poulerika", count: 25 },
  oplifora: { id: 93, name: "Οπληφόρα", slug: "oplifora", count: 30 },

  "moschari-ellados": { id: 113, name: "Μοσχάρι Ελλάδος", slug: "moschari-ellados", count: 5 },
  "black-angus": { id: 114, name: "Black Angus", slug: "black-angus", count: 6 },
  "moschari-ispanias": { id: 115, name: "Μοσχάρι Ισπανίας", slug: "moschari-ispanias", count: 6 },
  "moschari-galaktos": { id: 116, name: "Μοσχάρι Γάλακτος", slug: "moschari-galaktos", count: 2 },
  "moschari-amerikis": { id: 117, name: "Μοσχάρι Αμερικής", slug: "moschari-amerikis", count: 2 },
  "choirino-ispanias": { id: 118, name: "Χοιρινό Ισπανίας", slug: "choirino-ispanias", count: 1 },
  "choirino-galaktos": { id: 119, name: "Χοιρινό Γάλακτος", slug: "choirino-galaktos", count: 2 },
  kotopoulo: { id: 120, name: "Κοτόπουλο", slug: "kotopoulo", count: 19 },
  galopoula: { id: 121, name: "Γαλοπούλα", slug: "galopoula", count: 5 },
  arni: { id: 122, name: "Αρνί", slug: "arni", count: 18 },
  katsiki: { id: 123, name: "Κατσίκι", slug: "katsiki", count: 3 },
  zygouri: { id: 124, name: "Ζυγούρι", slug: "zygouri", count: 2 },
  gida: { id: 125, name: "Γίδα", slug: "gida", count: 1 },
  provato: { id: 126, name: "Πρόβατο", slug: "provato", count: 5 },
  kouneli: { id: 96, name: "Κουνέλι", slug: "kouneli", count: 1 },

  souvlakia: { id: 127, name: "Σουβλάκια", slug: "souvlakia", count: 8 },
  "mpiftekia-keftedes": { id: 128, name: "Μπιφτέκια & Κεφτέδες", slug: "mpiftekia-keftedes", count: 5 },
  kimades: { id: 129, name: "Κιμάδες", slug: "kimades", count: 12 },
  "rola-gemista": { id: 130, name: "Ρολά Γεμιστά", slug: "rola-gemista", count: 5 },
  kontosouvli: { id: 131, name: "Κοντοσούβλι", slug: "kontosouvli", count: 2 },
  "kokoretsi-gardoumpa": { id: 132, name: "Κοκορέτσι & Γαρδούμπα", slug: "kokoretsi-gardoumpa", count: 2 },
  pane: { id: 133, name: "Πανέ", slug: "pane", count: 3 },
  gyros: { id: 134, name: "Γύρος", slug: "gyros", count: 4 },
  "tigania-marinarismena": { id: 135, name: "Τηγανιά & Μαριναρισμένα", slug: "tigania-marinarismena", count: 2 },
  kapnista: { id: 136, name: "Καπνιστά", slug: "kapnista", count: 2 },
  loukanika: { id: 107, name: "Λουκάνικα", slug: "loukanika", count: 8 },
};

export const ALL_CATEGORIES = Object.values(CAT);
export const getCategory = (slug: string) => CAT[slug];

const g = (key: string, childKeys: string[]): CatGroup => ({
  ...CAT[key],
  children: childKeys.map((k) => CAT[k]),
});

/** Ομάδες για το mega menu των «Κρέατα». */
export const KREATA_GROUPS: CatGroup[] = [
  g("moschari", ["moschari-ellados", "black-angus", "moschari-ispanias", "moschari-galaktos", "moschari-amerikis"]),
  g("choirino", ["choirino-ispanias", "choirino-galaktos"]),
  g("poulerika", ["kotopoulo", "galopoula"]),
  g("oplifora", ["arni", "katsiki", "zygouri", "gida", "provato", "kouneli"]),
];

/** Οι 12 υποκατηγορίες των «Κρεατοσκευάσματα», σε 3 στήλες. */
export const KREATOSKEVASMATA_CHILDREN = [
  "souvlakia", "kimades", "loukanika", "mpiftekia-keftedes",
  "rola-gemista", "gyros", "kontosouvli", "kokoretsi-gardoumpa",
  "pane", "tigania-marinarismena", "kapnista",
].map((k) => CAT[k]);

export type MenuItem = {
  label: string;
  href: string;
  mega?: "kreata" | "kreatoskevasmata";
  highlight?: boolean;
};

export const MAIN_MENU: MenuItem[] = [
  { label: "Η εταιρία", href: "/etairia" },
  { label: "Premium", href: "/category/premium" },
  { label: "Κρέατα", href: "/category/kreata", mega: "kreata" },
  { label: "Κρεατοσκευάσματα", href: "/category/kreatoskevasmata", mega: "kreatoskevasmata" },
  { label: "Κατεψυγμένα", href: "/category/katepsygmena" },
  { label: "Προσφορές", href: "/shop?offers=1", highlight: true },
  { label: "Χονδρική", href: "/chondriki" },
  { label: "Blog", href: "/blog" },
];

/** Γονικές σχέσεις, για breadcrumbs. */
export const PARENT_OF: Record<string, string> = {
  moschari: "kreata", choirino: "kreata", poulerika: "kreata", oplifora: "kreata",
  "moschari-ellados": "moschari", "black-angus": "moschari", "moschari-ispanias": "moschari",
  "moschari-galaktos": "moschari", "moschari-amerikis": "moschari",
  "choirino-ispanias": "choirino", "choirino-galaktos": "choirino",
  kotopoulo: "poulerika", galopoula: "poulerika",
  arni: "oplifora", katsiki: "oplifora", zygouri: "oplifora", gida: "oplifora",
  provato: "oplifora", kouneli: "oplifora",
  souvlakia: "kreatoskevasmata", "mpiftekia-keftedes": "kreatoskevasmata", kimades: "kreatoskevasmata",
  "rola-gemista": "kreatoskevasmata", kontosouvli: "kreatoskevasmata", "kokoretsi-gardoumpa": "kreatoskevasmata",
  pane: "kreatoskevasmata", gyros: "kreatoskevasmata", "tigania-marinarismena": "kreatoskevasmata",
  kapnista: "kreatoskevasmata", loukanika: "kreatoskevasmata",
};

export const childrenOf = (slug: string) =>
  ALL_CATEGORIES.filter((c) => PARENT_OF[c.slug] === slug);
