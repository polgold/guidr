import Link from "next/link";
import { t, type Locale, locales } from "@/lib/i18n";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const sections = [
    { href: `/${locale}#gastronomia`, key: "nav.gastronomia" },
    { href: `/${locale}#tango`, key: "nav.tango" },
    { href: `/${locale}#buenos-aires`, key: "section.buenosAires.title" },
    { href: `/${locale}#transporte`, key: "nav.transporte" },
    { href: `/${locale}#emergencias`, key: "nav.emergencias" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href={`/${locale}`}
          className="font-[family-name:var(--font-fraunces)] text-2xl font-medium italic tracking-tight text-[color:var(--ink)]"
        >
          Guidr<span className="text-[color:var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--brand)]"
            >
              {t(locale, s.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em]">
            {locales.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="mx-1 text-[color:var(--ink-mute)]">·</span>}
                <Link
                  href={`/${l}`}
                  className={
                    l === locale
                      ? "text-[color:var(--brand)]"
                      : "text-[color:var(--ink-mute)] hover:text-[color:var(--ink)]"
                  }
                >
                  {l}
                </Link>
              </span>
            ))}
          </div>
          <MobileMenu locale={locale} sections={sections} />
        </div>
      </div>
    </header>
  );
}
