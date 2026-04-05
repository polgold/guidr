import Link from "next/link";
import { t, type Locale, locales } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const sections = [
    { href: `/${locale}#gastronomia`, key: "nav.gastronomia" },
    { href: `/${locale}#tango`, key: "nav.tango" },
    { href: `/${locale}#futbol`, key: "nav.futbol" },
    { href: `/${locale}#transporte`, key: "nav.transporte" },
    { href: `/${locale}#emergencias`, key: "nav.emergencias" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-display text-2xl font-bold uppercase tracking-tight text-[color:var(--brand)]">
          Guidr
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--brand)]"
            >
              {t(locale, s.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className={`text-xs font-bold uppercase tracking-widest ${
                l === locale
                  ? "text-[color:var(--brand)]"
                  : "text-[color:var(--muted)] hover:text-[color:var(--brand)]"
              }`}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
