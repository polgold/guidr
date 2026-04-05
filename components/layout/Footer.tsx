import { t, type Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)] py-10">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[color:var(--muted)]">
          {t(locale, "footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
