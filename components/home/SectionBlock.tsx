import Link from "next/link";
import Image from "next/image";
import { type Section, mapsUrl } from "@/lib/sections";
import { t, type Locale } from "@/lib/i18n";

interface SectionBlockProps {
  section: Section;
  locale: Locale;
  alt?: boolean; // alternating background
}

export function SectionBlock({ section, locale, alt }: SectionBlockProps) {
  return (
    <section
      id={section.id}
      className={`scroll-mt-20 border-t border-[color:var(--border)] py-20 ${
        alt ? "bg-[color:var(--surface)]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            {t(locale, section.titleKey)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-[color:var(--muted)] sm:text-base">
            {section.subtitle[locale]}
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item) => {
            const Wrapper = item.href ? Link : "div";
            const wrapperProps = item.href ? { href: item.href } : {};
            return (
              <Wrapper
                key={item.title}
                {...(wrapperProps as { href: string })}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white transition-all hover:-translate-y-1 hover:border-[color:var(--brand)] hover:shadow-lg ${
                  item.href ? "cursor-pointer" : ""
                }`}
              >
                {item.image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--surface)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-black uppercase tracking-tight text-[color:var(--foreground)]">
                    {item.title}
                  </h3>

                  {(item.address || item.hours) && (
                    <div className="mt-2 space-y-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--brand)]">
                      {item.address && <p>{item.address}</p>}
                      {item.hours && <p>{item.hours}</p>}
                    </div>
                  )}

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
                    {item.description[locale]}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.phone && (
                      <a
                        href={`tel:${item.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand)] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[color:var(--brand-dark)]"
                      >
                        {t(locale, "call")} {item.phone}
                      </a>
                    )}
                    {item.mapsQuery && (
                      <a
                        href={mapsUrl(item.mapsQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)] hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                      >
                        {t(locale, "viewMap")}
                      </a>
                    )}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
