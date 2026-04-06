import Link from "next/link";
import Image from "next/image";
import { type Section, type SectionItem, mapsUrl } from "@/lib/sections";
import { t, type Locale } from "@/lib/i18n";

interface SectionBlockProps {
  section: Section;
  locale: Locale;
  alt?: boolean;
}

export function SectionBlock({ section, locale, alt }: SectionBlockProps) {
  const isEmergency = section.id === "emergencias";

  const kicker =
    section.id === "buenos-aires"
      ? locale === "es"
        ? "Explorá la ciudad"
        : locale === "pt"
          ? "Explore a cidade"
          : "Explore the city"
      : isEmergency
        ? locale === "es"
          ? "Teléfonos útiles"
          : locale === "pt"
            ? "Telefones úteis"
            : "Emergency numbers"
        : locale === "es"
          ? "Seleccionado por nosotros"
          : locale === "pt"
            ? "Selecionado por nós"
            : "Hand-picked";

  return (
    <section
      id={section.id}
      className={`scroll-mt-24 py-24 sm:py-28 ${
        alt ? "bg-[color:var(--bg-alt)]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-mute)]">
            <span className="hairline" />
            {kicker}
            <span className="hairline" />
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-medium text-[color:var(--ink)] sm:text-5xl md:text-6xl">
            {t(locale, section.titleKey)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-[color:var(--ink-soft)]">
            {section.subtitle[locale]}
          </p>
        </header>

        {isEmergency ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <EmergencyCard key={item.title} item={item} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <ItemCard key={item.title} item={item} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmergencyCard({
  item,
  locale,
}: {
  item: SectionItem;
  locale: Locale;
}) {
  return (
    <a
      href={`tel:${item.phone?.replace(/\s/g, "")}`}
      className="group relative flex items-center gap-6 overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:shadow-lg"
    >
      {item.image && (
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[color:var(--bg-alt)]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {item.title}
        </p>
        <p className="mt-1 font-[family-name:var(--font-fraunces)] text-5xl font-medium leading-none text-[color:var(--ink)] group-hover:text-[color:var(--brand)]">
          {item.phone}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[color:var(--ink-soft)]">
          {item.description[locale]}
        </p>
      </div>
      <span
        className="absolute bottom-6 right-6 text-[color:var(--ink-mute)] group-hover:text-[color:var(--brand)]"
        aria-hidden
      >
        →
      </span>
    </a>
  );
}

function ItemCard({ item, locale }: { item: SectionItem; locale: Locale }) {
  const hasImage = !!item.image;
  const isLogo = item.imageKind === "logo";

  const ImageArea = (
    <>
      {hasImage && (
        <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--bg-alt)]">
          <Image
            src={item.image!}
            alt={item.title}
            fill
            className={
              isLogo
                ? "object-contain p-10"
                : "object-cover transition-transform duration-700 group-hover:scale-105"
            }
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      {!hasImage && (
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[color:var(--bg-alt)] to-[#EDE8DF]">
          <span className="font-[family-name:var(--font-fraunces)] text-7xl font-light italic text-[color:var(--accent)] opacity-40">
            {item.title.charAt(0)}
          </span>
        </div>
      )}
    </>
  );

  // If item has an internal href (like a tango guide), the whole card is a Link.
  if (item.href) {
    return (
      <Link
        href={item.href}
        className="group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1"
      >
        {ImageArea}
        <div className="flex flex-1 flex-col pt-6">
          {(item.address || item.hours || item.proximity) && (
            <div className="mb-2 flex flex-wrap gap-x-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              {item.proximity && <span>{item.proximity[locale]}</span>}
              {item.address && <span>{item.proximity ? "·" : ""} {item.address}</span>}
              {item.hours && <span>· {item.hours}</span>}
            </div>
          )}
          <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium leading-tight text-[color:var(--ink)] group-hover:text-[color:var(--brand)]">
            {item.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-soft)]">
            {item.description[locale]}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] group-hover:text-[color:var(--brand)]">
            {t(locale, "readMore")} <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    );
  }

  // Otherwise: inline phone / maps links inside a div (no nested anchors).
  return (
    <div className="group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1">
      {ImageArea}
      <div className="flex flex-1 flex-col pt-6">
        {(item.address || item.hours) && (
          <div className="mb-2 flex flex-wrap gap-x-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {item.address && <span>{item.address}</span>}
            {item.hours && <span>· {item.hours}</span>}
          </div>
        )}
        <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium leading-tight text-[color:var(--ink)]">
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--ink-soft)]">
          {item.description[locale]}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {item.phone && (
            <a
              href={`tel:${item.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--ink)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[color:var(--brand)]"
            >
              {t(locale, "call")} · {item.phone}
            </a>
          )}
          {(item.mapsUrl || item.mapsQuery) && (
            <a
              href={item.mapsUrl ?? mapsUrl(item.mapsQuery!)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition-colors hover:text-[color:var(--brand)]"
            >
              {t(locale, "viewMap")} <span aria-hidden>→</span>
            </a>
          )}
          {item.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)] transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
            >
              {link.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
