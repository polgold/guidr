import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { sections } from "@/lib/sections";
import { listGuides } from "@/lib/guides";

const BASE = "https://guidr.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage per locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  // Guide pages per locale
  for (const locale of locales) {
    const guides = listGuides(locale, "tango");
    for (const guide of guides) {
      entries.push({
        url: `${BASE}/${locale}/guias/${guide.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Property pages are intentionally excluded (private)

  return entries;
}
