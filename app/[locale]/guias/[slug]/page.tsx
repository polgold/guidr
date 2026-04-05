import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getGuide, listGuideSlugs } from "@/lib/guides";

export function generateStaticParams() {
  const slugs = listGuideSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuide(slug, locale);
  if (!guide) return {};
  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.excerpt,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getGuide(slug, locale as Locale);
  if (!guide) notFound();

  const fm = guide.frontmatter;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}`}
        className="mb-8 inline-block text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] hover:underline"
      >
        ← {locale === "es" ? "Volver" : locale === "pt" ? "Voltar" : "Back"}
      </Link>

      {fm.cover && (
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

      <header className="mb-10">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[color:var(--brand)]">
          {fm.category}
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {fm.title}
        </h1>
        {fm.excerpt && (
          <p className="mt-4 text-lg font-medium text-[color:var(--muted)]">
            {fm.excerpt}
          </p>
        )}
      </header>

      {(fm.address || fm.phone || fm.whatsapp || fm.location) && (
        <div className="mb-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {fm.address && (
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)]">
                  {locale === "es" ? "Dirección" : locale === "pt" ? "Endereço" : "Address"}
                </dt>
                <dd className="font-bold">{fm.address}</dd>
              </div>
            )}
            {fm.location && (
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)]">
                  {locale === "es" ? "Zona" : locale === "pt" ? "Zona" : "Area"}
                </dt>
                <dd className="font-bold">{fm.location}</dd>
              </div>
            )}
            {fm.phone && (
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)]">
                  {locale === "es" ? "Teléfono" : locale === "pt" ? "Telefone" : "Phone"}
                </dt>
                <dd className="font-bold">
                  <a href={`tel:${fm.phone}`} className="hover:text-[color:var(--brand)]">
                    {fm.phone}
                  </a>
                </dd>
              </div>
            )}
            {fm.whatsapp && (
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)]">
                  WhatsApp
                </dt>
                <dd className="font-bold">
                  <a
                    href={`https://wa.me/${fm.whatsapp.replace(/\D/g, "")}`}
                    className="hover:text-[color:var(--brand)]"
                  >
                    {fm.whatsapp}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <div className="prose-guide space-y-5 text-base leading-relaxed text-[color:var(--muted)]">
        <MDXRemote source={guide.content} />
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
