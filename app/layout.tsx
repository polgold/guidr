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
    "Curated local guides to experience Buenos Aires like a resident — for guests staying at our Puerto Madero apartments.",
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
        {children}
      </body>
    </html>
  );
}
