import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { SITE } from "@/lib/data";

const INFO_LINKS = [
  { label: "Η εταιρία μας", href: "/etairia" },
  { label: "Χονδρική — Β2Β", href: "/chondriki" },
  { label: "Μέθοδοι και κόστος μεταφορικών", href: "/apostoles" },
  { label: "Τρόποι πληρωμής", href: "/tropoi-pliromis" },
  { label: "Συχνές ερωτήσεις", href: "/syxnes-erotiseis" },
  { label: "Blog", href: "/blog" },
  { label: "Πολιτική επιστροφών και ακυρώσεων", href: "/epistrofes" },
  { label: "Όροι και προϋποθέσεις", href: "/oroi-xrisis" },
  { label: "Πολιτική απορρήτου", href: "/aporrito" },
];

const ACCOUNT_LINKS = [
  { label: "Το καλάθι μου", href: "/cart" },
  { label: "Ολοκλήρωση παραγγελίας", href: "/checkout" },
  { label: "Αίτηση χονδρικής", href: "/chondriki#aitisi" },
  { label: "Επικοινωνήστε μαζί μας", href: "/epikoinonia" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-board text-cream/80">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        {/* Η εταιρία μας */}
        <div>
          <h3 className="mb-4 font-serif text-xl text-white">Η εταιρία μας</h3>
          <p className="text-sm leading-relaxed">
            Η οικογενειακή επιχείρηση εκτροφής και εμπορίας πουλερικών ΨΥΧΟΓΥΙΟΣ ιδρύθηκε το {SITE.founded}
            {" "}στη Λυκόβρυση Αττικής, από τον παππού Δημήτρη Ψυχογυιό και τη σύζυγό του. Τρεις γενιές
            αργότερα, συνεχίζουμε με κρέατα και πουλερικά ελληνικής προέλευσης.
          </p>
          <SocialLinks className="mt-5 text-white" />
        </div>

        {/* Πληροφορίες */}
        <div>
          <h3 className="mb-4 font-serif text-xl text-white">Πληροφορίες</h3>
          <ul className="space-y-2.5 text-sm">
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ο λογαριασμός μου */}
        <div>
          <h3 className="mb-4 font-serif text-xl text-white">Ο λογαριασμός μου</h3>
          <ul className="space-y-2.5 text-sm">
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Επικοινωνία */}
        <div>
          <h3 className="mb-4 font-serif text-xl text-white">Επικοινωνία</h3>
          <address className="space-y-2.5 text-sm not-italic">
            <p className="font-semibold text-white">{SITE.legalName}</p>
            <p>{SITE.activity}</p>
            <p>{SITE.street}<br />{SITE.city} {SITE.postalCode}</p>
            {SITE.phones.map((p) => (
              <p key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} className="transition hover:text-white hover:underline">{p}</a>
              </p>
            ))}
            <p>
              <a href={`viber://chat?number=%2B30${SITE.mobile.replace(/\s/g, "")}`} className="transition hover:text-white hover:underline">
                {SITE.mobile}
              </a>{" "}
              <span className="text-cream/50">· {SITE.mobileNote}</span>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="transition hover:text-white hover:underline">{SITE.email}</a>
            </p>
            <p>
              <a href={`mailto:${SITE.b2bEmail}`} className="transition hover:text-white hover:underline">{SITE.b2bEmail}</a>{" "}
              <span className="text-cream/50">· χονδρική</span>
            </p>
          </address>

          <h4 className="mb-2 mt-6 font-serif text-lg text-white">Ώρες λειτουργίας</h4>
          <ul className="space-y-1 text-sm">
            <li>• Δευτέρα – Σάββατο: 06:00 – 13:00</li>
            <li>• Κυριακή: Κλειστά</li>
          </ul>
          <p className="mt-3 text-xs text-cream/50">
            Οι παραγγελίες από το e-shop γίνονται 24 ώρες το 24ωρο.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 px-5 text-xs text-cream/50 sm:flex-row sm:px-8 lg:px-12">
          <p>Πνευματική ιδιοκτησία © {new Date().getFullYear()} {SITE.legalName}. Με επιφύλαξη παντός δικαιώματος.</p>
          <p>
            Α.Φ.Μ. {SITE.vat} · {SITE.taxOffice} · Γ.Ε.ΜΗ. {SITE.gemh} · Αρ. έγκρισης εργαστηρίου {SITE.approvalNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
