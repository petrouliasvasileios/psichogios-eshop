# Ανέβασμα σε Vercel (demo / preview)

## Πριν ανεβάσετε: δοκιμαστικό build

Ο `npm run dev` είναι πιο επιεικής από το κανονικό build. Τρέξτε **μία φορά** τοπικά:

```bash
cd ~/Documents/PSICHOGIOS-ESHOP
npm run build
```

Αν περάσει, περνάει και στο Vercel. Αν βγάλει σφάλματα, στείλτε τα για διόρθωση.

## 1. GitHub

```bash
cd ~/Documents/PSICHOGIOS-ESHOP
git init
git add .
git commit -m "Αρχική έκδοση Next.js frontend"
```

Μετά φτιάξτε **ιδιωτικό** repository στο GitHub και κάντε push.
Το `.gitignore` ήδη εξαιρεί `node_modules`, `.next` και `.env*.local`.

## 2. Vercel

1. vercel.com → Add New → Project → επιλογή του repository.
2. Το Next.js αναγνωρίζεται αυτόματα — μην αλλάξετε τίποτα στις ρυθμίσεις build.
3. **Environment Variables** — προσθέστε:

| Όνομα | Τιμή |
|---|---|
| `NEXT_PUBLIC_WC_BASE_URL` | `https://shop.psichogiosmeat.gr` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` |
| `NEXT_PUBLIC_SITE_URL` | η διεύθυνση που θα σας δώσει το Vercel |

4. Deploy.

## 3. Έλεγχος μετά το deploy

- [ ] Φορτώνουν τα προϊόντα; (αν όχι, ο server της DNSHOST ίσως μπλοκάρει τα αιτήματα από το Vercel)
- [ ] Το `/robots.txt` γράφει `Disallow: /` — **πρέπει**, όσο είναι demo.
- [ ] Δοκιμή σε κινητό: μενού, φίλτρα, καλάθι, ταμείο.
- [ ] Το κουμπί «Δείτε πού παραδίδουμε».

## ⚠ Γιατί κλειστή ευρετηρίαση

Αν η Google δει το demo, θα έχετε **τρεις** διευθύνσεις με το ίδιο περιεχόμενο:
το παλιό `psichogiosmeat.gr`, το `shop.psichogiosmeat.gr` και το demo. Αυτό διασπά την
αξία του domain και βλάπτει την κατάταξη — ακριβώς το αντίθετο από τον στόχο του project.

Η ευρετηρίαση ανοίγει **μόνο** στο go-live, αλλάζοντας το `NEXT_PUBLIC_ALLOW_INDEXING`
σε `true` στο κανονικό domain.

## Τι δεν δουλεύει ακόμη στο demo

- Το **ταμείο** είναι επίδειξη — δεν δημιουργεί παραγγελία και δεν χρεώνει.
- Η **φόρμα χονδρικής** δεν στέλνει email ακόμη.
- Τα **νομικά κείμενα** είναι προσχέδια και περιμένουν νομικό έλεγχο.

Μην το μοιράσετε σε πελάτες ως κανονικό κατάστημα — μόνο για εσωτερική επισκόπηση.
