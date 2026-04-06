import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { sections } from "@/lib/sections";
import { listGuides } from "@/lib/guides";
import { SectionBlock } from "@/components/home/SectionBlock";

// Order of sections on the page.
const sectionOrder = [
  "gastronomia",
  "tango", // rendered specially as guide cards with covers
  "bares",
  "buenos-aires",
  "futbol",
  "transporte",
  "farmacias",
  "supermercados",
  "emergencias",
];

const categoryLabels: Record<string, Record<Locale, string>> = {
  food: {
    es: "Dónde comer",
    en: "Where to eat",
    pt: "Onde comer",
  },
  city: {
    es: "Explorar la ciudad",
    en: "Explore the city",
    pt: "Explorar a cidade",
  },
};

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
      <section className="relative isolate overflow-hidden bg-[color:var(--bg-dark)]">
        <Image
          src="/images/hero/hero-apartment.jpg"
          alt="Buenos Aires — Avenida 9 de Julio"
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />
        {/* Dark overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-start justify-end px-6 pb-28 pt-40 sm:pb-32 lg:px-10">
          <div className="mb-6 flex items-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
            <span
              className="inline-block h-[1px] w-10 align-middle"
              style={{ background: "#C89B5C", marginRight: "12px" }}
            />
            Buenos Aires, Argentina
          </div>

          <h1
            className="font-[family-name:var(--font-fraunces)] text-6xl font-light leading-[0.95] text-white sm:text-7xl md:text-8xl lg:text-[9rem]"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
          >
            {locale === "es" && (
              <>
                Tu estadía,
                <br />
                <em className="font-medium italic" style={{ color: "#E5B97C" }}>
                  simple.
                </em>
              </>
            )}
            {locale === "en" && (
              <>
                Your stay,
                <br />
                <em className="font-medium italic" style={{ color: "#E5B97C" }}>
                  simple.
                </em>
              </>
            )}
            {locale === "pt" && (
              <>
                Sua estadia,
                <br />
                <em className="font-medium italic" style={{ color: "#E5B97C" }}>
                  simples.
                </em>
              </>
            )}
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg font-normal leading-relaxed text-white sm:text-xl"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            {t(l, "hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#gastronomia"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink)] transition-colors hover:bg-[#E5B97C] hover:text-white"
            >
              {locale === "es"
                ? "Descubrir la guía"
                : locale === "pt"
                  ? "Descobrir o guia"
                  : "Discover the guide"}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#buenos-aires"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/5 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition-all hover:border-white hover:bg-white/15"
            >
              {locale === "es"
                ? "Explorar la ciudad"
                : locale === "pt"
                  ? "Explorar a cidade"
                  : "Explore the city"}
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
          ↓ {locale === "es" ? "Desplazar" : locale === "pt" ? "Rolar" : "Scroll"}
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-y border-[color:var(--line)] bg-white py-14">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <div className="mb-4 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-mute)]">
            <span className="hairline" />
            {locale === "es" ? "La guía" : locale === "pt" ? "O guia" : "The guide"}
            <span className="hairline" />
          </div>
          <p className="font-[family-name:var(--font-fraunces)] text-2xl font-light italic leading-relaxed text-[color:var(--ink)] sm:text-3xl">
            {locale === "es" &&
              "Un compendio editorial de los lugares que recomendaríamos a un amigo que visita Buenos Aires por primera vez: tango real, bodegones clásicos, bares escondidos y los imperdibles de la ciudad."}
            {locale === "en" &&
              "An editorial compendium of the places we'd recommend to a friend visiting Buenos Aires for the first time: real tango, classic bodegones, hidden bars and the city's unmissable icons."}
            {locale === "pt" &&
              "Um compêndio editorial dos lugares que recomendaríamos a um amigo que visita Buenos Aires pela primeira vez: tango real, bodegones clássicos, bares escondidos e os imperdíveis da cidade."}
          </p>
        </div>
      </section>

      {/* Render sections in order */}
      {sectionOrder.map((id, i) => {
        if (id === "tango") {
          return (
            <TangoSection
              key="tango"
              locale={l}
              guides={tangoGuides}
              alt={i % 2 === 1}
            />
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

function TangoSection({
  locale,
  guides,
  alt,
}: {
  locale: Locale;
  guides: ReturnType<typeof listGuides>;
  alt: boolean;
}) {
  return (
    <section
      id="tango"
      className={`scroll-mt-24 py-24 sm:py-28 ${
        alt ? "bg-[color:var(--bg-alt)]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-mute)]">
            <span className="hairline" />
            {locale === "es"
              ? "El alma de Buenos Aires"
              : locale === "pt"
                ? "A alma de Buenos Aires"
                : "The soul of Buenos Aires"}
            <span className="hairline" />
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-medium text-[color:var(--ink)] sm:text-5xl md:text-6xl">
            {t(locale, "section.tango.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-[color:var(--ink-soft)]">
            {locale === "es"
              ? "Tres lugares donde el tango sigue vivo — no el que se baila para turistas, sino el que se siente."
              : locale === "pt"
                ? "Três lugares onde o tango continua vivo — não o que se dança para turistas, mas o que se sente."
                : "Three places where tango is still alive — not the one danced for tourists, but the one you feel."}
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/${locale}/guias/${g.slug}`}
              className="group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--bg-alt)]">
                {g.frontmatter.cover && (
                  <Image
                    src={g.frontmatter.cover}
                    alt={g.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="pt-6">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Tango · Buenos Aires
                </div>
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium leading-tight text-[color:var(--ink)] group-hover:text-[color:var(--brand)]">
                  {g.frontmatter.title}
                </h3>
                {g.frontmatter.excerpt && (
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                    {g.frontmatter.excerpt}
                  </p>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] group-hover:text-[color:var(--brand)]">
                  {t(locale, "readMore")} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
