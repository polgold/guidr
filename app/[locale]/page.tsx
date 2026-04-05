import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { sections } from "@/lib/sections";
import { listGuides } from "@/lib/guides";
import { SectionBlock } from "@/components/home/SectionBlock";

// Section order on the page (also the order in the jump-nav grid)
const sectionOrder = [
  "emergencias",
  "gastronomia",
  "bares",
  "tango", // special: rendered as guide cards, not SectionBlock
  "futbol",
  "transporte",
  "farmacias",
  "supermercados",
  "buenos-aires",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const tangoGuides = listGuides(l, "tango");

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero/apartment-view.jpg"
          alt="Puerto Madero view"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 sm:py-40">
          <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-lg">
            {t(l, "hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium text-white/90 sm:text-lg drop-shadow">
            {t(l, "hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Quick-jump grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
          {sectionOrder.map((id) => {
            const titleKey =
              id === "buenos-aires"
                ? "section.buenosAires.title"
                : id === "tango"
                  ? "section.tango.title"
                  : `section.${id}.title`;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="group flex aspect-square items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white p-2 text-center transition-all hover:border-[color:var(--brand)] hover:bg-[color:var(--surface)]"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)] group-hover:text-[color:var(--brand)]">
                  {t(l, titleKey)}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Render all sections in order */}
      {sectionOrder.map((id, i) => {
        if (id === "tango") {
          // Tango is rendered as full guide cards
          return (
            <section
              key="tango"
              id="tango"
              className={`scroll-mt-20 border-t border-[color:var(--border)] py-20 ${
                i % 2 === 1 ? "bg-[color:var(--surface)]" : "bg-white"
              }`}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                  <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
                    {t(l, "section.tango.title")}
                  </h2>
                </header>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tangoGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/${l}/guias/${g.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] bg-[color:var(--surface)]">
                        {g.frontmatter.cover && (
                          <Image
                            src={g.frontmatter.cover}
                            alt={g.frontmatter.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-black uppercase tracking-tight">
                          {g.frontmatter.title}
                        </h3>
                        {g.frontmatter.excerpt && (
                          <p className="mt-2 text-sm text-[color:var(--muted)] line-clamp-2">
                            {g.frontmatter.excerpt}
                          </p>
                        )}
                        <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] group-hover:underline">
                          {t(l, "readMore")} →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        const section = sections.find((s) => s.id === id);
        if (!section) return null;
        return (
          <SectionBlock
            key={section.id}
            section={section}
            locale={l}
            alt={i % 2 === 1}
          />
        );
      })}
    </div>
  );
}
