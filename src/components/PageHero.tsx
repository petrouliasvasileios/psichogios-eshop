export default function PageHero({ eyebrow, title, lead }: {
  eyebrow?: string; title: string; lead?: string;
}) {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{lead}</p>}
      </div>
    </section>
  );
}
