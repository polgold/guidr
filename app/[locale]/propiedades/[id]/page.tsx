import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getProperty, listPropertyIds } from "@/lib/properties";

export const metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export function generateStaticParams() {
  const ids = listPropertyIds();
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

const labels: Record<Locale, Record<string, string>> = {
  es: {
    welcome: "Bienvenido",
    yourStay: "Tu estadía en Puerto Madero",
    checkIn: "Check-in",
    checkOut: "Check-out",
    from: "desde las",
    until: "antes de las",
    wifi: "Internet",
    network: "Red",
    password: "Contraseña",
    band: "Banda",
    scanQr: "Escaneá para conectarte",
    voltage: "Energía eléctrica",
    adapters: "Si trae adaptadores, deben ser Tipo C o Tipo I",
    address: "Ubicación",
    openMaps: "Abrir en Google Maps",
    contacts: "Consultas",
    contactHours: "8 a 20 hs. (fuera de horario, sólo urgencias)",
    doorCode: "Acceso al departamento",
    parking: "Estacionamiento",
    elevatorCode: "Código del ascensor",
    amenities: "Amenities",
    hours: "Horario",
    sofaBed: "Sofá cama",
    watchVideo: "Ver instructivo",
    transport: "Cómo llegar",
    aeroparque: "Desde Aeroparque",
    ezeiza: "Desde Ezeiza",
    vehicle: "En vehículo",
    estTime: "Tiempo estimado",
    financialTip: "Tip financiero",
    rules: "Reglamento del edificio",
    registration: "Importante",
    petFriendly: "Pet Friendly",
    floor: "Piso",
    unit: "Depto",
    poolNoticeTitle: "Aviso Importante",
    poolNoticeMessage: "Desde el lunes 4 de mayo y hasta el 30 de junio, la piscina estará en mantenimiento y no podrá ser utilizada. Disculpas por las molestias.",
  },
  en: {
    welcome: "Welcome",
    yourStay: "Your stay in Puerto Madero",
    checkIn: "Check-in",
    checkOut: "Check-out",
    from: "from",
    until: "before",
    wifi: "Internet",
    network: "Network",
    password: "Password",
    band: "Band",
    scanQr: "Scan to connect",
    voltage: "Electrical power",
    adapters: "If bringing adapters, they must be Type C or Type I",
    address: "Location",
    openMaps: "Open in Google Maps",
    contacts: "Contact us",
    contactHours: "8 AM – 8 PM (after hours, emergencies only)",
    doorCode: "Apartment access",
    parking: "Parking",
    elevatorCode: "Elevator code",
    amenities: "Amenities",
    hours: "Hours",
    sofaBed: "Sofa bed",
    watchVideo: "Watch tutorial",
    transport: "Getting here",
    aeroparque: "From Aeroparque",
    ezeiza: "From Ezeiza",
    vehicle: "By car",
    estTime: "Est. time",
    financialTip: "Financial tip",
    rules: "Building rules",
    registration: "Important",
    petFriendly: "Pet Friendly",
    floor: "Floor",
    unit: "Unit",
    poolNoticeTitle: "Important Notice",
    poolNoticeMessage: "From Monday May 4 through June 30, the pool will be under maintenance and unavailable for use. We apologize for the inconvenience.",
  },
  pt: {
    welcome: "Bem-vindo",
    yourStay: "Sua estadia em Puerto Madero",
    checkIn: "Check-in",
    checkOut: "Check-out",
    from: "a partir das",
    until: "antes das",
    wifi: "Internet",
    network: "Rede",
    password: "Senha",
    band: "Banda",
    scanQr: "Escaneie para conectar",
    voltage: "Energia elétrica",
    adapters: "Se trouxer adaptadores, devem ser Tipo C ou Tipo I",
    address: "Localização",
    openMaps: "Abrir no Google Maps",
    contacts: "Consultas",
    contactHours: "8 às 20 h (fora do horário, apenas urgências)",
    doorCode: "Acesso ao apartamento",
    parking: "Estacionamento",
    elevatorCode: "Código do elevador",
    amenities: "Amenities",
    hours: "Horário",
    sofaBed: "Sofá-cama",
    watchVideo: "Ver tutorial",
    transport: "Como chegar",
    aeroparque: "Do Aeroparque",
    ezeiza: "Do Ezeiza",
    vehicle: "De carro",
    estTime: "Tempo estimado",
    financialTip: "Dica financeira",
    rules: "Regulamento do edifício",
    registration: "Importante",
    petFriendly: "Pet Friendly",
    floor: "Andar",
    unit: "Apto",
    poolNoticeTitle: "Aviso Importante",
    poolNoticeMessage: "A partir de segunda-feira 4 de maio e até 30 de junho, a piscina estará em manutenção e não poderá ser utilizada. Desculpe pelo inconveniente.",
  },
};

/* ─── Reusable sub-components ─── */

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <span className="mb-3 block text-4xl">{icon}</span>
      <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[color:var(--ink)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[color:var(--ink-mute)]">{subtitle}</p>
      )}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[color:var(--line)] p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-mute)]">
      {children}
    </p>
  );
}

/* ─── Main page ─── */

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
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════════
          TOP BAR / LOGO
          ════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 py-5 lg:px-10">
        <Link
          href={`/${l}`}
          className="font-[family-name:var(--font-fraunces)] text-2xl font-medium italic tracking-tight text-white drop-shadow-lg"
        >
          Guidr<span className="text-[color:var(--accent)]">.</span>
        </Link>
      </div>

      {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
      <header className="relative isolate overflow-hidden bg-[color:var(--bg-dark)]">
        <Image
          src={property.heroImage}
          alt={property.nickname}
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-6 flex items-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
            <span className="inline-block h-[1px] w-10 bg-[color:var(--accent)]" style={{ marginRight: 12 }} />
            {lbl.yourStay}
            <span className="inline-block h-[1px] w-10 bg-[color:var(--accent)]" style={{ marginLeft: 12 }} />
          </div>

          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-light leading-tight text-white sm:text-6xl md:text-7xl">
            {lbl.welcome}
          </h1>
          <p className="mt-4 font-[family-name:var(--font-fraunces)] text-xl font-light italic text-[#E5B97C] sm:text-2xl">
            {property.nickname}
          </p>

          {/* Check-in / Check-out */}
          <div className="mt-12 grid w-full max-w-md grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-6 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {lbl.checkIn}
              </p>
              <p className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl font-light text-white sm:text-4xl">
                {property.checkIn}
              </p>
              <p className="mt-1 text-[11px] text-white/40">{lbl.from}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-6 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {lbl.checkOut}
              </p>
              <p className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl font-light text-white sm:text-4xl">
                {property.checkOut}
              </p>
              <p className="mt-1 text-[11px] text-white/40">{lbl.until}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          POOL MAINTENANCE NOTICE — remove after 2026-06-30
          ════════════════════════════════════════════ */}
      <section className="border-b border-amber-200 bg-amber-50 px-6 py-10 sm:py-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <svg className="h-12 w-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
            {lbl.poolNoticeTitle}
          </p>
          <p className="font-[family-name:var(--font-fraunces)] text-xl font-light leading-relaxed text-amber-900 sm:text-2xl">
            {lbl.poolNoticeMessage}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PET FRIENDLY (105 only)
          ════════════════════════════════════════════ */}
      {property.petFriendly && (
        <section className="border-b border-[color:var(--line)] bg-[#FFF8F0] px-6 py-8">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 text-center">
            <span className="text-2xl">🐾</span>
            <p className="font-[family-name:var(--font-fraunces)] text-lg font-medium italic text-[color:var(--ink)]">
              {lbl.petFriendly} — {property.petFriendly[l]}
            </p>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          WI-FI
          ════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="📶" title={lbl.wifi} />
          <Card className="bg-[color:var(--bg-alt)]">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <Kicker>{lbl.network}</Kicker>
                <p className="mt-1.5 text-lg font-semibold text-[color:var(--ink)]">{property.wifi.ssid}</p>
              </div>
              <div>
                <Kicker>{lbl.password}</Kicker>
                <p className="mt-1.5 font-mono text-2xl font-bold tracking-wider text-[color:var(--brand)]">
                  {property.wifi.password}
                </p>
              </div>
              <div>
                <Kicker>{lbl.band}</Kicker>
                <p className="mt-1.5 text-lg font-semibold text-[color:var(--ink)]">{property.wifi.band}</p>
              </div>
            </div>
            {property.wifi.qrImage && (
              <div className="mt-6 flex flex-col items-center gap-3 border-t border-[color:var(--line)] pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-mute)]">
                  {lbl.scanQr}
                </p>
                <div className="relative h-44 w-44 overflow-hidden rounded-xl bg-white p-3">
                  <Image
                    src={property.wifi.qrImage}
                    alt={`QR WiFi ${property.wifi.ssid}`}
                    fill
                    className="object-contain p-3"
                    sizes="176px"
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          VOLTAGE
          ════════════════════════════════════════════ */}
      <section className="bg-[color:var(--bg-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="⚡" title={lbl.voltage} />
          <Card className="bg-white">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="relative h-24 w-52 shrink-0 sm:h-32 sm:w-64">
                <Image
                  src="/images/property/enchufes.jpg"
                  alt="Type C / Type I"
                  fill
                  className="object-contain"
                  sizes="(max-width:640px) 208px, 256px"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[color:var(--ink)] sm:text-2xl">
                  {property.voltage}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">{lbl.adapters}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACTS
          ════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="💬" title={lbl.contacts} subtitle={lbl.contactHours} />
          <div className="space-y-4">
            {property.contacts.map((c) => (
              <Card key={(c.name || c.role[l]) + c.phone} className="bg-[color:var(--bg-alt)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                  <div className="flex items-center gap-4">
                    {c.image ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16">
                        <Image src={c.image} alt={c.name || c.role[l]} fill className="object-cover" sizes="64px" />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[color:var(--line)] text-xl font-semibold text-[color:var(--ink-mute)] sm:h-16 sm:w-16">
                        {(c.name || c.role[l])[0]}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[color:var(--ink)]">
                        {c.name || c.role[l]}
                      </p>
                      {c.name && (
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
                          {c.role[l]}
                        </p>
                      )}
                    </div>
                  </div>
                  {c.whatsapp ? (
                    <a
                      href={`https://wa.me/${c.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#1fb855] hover:shadow-lg sm:w-auto"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <a
                      href={`tel:+${c.phone}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[color:var(--brand)] hover:shadow-lg sm:w-auto"
                    >
                      {l === "es" ? "Teléfono" : l === "pt" ? "Telefone" : "Phone"}
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ADDRESS
          ════════════════════════════════════════════ */}
      <section className="bg-[color:var(--bg-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="📍" title={lbl.address} />
          <Card className="bg-white text-center">
            <p className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[color:var(--ink)] sm:text-2xl">
              {property.address.street}
            </p>
            <p className="mt-2 text-base text-[color:var(--ink-soft)]">
              {lbl.floor} {property.address.floor}, {lbl.unit} {property.address.unit} — {property.address.neighborhood}
            </p>
            <p className="mt-1 text-sm text-[color:var(--ink-mute)]">{property.address.city}</p>
            <p className="mt-2 text-sm italic text-[color:var(--accent)]">{property.address.reference[l]}</p>
            <a
              href={property.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)] bg-[color:var(--ink)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all hover:border-[color:var(--brand)] hover:bg-[color:var(--brand)]"
            >
              {lbl.openMaps} <span aria-hidden>→</span>
            </a>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRANSPORT
          ════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader icon="✈️" title={lbl.transport} />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
            {/* Aeroparque */}
            <Card className="bg-[color:var(--bg-alt)] p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={property.transport.aeroparque.image} alt="Aeroparque" fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[color:var(--ink)]">
                  {lbl.aeroparque}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {lbl.estTime}: {property.transport.aeroparque.time}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {property.transport.aeroparque.notes[l]}
                </p>
              </div>
            </Card>

            {/* Ezeiza */}
            <Card className="bg-[color:var(--bg-alt)] p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={property.transport.ezeiza.image} alt="Ezeiza" fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[color:var(--ink)]">
                  {lbl.ezeiza}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {lbl.estTime}: {property.transport.ezeiza.time}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {property.transport.ezeiza.notes[l]}
                </p>
              </div>
            </Card>

            {/* Vehicle */}
            <Card className="bg-[color:var(--bg-alt)] p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={property.transport.vehicle.image} alt="Dock 14" fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[color:var(--ink)]">
                  {lbl.vehicle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {property.transport.vehicle.notes[l]}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINANCIAL TIP
          ════════════════════════════════════════════ */}
      <section className="bg-[color:var(--bg-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="💰" title={lbl.financialTip} />
          <Card className="bg-white">
            <p className="text-base leading-relaxed text-[color:var(--ink-soft)]">{property.financialTip[l]}</p>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          DOOR ACCESS
          ════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="🔑" title={lbl.doorCode} />
          <Card className="bg-[color:var(--bg-alt)]">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative h-48 w-36 shrink-0 overflow-hidden rounded-xl">
                <Image src={property.doorCode.image} alt="Smart lock" fill className="object-cover" sizes="144px" />
              </div>
              <p className="text-base leading-relaxed text-[color:var(--ink-soft)]">
                {property.doorCode.instructions[l]}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PARKING
          ════════════════════════════════════════════ */}
      <section className="bg-[color:var(--bg-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="🅿️" title={lbl.parking} />
          <Card className="bg-white">
            <div className="mb-5 flex items-center gap-3">
              <Kicker>{lbl.elevatorCode}</Kicker>
              <span className="rounded-lg bg-[color:var(--bg-alt)] px-4 py-2 font-mono text-xl font-bold text-[color:var(--brand)]">
                {property.parking.elevatorCode}
              </span>
            </div>
            <div className="relative mb-5 aspect-video overflow-hidden rounded-xl">
              <Image src={property.parking.image} alt="Dock 14 parking" fill className="object-cover" sizes="(max-width:672px) 100vw, 672px" />
            </div>
            <p className="text-base leading-relaxed text-[color:var(--ink-soft)]">{property.parking.notes[l]}</p>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          AMENITIES
          ════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="🏊" title={lbl.amenities} />
          <Card className="bg-[color:var(--bg-alt)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/30 bg-white px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {lbl.hours}: {property.amenities.hours}
              </span>
            </div>
            <p className="text-base leading-relaxed text-[color:var(--ink-soft)]">{property.amenities.notes[l]}</p>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SOFA BED VIDEO
          ════════════════════════════════════════════ */}
      {property.sofaBedVideo && (
        <section className="bg-[color:var(--bg-alt)] px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <Card className="bg-white">
              <div className="flex items-center gap-5">
                <span className="text-4xl">🛋️</span>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[color:var(--ink)]">
                    {lbl.sofaBed}
                  </p>
                </div>
                <a
                  href={property.sofaBedVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)] transition-all hover:bg-[color:var(--brand)] hover:text-white"
                >
                  {lbl.watchVideo} <span aria-hidden>→</span>
                </a>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          BUILDING RULES
          ════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader icon="📋" title={lbl.rules} />
          <div className="space-y-4">
            {property.rules.map((rule, i) => (
              <Card key={i} className="bg-[color:var(--bg-alt)]">
                <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-medium text-[color:var(--ink)]">
                  {rule.title[l]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">{rule.text[l]}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          REGISTRATION NOTICE
          ════════════════════════════════════════════ */}
      <section className="bg-[color:var(--bg-dark)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            <span className="hairline" />
            {lbl.registration}
            <span className="hairline" />
          </div>
          <p className="font-[family-name:var(--font-fraunces)] text-xl font-light leading-relaxed text-white sm:text-2xl">
            {property.registrationNotice[l]}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GUIDE CTA
          ════════════════════════════════════════════ */}
      <section className="bg-[color:var(--bg-alt)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 block text-4xl">🗺️</span>
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[color:var(--ink)] sm:text-3xl">
            {l === "es"
              ? "Descubrí nuestra guía de Buenos Aires"
              : l === "pt"
                ? "Descubra nosso guia de Buenos Aires"
                : "Discover our Buenos Aires guide"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[color:var(--ink-soft)]">
            {l === "es"
              ? "Restaurantes, bares, tango, transporte y todo lo que necesitás para disfrutar la ciudad."
              : l === "pt"
                ? "Restaurantes, bares, tango, transporte e tudo o que você precisa para curtir a cidade."
                : "Restaurants, bars, tango, transport and everything you need to enjoy the city."}
          </p>
          <Link
            href={`/${l}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[color:var(--brand)]"
          >
            {l === "es"
              ? "Ver la guía"
              : l === "pt"
                ? "Ver o guia"
                : "View the guide"}{" "}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ── Footer accent ── */}
      <div className="flex items-center justify-center bg-white py-10">
        <span className="hairline" />
        <Link
          href={`/${l}`}
          className="font-[family-name:var(--font-fraunces)] text-sm font-light italic text-[color:var(--ink-mute)] hover:text-[color:var(--brand)]"
        >
          Guidr<span className="text-[color:var(--accent)]">.</span>
        </Link>
        <span className="hairline" />
      </div>
    </div>
  );
}
