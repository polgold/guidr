"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";

interface MobileMenuProps {
  locale: Locale;
  sections: { href: string; key: string }[];
}

export function MobileMenu({ locale, sections }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
        aria-label="Menu"
      >
        <span
          className={`block h-[1.5px] w-5 bg-[color:var(--ink)] transition-all duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-5 bg-[color:var(--ink)] transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-5 bg-[color:var(--ink)] transition-all duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full border-b border-[color:var(--line)] bg-white/95 backdrop-blur-md">
          <div className="flex flex-col px-6 py-4">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="border-b border-[color:var(--line)] py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--ink-soft)] transition-colors last:border-0 hover:text-[color:var(--brand)]"
              >
                {t(locale, s.key)}
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
