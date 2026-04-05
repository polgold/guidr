export const locales = ["es", "en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Dict = Record<string, string>;

export const dictionaries: Record<Locale, Dict> = {
  es: {
    "nav.home": "Inicio",
    "nav.tango": "Tango",
    "nav.gastronomia": "Gastronomía",
    "nav.futbol": "Fútbol",
    "nav.emergencias": "Emergencias",
    "nav.transporte": "Transporte",
    "hero.title": "Tu estadía, simple.",
    "hero.subtitle":
      "Guías locales seleccionadas para disfrutar Buenos Aires como un residente.",
    "section.tango.title": "Tango",
    "section.gastronomia.title": "Gastronomía",
    "section.bares.title": "Bares",
    "section.farmacias.title": "Farmacias",
    "section.supermercados.title": "Supermercados",
    "section.futbol.title": "Fútbol",
    "section.emergencias.title": "Emergencias",
    "section.transporte.title": "Transporte",
    "section.buenosAires.title": "Buenos Aires",
    "footer.copyright": "© 2026 Guidr — Tu estadía, simple.",
    "readMore": "Leer más",
    "viewMap": "Ver en mapa",
    "call": "Llamar",
  },
  en: {
    "nav.home": "Home",
    "nav.tango": "Tango",
    "nav.gastronomia": "Food",
    "nav.futbol": "Football",
    "nav.emergencias": "Emergencies",
    "nav.transporte": "Transport",
    "hero.title": "Your stay, simple.",
    "hero.subtitle":
      "Curated local guides to experience Buenos Aires like a resident.",
    "section.tango.title": "Tango",
    "section.gastronomia.title": "Food",
    "section.bares.title": "Bars",
    "section.farmacias.title": "Pharmacies",
    "section.supermercados.title": "Supermarkets",
    "section.futbol.title": "Football",
    "section.emergencias.title": "Emergencies",
    "section.transporte.title": "Transport",
    "section.buenosAires.title": "Buenos Aires",
    "footer.copyright": "© 2026 Guidr — Your stay, simple.",
    "readMore": "Read more",
    "viewMap": "View on map",
    "call": "Call",
  },
  pt: {
    "nav.home": "Início",
    "nav.tango": "Tango",
    "nav.gastronomia": "Gastronomia",
    "nav.futbol": "Futebol",
    "nav.emergencias": "Emergências",
    "nav.transporte": "Transporte",
    "hero.title": "Sua estadia, simples.",
    "hero.subtitle":
      "Guias locais selecionados para aproveitar Buenos Aires como um morador.",
    "section.tango.title": "Tango",
    "section.gastronomia.title": "Gastronomia",
    "section.bares.title": "Bares",
    "section.farmacias.title": "Farmácias",
    "section.supermercados.title": "Supermercados",
    "section.futbol.title": "Futebol",
    "section.emergencias.title": "Emergências",
    "section.transporte.title": "Transporte",
    "section.buenosAires.title": "Buenos Aires",
    "footer.copyright": "© 2026 Guidr — Sua estadia, simples.",
    "readMore": "Ler mais",
    "viewMap": "Ver no mapa",
    "call": "Ligar",
  },
};

export function t(locale: Locale, key: string): string {
  return dictionaries[locale][key] ?? key;
}
