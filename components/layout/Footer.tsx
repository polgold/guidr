import { t, type Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="mt-24 border-t border-[color:var(--line)] bg-[color:var(--bg-alt)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-[family-name:var(--font-fraunces)] text-3xl italic text-[color:var(--ink)]">
            Guidr<span className="text-[color:var(--accent)]">.</span>
          </p>
          <div className="flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--ink-mute)]">
            <span className="hairline" />
            Buenos Aires
            <span className="hairline" />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
            {t(locale, "footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
