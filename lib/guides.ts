import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export type GuideFrontmatter = {
  title: string;
  category: string;
  cover?: string;
  images?: string[];
  excerpt?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
};

export type Guide = {
  slug: string;
  locale: Locale;
  frontmatter: GuideFrontmatter;
  content: string;
};

export function listGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getGuide(slug: string, locale: Locale): Guide | null {
  const localeFile = path.join(GUIDES_DIR, slug, `${locale}.mdx`);
  const fallback = path.join(GUIDES_DIR, slug, "es.mdx");
  const file = fs.existsSync(localeFile) ? localeFile : fs.existsSync(fallback) ? fallback : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    frontmatter: data as GuideFrontmatter,
    content,
  };
}

export function listGuides(locale: Locale, category?: string): Guide[] {
  return listGuideSlugs()
    .map((slug) => getGuide(slug, locale))
    .filter((g): g is Guide => g !== null)
    .filter((g) => !category || g.frontmatter.category === category);
}
