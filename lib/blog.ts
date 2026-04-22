import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  date?: string;
  category?: string;
  excerpt?: string;
  cover?: string;
  images?: string[];
  video?: string;
};

export type BlogPost = {
  slug: string;
  locale: Locale | null;
  frontmatter: BlogFrontmatter;
  content: string;
};

export function listBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  const slugs = new Set<string>();
  for (const entry of entries) {
    if (entry.isDirectory()) {
      slugs.add(entry.name);
    } else if (entry.isFile() && /\.mdx?$/i.test(entry.name)) {
      slugs.add(entry.name.replace(/\.mdx?$/i, ""));
    }
  }
  return [...slugs];
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | null {
  const candidates = [
    path.join(BLOG_DIR, slug, `${locale}.mdx`),
    path.join(BLOG_DIR, slug, "es.mdx"),
    path.join(BLOG_DIR, `${slug}.mdx`),
    path.join(BLOG_DIR, `${slug}.md`),
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    locale: /\/(es|en|pt)\.mdx?$/i.test(file) ? (locale as Locale) : null,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

export function listBlogPosts(locale: Locale): BlogPost[] {
  return listBlogSlugs()
    .map((slug) => getBlogPost(slug, locale))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => {
      const da = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
      const db = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
      return db - da;
    });
}
