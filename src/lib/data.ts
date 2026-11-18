/** Στοιχεία καταστήματος και εικαστικό υλικό. Τα προϊόντα έρχονται από το WooCommerce (woo.ts). */

export const SITE = {
  name: "ΨΥΧΟΓΥΙΟΣ Delicatessen",
  shortName: "ΨΥΧΟΓΥΙΟΣ",
  /** Πλήρης νομική επωνυμία, όπως στα παραστατικά. */
  legalName: "ΨΥΧΟΓΥΙΟΣ DELICATESSEN FOOD SERVICE ΜΟΝ. Ι.Κ.Ε.",
  tagline: "Delicatessen Food Services",
  activity: "Εμπόριο & επεξεργασία κρεάτων",
  logo: "/images/logo-orizontio.svg",

  /** Εταιρικά στοιχεία */
  vat: "093071707",
  /** Επιβεβαιώθηκε 17/11/2026: η Δ.Ο.Υ. Αμαρουσίου μετονομάστηκε σε ΚΕ.ΦΟ.ΔΕ Αττικής. */
  taxOffice: "Δ.Ο.Υ. ΚΕ.ΦΟ.ΔΕ Αττικής",
  gemh: "001009201000",
  euid: "ELGEMI.001009201000",
  legalRep: "Δημήτρης Ψυχογυιός",
  /** Αριθμός έγκρισης εργαστηρίου (κτηνιατρικός). */
  approvalNumber: "25 ΡΚ 430",

  /** Έδρα */
  street: "Λεωφόρος Σοφοκλή Βενιζέλου 92",
  city: "Λυκόβρυση",
  postalCode: "141 23",
  region: "Αττική",
  get address() {
    return `${this.street}, ${this.city} ${this.postalCode}`;
  },

  /** Επικοινωνία */
  phones: ["210 2844416", "210 2829759"],
  /** Κινητό για παραγγελίες μέσω Viber / SMS, 24 ώρες το 24ωρο. */
  mobile: "694 5932442",
  mobileNote: "Viber / SMS — 24 ώρες, 7 ημέρες",
  email: "info@psichogiosmeat.gr",
  b2bEmail: "b2b@psichogiosmeat.gr",
  website: "https://www.psichogiosmeat.gr",

  hours: "Δευτέρα – Σάββατο: 06:00 – 13:00",
  founded: 1952,
  freeShippingFrom: 30, // € — δωρεάν μεταφορικά εντός Αθηνών
  shippingFee: 3.5, // € — ΠΡΟΣΩΡΙΝΟ, να οριστεί
  /** Εμφανίζεται δίπλα στην τιμή. */
  priceSuffix: "/ κιλό",

  social: {
    facebook: "https://www.facebook.com/psichogiosmeat",
    linkedin: "https://www.linkedin.com/company/psychogios-delicatessen-food-services/",
  },
};

/** Μηνύματα που εναλλάσσονται στην πάνω μαύρη μπάρα. */
export const ANNOUNCEMENTS = [
  "Αυθημερόν delivery σε όλη την Αττική",
  `Δωρεάν μεταφορικά για παραγγελίες άνω των ${SITE.freeShippingFrom}€`,
  "Φρέσκο κρέας με κοπή την ημέρα της παραγγελίας",
  "Οικογενειακή επιχείρηση από το 1952",
  `Παραγγελίες με Viber / SMS 24 ώρες, 7 ημέρες: ${SITE.mobile}`,
];

export const SLIDES = Array.from(
  { length: 10 },
  (_, i) => `https://www.psichogiosmeat.gr/image/catalog/slider/slide_${i + 1}.jpg`,
);

export const BANNERS = [
  { title: "Το κρεοπωλείο μας", img: "https://www.psichogiosmeat.gr/image/cache/catalog/Banners/kreopolio-320x250.jpg", href: "/category/kreata" },
  { title: "Παραδοσιακό εργαστήριο", img: "https://www.psichogiosmeat.gr/image/cache/catalog/Banners/paradosiako_ergastirio-320x250.jpg", href: "/category/kreatoskevasmata" },
  { title: "Προσφορές", img: "https://www.psichogiosmeat.gr/image/cache/catalog/Banners/prosfores-320x250.jpg", href: "/shop?offers=1" },
];

/** Εικόνα στο δεξί μέρος του mega menu — δική μας φωτογραφία από το WooCommerce. */
export const MEGA_IMAGE =
  "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/11/tomahawk-mosaiko-elassonas-psichogios-2-1024x1024.jpg";

/**
 * Full-bleed hero της αρχικής.
 * `video`: βάλτε ένα αρχείο στο public/videos/ και γράψτε εδώ τη διαδρομή,
 * π.χ. "/videos/hero.mp4". Όσο είναι null, εναλλάσσονται οι παρακάτω φωτογραφίες.
 */
export const HERO = {
  video: null as string | null,
  images: [
    "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/11/tomahawk-mosaiko-elassonas-psichogios-2.jpg",
    "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/10/t-bone-black-angus-steak-delicatessen-psichogios.jpg",
    "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/10/kontra-mprizola-black-angus-ispanias-delicatessen-psichogios.jpg",
    "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/10/skirt-diafragma-mosxou-amerikis-delicatessen-psichogios.jpg",
  ],
};

/**
 * Προμηθευτές για το carousel.
 *
 * Επαληθεύτηκαν ως υπαρκτές ελληνικές πτηνοτροφικές εταιρείες (17/11/2026).
 * ⚠ Κρατήστε μόνο όσους συνεργάζεστε πραγματικά — είναι δημόσιος ισχυρισμός.
 *
 * `logo`: τα δύο πρώτα έχουν ανέβει στο media library του WordPress σας.
 * Για τους υπόλοιπους, τα sites τους δεν επιτρέπουν αυτόματη λήψη — ζητήστε
 * τα επίσημα αρχεία από τον προμηθευτή και βάλτε τα στο public/suppliers/.
 * Όσο λείπει logo, εμφανίζεται το όνομα σε τυπογραφική πλακέτα.
 */
export type Supplier = { name: string; logo?: string; note?: string; url?: string };

const WP = "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/11";

export const SUPPLIERS: Supplier[] = [
  {
    name: "Νιτσιάκος",
    note: "Κοτόπουλα Ιωαννίνων",
    logo: `${WP}/promitheftis-nitsiakos.webp`,
    url: "https://www.nitsiakos.gr/",
  },
  {
    name: "MIMIKOS",
    note: "Κοτόπουλα",
    logo: `${WP}/promitheftis-mimikos.png`,
    url: "https://www.mimikos.gr/",
  },
  { name: "ΠΙΝΔΟΣ", note: "Α.Π.Σ. Ιωαννίνων", url: "https://www.pindos-apsi.gr/" },
  { name: "Αγγελάκης", note: "Ελαιοπουλάκι, Εύβοια", url: "https://www.aggelakis.gr/" },
  { name: "Κοτόπουλα Άρτας", note: "Α.Π.Σ. Άρτας" },
];

/** Το κείμενο που ρολάρει σαν ταινία κάτω από τα σηματάκια. */
export const MARQUEE = [
  "Φρέσκο κρέας καθημερινά",
  "Κοπή την ημέρα της παραγγελίας",
  "Ασφαλής συσκευασία υπό ψύξη",
  "Παράδοση στην Αττική",
  "Οικογενειακή επιχείρηση από το 1952",
  `Παραγγελίες με Viber / SMS 24 ώρες, 7 ημέρες: ${SITE.mobile}`,
];

/**
 * Δόσεις «αγόρασε τώρα, πλήρωσε αργότερα» (τύπου Klarna).
 *
 * ⚠ Είναι ΑΠΕΝΕΡΓΟΠΟΙΗΜΕΝΟ. Μην το ανοίξετε αν δεν έχει υπογραφεί σύμβαση με πάροχο —
 * είναι δημόσια υπόσχεση προς τον πελάτη. Μόλις ενεργοποιηθεί, βάλτε enabled: true
 * και γράψτε τον σωστό αριθμό δόσεων και τον πάροχο.
 */
export const INSTALLMENTS = {
  enabled: false,
  provider: "",
  text: "Αγόρασε τώρα, πλήρωσε αργότερα με έως 3 άτοκες δόσεις",
};

/**
 * Φωτογραφίες της σελίδας χονδρικής.
 * Βάλτε τα αρχεία στο public/wholesale/ (δείτε το README εκεί για διαστάσεις και AI prompts).
 * Όσο λείπουν, χρησιμοποιούνται δικές μας φωτογραφίες προϊόντων ως εναλλακτική.
 */
const WH = "/wholesale";
const FALLBACK = "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/11/tomahawk-mosaiko-elassonas-psichogios-2.jpg";

export const WHOLESALE_IMAGES = {
  hero: `${WH}/hero.jpg`,
  heroFallback: FALLBACK,
  workshop: `${WH}/ergastirio.jpg`,
  workshopFallback: "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/10/kontra-mprizola-black-angus-ispanias-delicatessen-psichogios.jpg",
  cold: `${WH}/psyxi.jpg`,
  coldFallback: "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/10/t-bone-black-angus-steak-delicatessen-psichogios.jpg",
  portal: `${WH}/portal.jpg`,
  portalFallback: "https://shop.psichogiosmeat.gr/wp-content/uploads/2026/10/skirt-diafragma-mosxou-amerikis-delicatessen-psichogios.jpg",
};

/**
 * Ιστορικό της εταιρίας — από το κείμενο «Σχετικά με εμάς» του παλιού site.
 * Τα έτη είναι σταθερά· τα «χρόνια λειτουργίας» υπολογίζονται δυναμικά, ώστε
 * να μη χρειάζεται ενημέρωση κάθε χρόνο.
 */
export const MILESTONES = [
  {
    year: "1952",
    title: "Η αρχή, στη Λυκόβρυση",
    text:
      "Ο παππούς Δημήτρης Ψυχογυιός και η σύζυγός του ιδρύουν την οικογενειακή επιχείρηση εκτροφής " +
      "και εμπορίας πουλερικών, με ιδιόκτητο πτηνοτροφείο και σφαγείο. Από την εκτροφή στα κοτέτσια " +
      "μέχρι τη σφαγή και τη λιανική πώληση, όλα γίνονται από τα ίδια χέρια.",
  },
  {
    year: "1974",
    title: "Το πρώτο πτηνοπωλείο στο Κολωνάκι",
    text:
      "Η επιχείρηση επεκτείνεται στο κέντρο της Αθήνας, με κατάστημα στη γωνία Μηλιώνη και Σκουφά.",
  },
  {
    year: "1989",
    title: "Η μονάδα επεξεργασίας",
    text:
      "Σε ιδιόκτητη έκταση στη Λυκόβρυση, Σοφοκλή Βενιζέλου 92, κατασκευάζεται ολοκληρωμένη μονάδα " +
      "επεξεργασίας και τεμαχισμού νωπού κρέατος, με πρατήριο λιανικής και χονδρικής στον ίδιο χώρο.",
  },
  {
    year: "Σήμερα",
    title: "Η τρίτη γενιά",
    text:
      "Τα ηνία έχουν περάσει στην τρίτη γενιά, που συνεχίζει με το ίδιο μεράκι: διανομή νωπού κρέατος " +
      "και κρεατοπαρασκευασμάτων σε σπίτια και επιχειρήσεις, ψητά εδέσματα κατόπιν παραγγελίας και " +
      "ολοκληρωμένες υπηρεσίες τροφοδοσίας.",
  },
];

/** Περιοχές των συνεργαζόμενων ελληνικών φαρμών. */
export const PARTNER_REGIONS = [
  "Αμφιλοχία", "Έδεσσα", "Βέροια", "Νάουσα", "Πιερία", "Ναύπακτος",
];

/** Οι εγκαταστάσεις, όπως τις περιγράφει η εταιρία. */
export const FACILITIES = [
  { icon: "🏭", title: "Μονάδα επεξεργασίας", text: "Επεξεργασία κρέατος και πουλερικών σε ιδιόκτητες εγκαταστάσεις στη Λυκόβρυση." },
  { icon: "🔪", title: "Χώροι τεμαχισμού", text: "Τεμαχισμός και κοπές στις προδιαγραφές της κάθε παραγγελίας." },
  { icon: "❄️", title: "Πρόψυξη & συντήρηση", text: "Ελεγχόμενη θερμοκρασία σε κάθε στάδιο, από την παραλαβή ως την αποστολή." },
  { icon: "👨‍🍳", title: "Εργαστήριο παρασκευών", text: "Παρασκευή προϊόντων κρέατος και πουλερικών — σουβλάκια, κιμάδες, ρολά, λουκάνικα." },
  { icon: "🏪", title: "Κατάστημα & πρατήριο", text: "Λιανική και χονδρική πώληση στον ίδιο χώρο με τη μονάδα." },
  { icon: "🚚", title: "Διανομή & τροφοδοσία", text: "Δικό μας δίκτυο διανομής σε οικιακούς καταναλωτές και επιχειρήσεις." },
];

/** Αξίες — αντλημένες από το κείμενο της εταιρίας. */
export const VALUES = [
  { title: "Ελληνική σφραγίδα", text: "Κρέατα και πουλερικά με αποκλειστικά ελληνική προέλευση, από πιστοποιημένους κρεοπαραγωγούς." },
  { title: "Οικογενειακές φάρμες", text: "Συνεργασίες με μικρές ελληνικές φάρμες που μοιράζονται την ίδια φιλοσοφία με εμάς." },
  { title: "Υγειονομική επάρκεια", text: "Παραγωγή υπό άρτιες υγειονομικά συνθήκες, με προϊόντα υψηλής διατροφικής αξίας." },
  { title: "Συνέχεια", text: "Τρεις γενιές με την ίδια αρχή: αγνά, γευστικά κρέατα και εξυπηρέτηση που θυμίζει γειτονιά." },
];

/** Φωτογραφίες της σελίδας «Η εταιρία μας». Αρχεία στο public/etairia/. */
export const COMPANY_IMAGES = {
  hero: "/etairia/hero.jpg",
  heroFallback: "https://www.psichogiosmeat.gr/image/catalog/slider/slide_2.jpg",
  store: "/etairia/katastima.jpg",
  storeFallback: "https://www.psichogiosmeat.gr/image/cache/catalog/Banners/kreopolio-320x250.jpg",
  workshop: "/etairia/ergastirio.jpg",
  workshopFallback: "https://www.psichogiosmeat.gr/image/cache/catalog/Banners/paradosiako_ergastirio-320x250.jpg",
};
