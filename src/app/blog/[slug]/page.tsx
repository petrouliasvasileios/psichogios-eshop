import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { formatDate, getPostBySlug, getPosts } from "@/lib/blog";
import { SITE } from "@/lib/data";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts(50);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt.slice(0, 160),
      images: post.image ? [post.image] : [],
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    image: post.image ? [post.image] : [],
    publisher: { "@type": "Organization", name: SITE.name, logo: SITE.logo },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-sm text-ink/60">
        <Link href="/" className="hover:text-brand">Αρχική</Link>
        {" / "}<Link href="/blog" className="hover:text-brand">Blog</Link>
        {" / "}<span className="text-ink">{post.title}</span>
      </nav>

      <time className="text-xs uppercase tracking-wider text-gold" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <h1 className="mt-2 text-3xl leading-tight sm:text-5xl">{post.title}</h1>

      {post.image && (
        <div className="mt-8 overflow-hidden rounded-3xl">
          <SafeImage src={post.image} alt={post.imageAlt ?? post.title} className="w-full object-cover" />
        </div>
      )}

      <div className="prose-psichogios mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="mt-12 rounded-2xl bg-cream-dark p-6 text-center">
        <p className="text-ink-soft">Θέλετε να δοκιμάσετε ό,τι διαβάσατε;</p>
        <Link href="/shop" className="btn-primary mt-4">Δείτε τα προϊόντα μας</Link>
      </div>

      <div className="mt-8 text-center">
        <Link href="/blog" className="text-sm font-semibold text-brand hover:underline">← Όλα τα άρθρα</Link>
      </div>
    </article>
  );
}
