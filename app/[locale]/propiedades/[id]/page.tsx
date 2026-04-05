import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getProperty, listPropertyIds } from "@/lib/properties";

// Property pages are private — unlisted, noindex, never in sitemap.
export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export function generateStaticParams() {
  const ids = listPropertyIds();
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

const labels: Record<Locale, Record<string, string>> = {
  es: {
    welcome: "Bienvenido",
    checkIn: "Check in",
    checkOut: "Check out",
    wifi: "Wifi",
    password: "Contraseña",
    voltage: "Tensión",
    address: "Dirección",
    contacts: "Contactos",
    doorCode: "Apertura de puerta",
    parking: "Cocheras",
    elevatorCode: "Código del ascensor",
    amenities: "Amenities",
    hours: "Horario",
  },
  en: {
    welcome: "Welcome",
    checkIn: "Check in",
    checkOut: "Check out",
    wifi: "Wi-Fi",
    password: "Password",
    voltage: "Voltage",
    address: "Address",
    contacts: "Contacts",
    doorCode: "Door opening",
    parking: "Parking",
    elevatorCode: "Elevator code",
    amenities: "Amenities",
    hours: "Hours",
  },
  pt: {
    welcome: "Bem-vindo",
    checkIn: "Check in",
    checkOut: "Check out",
    wifi: "Wi-Fi",
    password: "Senha",
    voltage: "Tensão",
    address: "Endereço",
    contacts: "Contatos",
    doorCode: "Abertura da porta",
    parking: "Vagas",
    elevatorCode: "Código do elevador",
    amenities: "Amenities",
    hours: "Horário",
  },
};

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const property = getProperty(id);
  if (!property) notFound();
  const l = locale as Locale;
  const lbl = labels[l];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tight">{lbl.welcome}</h1>
        <p className="mt-3 text-sm font-bold uppercase tracking-widest text-[color:var(--brand)]">
          {property.nickname}
        </p>
      </header>

      {/* Check in / out */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)]">
            {lbl.checkIn}
          </p>
          <p className="mt-2 text-3xl font-black">{property.checkIn}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[color:var(--muted)]">
            {lbl.checkOut}
          </p>
          <p className="mt-2 text-3xl font-black">{property.checkOut}</p>
        </div>
      </div>

      {/* Wifi */}
      <section className="mb-6 rounded-2xl border border-[color:var(--border)] p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
          {lbl.wifi}
        </h2>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-[10px] font-bold uppercase text-[color:var(--muted)]">SSID</dt>
            <dd className="font-bold">{property.wifi.ssid}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase text-[color:var(--muted)]">
              {lbl.password}
            </dt>
            <dd className="font-mono font-bold">{property.wifi.password}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase text-[color:var(--muted)]">Band</dt>
            <dd className="font-bold">{property.wifi.band}</dd>
          </div>
        </dl>
      </section>

      {/* Address */}
      <section className="mb-6 rounded-2xl border border-[color:var(--border)] p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
          {lbl.address}
        </h2>
        <p className="font-bold">
          {property.address.street} — Piso {property.address.floor}, Depto {property.address.unit}
        </p>
        <p className="text-sm text-[color:var(--muted)]">{property.address.neighborhood}</p>
        <p className="text-sm text-[color:var(--muted)]">{property.address.city}</p>
        <a
          href={property.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] hover:underline"
        >
          Google Maps →
        </a>
      </section>

      {/* Door code */}
      <section className="mb-6 rounded-2xl border border-[color:var(--border)] p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
          {lbl.doorCode}
        </h2>
        <p className="text-sm leading-relaxed text-[color:var(--muted)]">
          {property.doorCode.instructions[l]}
        </p>
      </section>

      {/* Parking */}
      {property.parking && (
        <section className="mb-6 rounded-2xl border border-[color:var(--border)] p-6">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
            {lbl.parking}
          </h2>
          <p className="mb-2 text-sm">
            <span className="text-[10px] font-bold uppercase text-[color:var(--muted)]">
              {lbl.elevatorCode}:{" "}
            </span>
            <span className="font-mono font-bold">{property.parking.elevatorCode}</span>
          </p>
          <p className="text-sm leading-relaxed text-[color:var(--muted)]">
            {property.parking.notes[l]}
          </p>
        </section>
      )}

      {/* Amenities */}
      {property.amenities && (
        <section className="mb-6 rounded-2xl border border-[color:var(--border)] p-6">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
            {lbl.amenities}
          </h2>
          <p className="mb-2 text-sm">
            <span className="text-[10px] font-bold uppercase text-[color:var(--muted)]">
              {lbl.hours}:{" "}
            </span>
            <span className="font-bold">{property.amenities.hours}</span>
          </p>
          <p className="text-sm leading-relaxed text-[color:var(--muted)]">
            {property.amenities.notes[l]}
          </p>
        </section>
      )}

      {/* Voltage */}
      <section className="mb-6 rounded-2xl border border-[color:var(--border)] p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
          {lbl.voltage}
        </h2>
        <p className="text-sm font-bold">{property.voltage}</p>
      </section>

      {/* Contacts */}
      <section className="rounded-2xl border border-[color:var(--border)] p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:var(--brand)]">
          {lbl.contacts}
        </h2>
        <ul className="space-y-3">
          {property.contacts.map((c) => (
            <li key={c.name + c.phone} className="flex items-center justify-between">
              <div>
                <p className="font-bold">{c.name}</p>
                <p className="text-xs text-[color:var(--muted)]">{c.role}</p>
              </div>
              {c.whatsapp && (
                <a
                  href={`https://wa.me/${c.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[color:var(--brand)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-[color:var(--brand-dark)]"
                >
                  WhatsApp
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
