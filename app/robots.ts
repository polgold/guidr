import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/propiedades/",
          "/*/check-in/",
          "/api/",
        ],
      },
      // AI crawlers — allow public content
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/*/propiedades/", "/*/check-in/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/*/propiedades/", "/*/check-in/", "/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/*/propiedades/", "/*/check-in/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/*/propiedades/", "/*/check-in/", "/api/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/*/propiedades/", "/*/check-in/", "/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/*/propiedades/", "/*/check-in/", "/api/"],
      },
    ],
    sitemap: "https://guidr.info/sitemap.xml",
  };
}
