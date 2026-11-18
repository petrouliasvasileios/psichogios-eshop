import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SafeImage from "@/components/SafeImage";
import { formatDate, getPosts } from "@/lib/blog";
import { SITE } from "@/lib/data";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Συμβουλές για κοπές, ψήσιμο και συντήρηση κρέατος, συνταγές και νέα από τον ΨΥΧΟΓΥΙΟ Delicatessen.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts(12);

  return (
    <>
      <PageHero
        eyebrow="Butcher's blog"
        title="Από τον πάγκο του κρεοπώλη"
        lead="Κοπές, ψήσιμο, συντήρηση και συνταγές — όσα μαθαίνει κανείς σε τρεις γενιές πίσω από τον πάγκο."
      />

      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-ink/10 bg-white p-12 text-center">
            <div className="text-5xl">📝</div>
            <h2 className="mt-4 text-2xl">Τα πρώτα άρθρα έρχονται σύντομα</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Ετοιμάζουμε οδηγούς για τις κοπές του μοσχαριού, το σωστό ψήσιμο στη σχάρα και τη
              συντήρηση του κρέατος στο ψυγείο. Στο μεταξύ, ρωτήστε μας ό,τι θέλετε στο{" "}
              {SITE.phones[0]}.
            </p>
            <Link href="/shop" className="btn-primary mt-6">Δείτε τα προϊόντα</Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:shadow-lg">
                <Link href={`/blog/${p.slug}`} className="block aspect-[16/10] overflow-hidden bg-cream-dark">
                  <SafeImage src={p.image} alt={p.imageAlt ?? p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs uppercase tracking-wider text-gold" dateTime={p.date}>
                    {formatDate(p.date)}
                  </time>
                  <h2 className="mt-2 text-xl leading-snug">
                    <Link href={`/blog/${p.slug}`} className="hover:text-brand">{p.title}</Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}`} className="mt-4 text-sm font-semibold text-brand hover:underline">
                    Διαβάστε περισσότερα →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
