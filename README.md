# ΨΥΧΟΓΥΙΟΣ Delicatessen — Next.js frontend

Headless frontend. Ο κατάλογος έρχεται **ζωντανά** από το WooCommerce Store API
του `shop.psichogiosmeat.gr` (δημόσιο, read-only, χωρίς κλειδιά).

## Εκκίνηση

```bash
npm install
npm run dev
```

Ή διπλό κλικ στο `start.command`. Άνοιγμα: http://localhost:3000

## Πώς συνδέεται με το WooCommerce

- `src/lib/woo.ts` — όλα τα fetch προς `/wp-json/wc/store/v1/products`.
  Cache 10 λεπτά (ISR). Αν το shop δεν απαντά, οι σελίδες δείχνουν άδειο κατάλογο αντί για σφάλμα.
- `src/lib/categories.ts` — η δομή των 34 κατηγοριών με τα πραγματικά IDs του WooCommerce.
  Είναι στατική ώστε το mega menu να εμφανίζεται ακαριαία. **Αν αλλάξουν οι κατηγορίες στο
  WooCommerce, ενημερώνεται αυτό το αρχείο.**
- Τιμές: το Store API δίνει cents (`"1000"` → 10,00 €) — η μετατροπή γίνεται στο `woo.ts`.

## Δομή

- `src/app/` — σελίδες (App Router): αρχική, `shop`, `category/[slug]`, `product/[slug]`,
  `cart`, `checkout`, `chondriki`, `epikoinonia`, `sitemap.ts`, `robots.ts`
- `src/components/` — Header (με mega menu), MegaMenu, Announcements, HeroSlider,
  ProductCard, CartDrawer, AddToCart, FreeShippingBar, SafeImage, Footer
- `src/lib/cart.tsx` — καλάθι σε React Context + localStorage (κρατά αντίγραφο τιμής/εικόνας)

## Αρχική σελίδα: hero & προμηθευτές

- **Hero** (`src/components/HeroVideo.tsx`): full-bleed, 72–82vh. Αν βάλετε βίντεο στο
  `public/videos/` και γράψετε τη διαδρομή στο `HERO.video` (`src/lib/data.ts`), παίζει βίντεο.
  Αλλιώς εναλλάσσει φωτογραφίες με αργό ζουμ (Ken Burns). Το λογότυπο εμφανίζεται πάνω στο hero.
- **Προμηθευτές** (`src/components/SuppliersCarousel.tsx`): οριζόντιο carousel με βελάκια.
  Η λίστα είναι στο `SUPPLIERS` (`src/lib/data.ts`) και **θέλει επιβεβαίωση**.
  Τα λογότυπα μπαίνουν στο `public/suppliers/`. Όσο λείπουν, δείχνει το όνομα σε πλακέτα.

## Σηματάκια & κυλιόμενη λωρίδα

- `src/components/BadgesStrip.tsx` — 4 σηματάκια κάτω από το hero (χονδρική, αυθημερόν
  παράδοση, δωρεάν μεταφορικά, «δείτε αν εξυπηρετούμε» που ανοίγει τον έλεγχο Τ.Κ.).
- `src/components/Marquee.tsx` — η λωρίδα που ρολάρει. Τα κείμενα στο `MARQUEE` (`src/lib/data.ts`).
- **Δόσεις τύπου Klarna**: `INSTALLMENTS` στο `src/lib/data.ts`, με `enabled: false`.
  Μην το ανοίξετε πριν υπάρξει σύμβαση με πάροχο — είναι δημόσια υπόσχεση προς τον πελάτη.
  Όσο είναι κλειστό, στη θέση του εμφανίζεται το «Δωρεάν μεταφορικά άνω των 30€».

## Πλάτος & full bleed

Όλο το site χρησιμοποιεί `max-w-[1600px]` με περιθώρια `px-5 / sm:px-8 / lg:px-12`.
Οι έγχρωμες ζώνες (Premium, εργαστήριο, προμηθευτές, ιστορία) είναι full bleed — το χρώμα
πιάνει όλο το πλάτος και μόνο το περιεχόμενο μέσα περιορίζεται.

## Φίλτρα καταλόγου

`src/lib/filters.ts` + `src/components/FilterSidebar.tsx` + `src/components/FilterIcons.tsx`.
Πλαϊνή στήλη αριστερά (σε κινητό πτυσσόμενη), με εικονίδια ζώων και σημαίες.
Όλα τα φίλτρα γράφονται στο URL, άρα δουλεύουν χωρίς JavaScript και μοιράζονται ως link.

Λειτουργούν σήμερα: **Κατηγορία** (με υποκατηγορίες), **Χώρα προέλευσης** (όσες υπάρχουν
ως κατηγορίες), **Σε έκπτωση**, **Τιμή**.

⚠ **Δεν μπορούν να υπάρξουν ακόμη**: «Τρόπος κοπής», «Τρόπος μαγειρέματος», «Προμηθευτής»,
πλήρης λίστα χωρών. Το WooCommerce δεν έχει **κανένα product attribute**. Χρειάζονται:
1. Δημιουργία global attributes στο WooCommerce (π.χ. `pa_kopi`, `pa_mageirema`, `pa_xora`).
2. Χαρακτηρισμός των 166 προϊόντων με τις τιμές τους.
3. Προσθήκη νέας ομάδας στο `src/lib/filters.ts` και εικονιδίων στο `FilterIcons.tsx`.

## Χρώματα brand

Ένα σημείο: `tailwind.config.ts` → `theme.extend.colors`
(`brand` βαθύ κόκκινο, `ink` ανθρακί, `cream` φόντο, `gold` λεπτομέρειες).

## Ζώνες παράδοσης

`src/lib/delivery.ts` — τα εύρη Τ.Κ. για τον έλεγχο «Πού παραδίδουμε».
**Είναι πρόταση και θέλουν επιβεβαίωση**: στο WooCommerce υπάρχει σήμερα μόνο μία ζώνη
(«Ελλάδα») χωρίς Τ.Κ. Αλλάξτε τα `ranges` / `areas` εκεί και ενημερώνεται παντού.

## Ρυθμίσεις που θέλουν απόφαση

Στο `src/lib/data.ts`:
- `shippingFee` — κόστος μεταφορικών κάτω από τα 30€ (τώρα 3,50€, προσωρινό)
- `priceSuffix` — εμφανίζεται δίπλα σε κάθε τιμή (τώρα «/ κιλό»)
- `social` — οι σύνδεσμοι Facebook/Instagram είναι placeholder

## Φόρμα χονδρικής

`src/app/api/wholesale/route.ts` — **δεν στέλνει ακόμη email**. Καταγράφει το αίτημα στο log
του server ώστε η φόρμα να δουλεύει τοπικά. Πριν το go-live πρέπει να συνδεθεί με
email (Resend/SMTP) ή με εγγραφή στο WordPress.

## Επόμενο βήμα (Φάση 4)

Το ταμείο σήμερα είναι demo. Η ολοκλήρωση θα γίνεται είτε με προώθηση στο checkout
του WooCommerce, είτε με δημιουργία παραγγελίας μέσω REST API v3 (χρειάζεται
`WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET` στο `.env.local`).
