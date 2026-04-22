import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { listBlogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title =
    locale === "es" ? "Blog — guidr" : locale === "pt" ? "Blog — guidr" : "Blog — guidr";
  return { title };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const posts = listBlogPosts(locale as Locale);

  const title = locale === "es" ? "Blog" : locale === "pt" ? "Blog" : "Blog";
  const empty =
    locale === "es"
      ? "Todavía no hay posts. Volvé pronto."
      : locale === "pt"
        ? "Ainda não há posts. Volte em breve."
        : "No posts yet. Check back soon.";

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-4xl font-black uppercase tracking-tight sm:text-5xl">{title}</h1>
      {posts.length === 0 ? (
        <p className="text-[color:var(--muted)]">{empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:border-[color:var(--brand)]"
            >
              {post.frontmatter.cover && !post.frontmatter.video && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.frontmatter.cover}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              {post.frontmatter.video && (
                <div className="relative aspect-video overflow-hidden bg-black">
                  <video
                    preload="metadata"
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                    src={`${post.frontmatter.video}#t=0.5`}
                  />
                </div>
              )}
              <div className="p-6">
                {post.frontmatter.category && (
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[color:var(--brand)]">
                    {post.frontmatter.category}
                  </p>
                )}
                <h2 className="text-xl font-black uppercase tracking-tight">
                  {post.frontmatter.title}
                </h2>
                {post.frontmatter.excerpt && (
                  <p className="mt-2 text-sm text-[color:var(--muted)]">
                    {post.frontmatter.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
