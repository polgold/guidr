/**
 * Property registry — PRIVATE DATA.
 *
 * This data is shared with guests only after booking confirmation and payment.
 * Property pages (`/[locale]/propiedades/[id]`) are unlisted: never linked from
 * the public homepage, excluded from sitemap, and marked `noindex`.
 */

import type { Locale } from "./i18n";

export type Contact = {
  name: string;
  role: string;
  phone: string; // E.164 without +, for wa.me links
  whatsapp: boolean;
};

export type Property = {
  id: string; // e.g. "105", "115"
  nickname: string;
  address: {
    street: string;
    floor: string;
    unit: string;
    neighborhood: string;
    city: string;
    mapsUrl: string;
  };
  checkIn: string; // "15:00"
  checkOut: string; // "12:00"
  wifi: { ssid: string; password: string; band: string };
  voltage: string;
  doorCode: {
    instructions: Record<Locale, string>;
  };
  parking?: {
    elevatorCode: string;
    notes: Record<Locale, string>;
  };
  amenities?: {
    hours: string;
    notes: Record<Locale, string>;
  };
  contacts: Contact[];
};

export const properties: Record<string, Property> = {
  "115": {
    id: "115",
    nickname: "Best Riverfront 1-15",
    address: {
      street: "Av. Alicia Moreau de Justo 1848",
      floor: "1",
      unit: "15",
      neighborhood: "Dock 14, Puerto Madero",
      city: "CABA, Buenos Aires (1107)",
      mapsUrl: "https://maps.google.com/?q=Av.+Alicia+Moreau+de+Justo+1848,+Buenos+Aires",
    },
    checkIn: "15:00",
    checkOut: "12:00",
    wifi: { ssid: "Fibertel Wifi 526", password: "0013890843", band: "2.4 GHz" },
    voltage: "220V / 50Hz — adaptadores Tipo C o Tipo I",
    doorCode: {
      instructions: {
        es:
          "1) Apoye el dedo en la parte superior unos segundos. 2) Cuando encienda el teclado, introduzca su Código Personal (triple 0, luego los 4 últimos dígitos de su celular), seguido de #. Ejemplo: 0001234#. 3) Abra la puerta.",
        en:
          "1) Place your finger on the top for a few seconds. 2) When the keypad lights up, enter your Personal Code (triple 0, then the last 4 digits of your mobile), followed by #. Example: 0001234#. 3) Open the door.",
        pt:
          "1) Pressione o dedo na parte superior por alguns segundos. 2) Quando o teclado acender, digite seu Código Pessoal (triplo 0, depois os 4 últimos dígitos do seu celular), seguido de #. Exemplo: 0001234#. 3) Abra a porta.",
      },
    },
    parking: {
      elevatorCode: "1251#",
      notes: {
        es: "Una vez registrado su vehículo, se ingresa llamando a la guardia o con control remoto (depósito USD 20).",
        en: "After registering your vehicle, entry is via the guard or with a remote control (USD 20 deposit).",
        pt: "Após registrar seu veículo, a entrada é pela guarita ou com controle remoto (depósito USD 20).",
      },
    },
    amenities: {
      hours: "11:00 – 19:00",
      notes: {
        es: "Para pileta, gimnasio y sauna, contactar con la guardia. Se permiten menores solo con adulto.",
        en: "For pool, gym and sauna, contact the front desk. Minors allowed only with an adult.",
        pt: "Para piscina, academia e sauna, contatar a guarita. Menores permitidos apenas com adulto.",
      },
    },
    contacts: [
      { name: "Karen", role: "Host", phone: "541130961959", whatsapp: true },
      { name: "Pablo", role: "Host", phone: "541130961959", whatsapp: true },
      { name: "Daniel", role: "Guardia edificio", phone: "541100000000", whatsapp: true },
    ],
  },
  "105": {
    id: "105",
    nickname: "Best Riverfront 1-05 (Pet Friendly)",
    address: {
      street: "Av. Alicia Moreau de Justo 1848",
      floor: "1",
      unit: "05",
      neighborhood: "Dock 14, Puerto Madero",
      city: "CABA, Buenos Aires (1107)",
      mapsUrl: "https://maps.google.com/?q=Av.+Alicia+Moreau+de+Justo+1848,+Buenos+Aires",
    },
    checkIn: "15:00",
    checkOut: "12:00",
    wifi: { ssid: "Dpto 105", password: "0018040402", band: "2.4 GHz" },
    voltage: "220V / 50Hz — adaptadores Tipo C o Tipo I",
    doorCode: {
      instructions: {
        es:
          "1) Apoye el dedo en la parte superior unos segundos. 2) Cuando encienda el teclado, introduzca su Código Personal (triple 0, luego los 4 últimos dígitos de su celular), seguido de #. Ejemplo: 0001234#. 3) Abra la puerta.",
        en:
          "1) Place your finger on the top for a few seconds. 2) When the keypad lights up, enter your Personal Code (triple 0, then the last 4 digits of your mobile), followed by #. Example: 0001234#. 3) Open the door.",
        pt:
          "1) Pressione o dedo na parte superior por alguns segundos. 2) Quando o teclado acender, digite seu Código Pessoal (triplo 0, depois os 4 últimos dígitos do seu celular), seguido de #. Exemplo: 0001234#. 3) Abra a porta.",
      },
    },
    parking: {
      elevatorCode: "1251#",
      notes: {
        es: "Una vez registrado su vehículo, se ingresa llamando a la guardia o con control remoto (depósito USD 20). Hay además 28 cocheras de cortesía en el exterior del edificio, sujetas a disponibilidad.",
        en: "After registering your vehicle, entry is via the guard or with a remote control (USD 20 deposit). There are also 28 courtesy spots outside the building, subject to availability.",
        pt: "Após registrar seu veículo, a entrada é pela guarita ou com controle remoto (depósito USD 20). Há ainda 28 vagas de cortesia no exterior do edifício, sujeitas a disponibilidade.",
      },
    },
    amenities: {
      hours: "11:00 – 19:00",
      notes: {
        es: "Para pileta, gimnasio y sauna, contactar con la guardia. Se permiten menores solo con adulto. Pet friendly: contamos con cama, recipientes para comida y agua.",
        en: "For pool, gym and sauna, contact the front desk. Minors allowed only with an adult. Pet friendly: bed and food/water bowls provided.",
        pt: "Para piscina, academia e sauna, contatar a guarita. Menores permitidos apenas com adulto. Pet friendly: cama e potes de comida/água disponíveis.",
      },
    },
    contacts: [
      { name: "Karen", role: "Host", phone: "541130961959", whatsapp: true },
      { name: "Pablo", role: "Host", phone: "541130961959", whatsapp: true },
      { name: "Daniel", role: "Guardia edificio", phone: "541100000000", whatsapp: true },
    ],
  },
};

export function getProperty(id: string): Property | null {
  return properties[id] ?? null;
}

export function listPropertyIds(): string[] {
  return Object.keys(properties);
}
