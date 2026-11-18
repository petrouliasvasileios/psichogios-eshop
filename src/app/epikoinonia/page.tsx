import type { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: `Κατάστημα ${SITE.name}: ${SITE.address}. Τηλέφωνα ${SITE.phones.join(", ")}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl">Επικοινωνία</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <div>
            <h2 className="text-lg">Το κατάστημά μας</h2>
            <p className="mt-1 text-ink-soft">{SITE.address}</p>
          </div>
          <div>
            <h2 className="text-lg">Τηλέφωνα</h2>
            {SITE.phones.map((p) => (
              <p key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="text-brand hover:underline">{p}</a></p>
            ))}
          </div>
          <div>
            <h2 className="text-lg">Παραγγελίες 24/7</h2>
            <p className="mt-1">
              <a href={`viber://chat?number=%2B30${SITE.mobile.replace(/\s/g, "")}`} className="text-brand hover:underline">{SITE.mobile}</a>
            </p>
            <p className="text-sm text-ink/60">{SITE.mobileNote}</p>
          </div>
          <div>
            <h2 className="text-lg">Email</h2>
            <p><a href={`mailto:${SITE.email}`} className="text-brand hover:underline">{SITE.email}</a></p>
            <p className="text-sm">Χονδρική: <a href={`mailto:${SITE.b2bEmail}`} className="text-brand hover:underline">{SITE.b2bEmail}</a></p>
          </div>
          <div>
            <h2 className="text-lg">Ωράριο</h2>
            <p className="mt-1 text-ink-soft">{SITE.hours}</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-sm">
          <iframe
            title="Χάρτης καταστήματος"
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}
