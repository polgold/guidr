import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getBlogPost, listBlogSlugs } from "@/lib/blog";

export const dynamicParams = true;

export function generateStaticParams() {
  const slugs = listBlogSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getBlogPost(slug, locale);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getBlogPost(slug, locale as Locale);
  if (!post) notFound();

  const fm = post.frontmatter;
  const back =
    locale === "es" ? "Volver al blog" : locale === "pt" ? "Voltar ao blog" : "Back to blog";

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/blog`}
        className="mb-8 inline-block text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] hover:underline"
      >
        ← {back}
      </Link>

      <header className="mb-10">
        {fm.category && (
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[color:var(--brand)]">
            {fm.category}
          </p>
        )}
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {fm.title}
        </h1>
        {fm.date && (
          <p className="mt-3 text-sm text-[color:var(--muted)]">
            {new Date(fm.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        {fm.excerpt && (
          <p className="mt-4 text-lg font-medium text-[color:var(--muted)]">{fm.excerpt}</p>
        )}
      </header>

      {fm.video && (
        <div className="mb-10 overflow-hidden rounded-3xl bg-black">
          <video controls playsInline preload="metadata" className="w-full" src={fm.video} />
        </div>
      )}

      {fm.cover && !fm.video && (
        <div className="relative mb-10 aspect-[4/3] overflow-hidden rounded-3xl bg-[color:var(--surface)]">
          <Image
            src={fm.cover}
            alt={fm.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <div className="prose-guide space-y-5 text-base leading-relaxed text-[color:var(--muted)]">
        <MDXRemote source={post.content} />
      </div>

      {fm.images && fm.images.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fm.images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden rounded-2xl bg-[color:var(--surface)]"
            >
              <Image
                src={src}
                alt={`${fm.title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
