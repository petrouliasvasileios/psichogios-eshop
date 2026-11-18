import { MARQUEE } from "@/lib/data";

/** Λωρίδα που ρολάρει συνεχόμενα. Το περιεχόμενο γράφεται δύο φορές για να μη «σπάει». */
export default function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {MARQUEE.map((t) => (
        <span key={t} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-lg font-bold text-ink sm:text-xl">{t}</span>
          <span className="text-brand">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cream-dark py-4">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
