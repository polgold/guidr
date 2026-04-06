import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Guidr — Your stay, simple.",
    template: "%s · Guidr",
  },
  description:
    "Curated local guides to experience Buenos Aires like a resident — restaurants, tango, bars, football and transport in Puerto Madero, San Telmo and La Boca.",
  keywords: [
    "Buenos Aires guide", "Puerto Madero restaurants", "tango Buenos Aires",
    "where to eat Puerto Madero", "San Telmo bars", "La Boca Caminito",
    "Argentine steakhouse", "parrilla Buenos Aires", "milonga Buenos Aires",
    "Buenos Aires tourism", "guía Buenos Aires", "guia Buenos Aires turismo",
  ],
  openGraph: {
    title: "Guidr — Buenos Aires City Guide",
    description: "Curated local guides to experience Buenos Aires like a resident. Restaurants, tango, bars, football and more.",
    url: "https://guidr.info",
    siteName: "Guidr",
    locale: "es_AR",
    alternateLocale: ["en_US", "pt_BR"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guidr — Buenos Aires City Guide",
    description: "Curated local guides to experience Buenos Aires like a resident.",
  },
  alternates: {
    canonical: "https://guidr.info",
    languages: {
      "es": "https://guidr.info/es",
      "en": "https://guidr.info/en",
      "pt": "https://guidr.info/pt",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[color:var(--ink-soft)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: "Guidr — Buenos Aires City Guide",
              description: "Curated local guides to experience Buenos Aires like a resident. Restaurants, tango, bars, football, transport and city highlights in Puerto Madero, San Telmo and La Boca.",
              url: "https://guidr.info",
              touristType: ["Cultural tourism", "Food tourism", "Nightlife", "Sports tourism"],
              geo: {
                "@type": "GeoCoordinates",
                latitude: -34.6118,
                longitude: -58.3634,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Buenos Aires",
                addressRegion: "CABA",
                addressCountry: "AR",
              },
              inLanguage: ["es", "en", "pt"],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
