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
  role: Record<Locale, string>;
  phone: string; // E.164 without +, for wa.me links
  whatsapp: boolean;
  image?: string;
};

export type Property = {
  id: string;
  nickname: string;
  heroImage: string;
  petFriendly?: Record<Locale, string>;
  address: {
    street: string;
    floor: string;
    unit: string;
    neighborhood: string;
    city: string;
    mapsUrl: string;
    reference: Record<Locale, string>;
  };
  checkIn: string;
  checkOut: string;
  wifi: { ssid: string; password: string; band: string };
  voltage: string;
  doorCode: {
    image: string;
    instructions: Record<Locale, string>;
  };
  parking: {
    elevatorCode: string;
    image: string;
    notes: Record<Locale, string>;
  };
  amenities: {
    hours: string;
    notes: Record<Locale, string>;
  };
  transport: {
    aeroparque: { image: string; time: string; notes: Record<Locale, string> };
    ezeiza: { image: string; time: string; notes: Record<Locale, string> };
    vehicle: { image: string; notes: Record<Locale, string> };
  };
  financialTip: Record<Locale, string>;
  rules: { title: Record<Locale, string>; text: Record<Locale, string> }[];
  registrationNotice: Record<Locale, string>;
  sofaBedVideo?: string;
  contacts: Contact[];
};

export const properties: Record<string, Property> = {
  "115": {
    id: "115",
    nickname: "Amazing Riverfront 1-15",
    heroImage: "/images/property/hero-115.jpg",
    address: {
      street: "Av. Alicia Moreau de Justo 1848",
      floor: "1",
      unit: "15",
      neighborhood: "Dock 14, Puerto Madero",
      city: "CABA, Buenos Aires (1107)",
      mapsUrl: "https://maps.google.com/?q=Av.+Alicia+Moreau+de+Justo+1848,+Buenos+Aires",
      reference: {
        es: "Referencia: Restaurante Estilo Campo (en el mismo edificio)",
        en: "Reference: Estilo Campo Restaurant (same building)",
        pt: "Referência: Restaurante Estilo Campo (no mesmo edifício)",
      },
    },
    checkIn: "15:00",
    checkOut: "12:00",
    wifi: { ssid: "Fibertel Wifi 526", password: "0013890843", band: "2.4 GHz" },
    voltage: "220V / 50Hz",
    doorCode: {
      image: "/images/property/cerradura.jpg",
      instructions: {
        es: "1) Apoye el dedo en la parte superior por unos segundos. 2) Cuando encienda el teclado, introduzca su Código Personal (normalmente triple 0, luego los 4 últimos números de su celular), seguidos de la tecla #. Ejemplo: 0001234#. 3) Abra la puerta.",
        en: "1) Place your finger on the top for a few seconds. 2) When the keypad lights up, enter your Personal Code (triple 0, then the last 4 digits of your mobile), followed by #. Example: 0001234#. 3) Open the door.",
        pt: "1) Pressione o dedo na parte superior por alguns segundos. 2) Quando o teclado acender, digite seu Código Pessoal (triplo 0, depois os 4 últimos dígitos do seu celular), seguido de #. Exemplo: 0001234#. 3) Abra a porta.",
      },
    },
    parking: {
      elevatorCode: "1251#",
      image: "/images/property/dock14.jpg",
      notes: {
        es: "Una vez registrado su vehículo, se ingresa llamando a la guardia o con control remoto (depósito USD 20).",
        en: "After registering your vehicle, entry is via the guard or with a remote control (USD 20 deposit).",
        pt: "Após registrar seu veículo, a entrada é pela guarita ou com controle remoto (depósito USD 20).",
      },
    },
    amenities: {
      hours: "11:00 – 19:00",
      notes: {
        es: "Pileta, gimnasio y sauna. Contactar con la guardia para acceso. Se permiten menores solo con adulto. Ducha obligatoria antes de ingresar. Vestuarios disponibles.",
        en: "Pool, gym and sauna. Contact the front desk for access. Minors allowed only with an adult. Shower required before entry. Changing rooms available.",
        pt: "Piscina, academia e sauna. Contatar a guarita para acesso. Menores permitidos apenas com adulto. Ducha obrigatória antes de entrar. Vestiários disponíveis.",
      },
    },
    transport: {
      aeroparque: {
        image: "/images/property/aeroparque.jpg",
        time: "20-25 min",
        notes: {
          es: "Taxi ~USD 15. Uber disponible. Transfer en mostradores de arribos. Evitar ofrecimientos espontáneos.",
          en: "Taxi ~USD 15. Uber available. Transfer desks at arrivals. Avoid unsolicited offers.",
          pt: "Táxi ~USD 15. Uber disponível. Transfer nos balcões de desembarque. Evite ofertas espontâneas.",
        },
      },
      ezeiza: {
        image: "/images/property/ezeiza.jpg",
        time: "30-45 min",
        notes: {
          es: "Taxi ~USD 25. Uber disponible. Transfers ~USD 30 en mostradores oficiales.",
          en: "Taxi ~USD 25. Uber available. Transfers ~USD 30 at official desks.",
          pt: "Táxi ~USD 25. Uber disponível. Transfers ~USD 30 nos balcões oficiais.",
        },
      },
      vehicle: {
        image: "/images/property/dock14.jpg",
        notes: {
          es: "Cochera subterránea disponible. Llamar a la guardia o usar control remoto (depósito USD 20). Ingreso por las dos barreras del Dock.",
          en: "Underground parking available. Call the guard or use remote control (USD 20 deposit). Access through both Dock barriers.",
          pt: "Garagem subterrânea disponível. Chamar a guarita ou usar controle remoto (depósito USD 20). Acesso pelas duas cancelas do Dock.",
        },
      },
    },
    financialTip: {
      es: "Cambie lo mínimo en el aeropuerto (~USD 50 es suficiente). Muchos comercios ofrecen descuentos por pago en efectivo. Evite billetes viejos o dañados. Euros solo en denominaciones chicas.",
      en: "Exchange minimal currency at the airport (~USD 50 is enough). Many businesses offer cash discounts. Avoid old or damaged bills. Euros only in small denominations.",
      pt: "Troque o mínimo no aeroporto (~USD 50 é suficiente). Muitos comércios oferecem descontos para pagamento em dinheiro. Evite notas velhas ou danificadas. Euros apenas em denominações pequenas.",
    },
    rules: [
      {
        title: { es: "Prohibido fumar", en: "No smoking", pt: "Proibido fumar" },
        text: {
          es: "Está prohibido fumar en toda la propiedad, incluyendo balcones.",
          en: "Smoking is not allowed anywhere on the property, including balconies.",
          pt: "É proibido fumar em toda a propriedade, incluindo varandas.",
        },
      },
      {
        title: { es: "Visitas", en: "Visitors", pt: "Visitas" },
        text: {
          es: "No se permiten visitas en las unidades de alquiler temporal.",
          en: "Visitors are not allowed in temporary rental units.",
          pt: "Não são permitidas visitas nas unidades de aluguel temporário.",
        },
      },
      {
        title: { es: "Ruidos", en: "Noise", pt: "Ruídos" },
        text: {
          es: "Respete a los residentes. No se permiten ruidos molestos ni música alta.",
          en: "Please respect residents. No loud noise or music.",
          pt: "Respeite os moradores. Não são permitidos ruídos incômodos nem música alta.",
        },
      },
      {
        title: { es: "Áreas comunes", en: "Common areas", pt: "Áreas comuns" },
        text: {
          es: "No se permite la circulación en traje de baño, sin camiseta, descalzos o mojados en áreas comunes del edificio.",
          en: "No swimwear, shirtless, barefoot or wet in common building areas.",
          pt: "Não é permitida a circulação de maiô, sem camiseta, descalço ou molhado nas áreas comuns.",
        },
      },
      {
        title: { es: "Recepción", en: "Lobby", pt: "Recepção" },
        text: {
          es: "No permanecer en el hall de entrada.",
          en: "Do not linger in the entrance hall.",
          pt: "Não permanecer no hall de entrada.",
        },
      },
      {
        title: { es: "Multas", en: "Fines", pt: "Multas" },
        text: {
          es: "Las infracciones al reglamento del edificio generan multas que se cargan al huésped.",
          en: "Building regulation violations incur fines charged to the guest.",
          pt: "Infrações ao regulamento do edifício geram multas cobradas do hóspede.",
        },
      },
      {
        title: { es: "Energía", en: "Energy", pt: "Energia" },
        text: {
          es: "Apague luces y aire acondicionado cuando no los use.",
          en: "Turn off lights and AC when not in use.",
          pt: "Apague luzes e ar-condicionado quando não estiver usando.",
        },
      },
      {
        title: { es: "Toldos del balcón", en: "Balcony awnings", pt: "Toldos da varanda" },
        text: {
          es: "Mantenga los toldos cerrados cuando se ausente o haya tormentas/viento fuerte.",
          en: "Keep awnings closed when absent or during storms/high winds.",
          pt: "Mantenha os toldos fechados quando se ausentar ou durante tempestades/ventos fortes.",
        },
      },
      {
        title: { es: "Limpieza", en: "Cleaning", pt: "Limpeza" },
        text: {
          es: "Servicio disponible con 48 hs de anticipación. Pago en efectivo al prestador.",
          en: "Cleaning service available with 48-hour notice. Cash payment to provider.",
          pt: "Serviço disponível com 48 h de antecedência. Pagamento em dinheiro ao prestador.",
        },
      },
      {
        title: { es: "Lavandería", en: "Laundry", pt: "Lavanderia" },
        text: {
          es: "Lavarropas y secadoras en el subsuelo (ambos extremos). Fichas en máquina del sector sur. Jabón y suavizante disponibles sin cargo.",
          en: "Washers and dryers in the basement (both ends). Tokens from machine in south section. Free detergent and fabric softener provided.",
          pt: "Lavadoras e secadoras no subsolo (ambas extremidades). Fichas na máquina do setor sul. Sabão e amaciante disponíveis sem custo.",
        },
      },
      {
        title: { es: "Residuos", en: "Waste", pt: "Resíduos" },
        text: {
          es: "Saque la basura y colóquela en los contenedores correspondientes. Lave los platos antes de irse.",
          en: "Take out the trash and place it in the appropriate containers. Wash dishes before leaving.",
          pt: "Retire o lixo e coloque nos contêineres correspondentes. Lave a louça antes de sair.",
        },
      },
      {
        title: { es: "Mascotas", en: "Pets", pt: "Animais" },
        text: {
          es: "No se permiten mascotas en esta unidad.",
          en: "Pets are not allowed in this unit.",
          pt: "Não são permitidos animais de estimação nesta unidade.",
        },
      },
      {
        title: { es: "Desperfectos", en: "Damages", pt: "Danos" },
        text: {
          es: "Comunique de inmediato cualquier rotura o mal funcionamiento de electrodomésticos.",
          en: "Report any breakage or appliance malfunction immediately.",
          pt: "Comunique imediatamente qualquer quebra ou mau funcionamento de eletrodomésticos.",
        },
      },
    ],
    registrationNotice: {
      es: "Todos los huéspedes deben estar identificados previamente a su llegada. Al llegar al edificio, deben registrarse en la guardia.",
      en: "All guests must be pre-identified before arrival. Upon arriving at the building, you must register at the front desk.",
      pt: "Todos os hóspedes devem estar identificados previamente à chegada. Ao chegar ao edifício, devem se registrar na guarita.",
    },
    sofaBedVideo: "/video/sofa-cama-115.mp4",
    contacts: [
      { name: "Karen", role: { es: "Anfitriona", en: "Host", pt: "Anfitriã" }, phone: "541130961959", whatsapp: true, image: "/images/property/karen.jpg" },
      { name: "Pablo", role: { es: "Anfitrión", en: "Host", pt: "Anfitrião" }, phone: "541136511204", whatsapp: true, image: "/images/property/pablo.jpg" },
      { name: "", role: { es: "Guardia del edificio", en: "Building guard", pt: "Guarita do edifício" }, phone: "541143141543", whatsapp: false, image: "/images/property/guardia.jpg" },
      { name: "Daniel", role: { es: "Mantenimiento", en: "Maintenance", pt: "Manutenção" }, phone: "541144710402", whatsapp: true, image: "/images/property/daniel.jpg" },
    ],
  },
  "105": {
    id: "105",
    nickname: "Best Riverfront 1-05",
    heroImage: "/images/property/hero-105.jpg",
    petFriendly: {
      es: "Contamos con cama para mascotas y recipientes para comida y agua.",
      en: "We provide a pet bed and food/water bowls.",
      pt: "Disponibilizamos cama para animais e potes de comida/água.",
    },
    address: {
      street: "Av. Alicia Moreau de Justo 1848",
      floor: "1",
      unit: "05",
      neighborhood: "Dock 14, Puerto Madero",
      city: "CABA, Buenos Aires (1107)",
      mapsUrl: "https://maps.google.com/?q=Av.+Alicia+Moreau+de+Justo+1848,+Buenos+Aires",
      reference: {
        es: "Referencia: Restaurante Estilo Campo (en el mismo edificio)",
        en: "Reference: Estilo Campo Restaurant (same building)",
        pt: "Referência: Restaurante Estilo Campo (no mesmo edifício)",
      },
    },
    checkIn: "15:00",
    checkOut: "12:00",
    wifi: { ssid: "Dpto 105", password: "0018040402", band: "2.4 GHz" },
    voltage: "220V / 50Hz",
    doorCode: {
      image: "/images/property/cerradura.jpg",
      instructions: {
        es: "1) Apoye el dedo en la parte superior por unos segundos. 2) Cuando encienda el teclado, introduzca su Código Personal (normalmente triple 0, luego los 4 últimos números de su celular), seguidos de la tecla #. Ejemplo: 0001234#. 3) Abra la puerta.",
        en: "1) Place your finger on the top for a few seconds. 2) When the keypad lights up, enter your Personal Code (triple 0, then the last 4 digits of your mobile), followed by #. Example: 0001234#. 3) Open the door.",
        pt: "1) Pressione o dedo na parte superior por alguns segundos. 2) Quando o teclado acender, digite seu Código Pessoal (triplo 0, depois os 4 últimos dígitos do seu celular), seguido de #. Exemplo: 0001234#. 3) Abra a porta.",
      },
    },
    parking: {
      elevatorCode: "1251#",
      image: "/images/property/dock14.jpg",
      notes: {
        es: "Una vez registrado su vehículo, se ingresa llamando a la guardia o con control remoto (depósito USD 20). Hay además 28 cocheras de cortesía en el exterior del edificio, sujetas a disponibilidad.",
        en: "After registering your vehicle, entry is via the guard or with a remote control (USD 20 deposit). There are also 28 courtesy spots outside the building, subject to availability.",
        pt: "Após registrar seu veículo, a entrada é pela guarita ou com controle remoto (depósito USD 20). Há ainda 28 vagas de cortesia no exterior do edifício, sujeitas a disponibilidade.",
      },
    },
    amenities: {
      hours: "11:00 – 19:00",
      notes: {
        es: "Pileta, gimnasio y sauna. Contactar con la guardia para acceso. Se permiten menores solo con adulto. Ducha obligatoria antes de ingresar. Vestuarios disponibles. Pet friendly: contamos con cama, recipientes para comida y agua.",
        en: "Pool, gym and sauna. Contact the front desk for access. Minors allowed only with an adult. Shower required before entry. Changing rooms available. Pet friendly: bed and food/water bowls provided.",
        pt: "Piscina, academia e sauna. Contatar a guarita para acesso. Menores permitidos apenas com adulto. Ducha obrigatória antes de entrar. Vestiários disponíveis. Pet friendly: cama e potes de comida/água disponíveis.",
      },
    },
    transport: {
      aeroparque: {
        image: "/images/property/aeroparque.jpg",
        time: "20-25 min",
        notes: {
          es: "Taxi ~USD 15. Uber disponible. Transfer en mostradores de arribos. Evitar ofrecimientos espontáneos.",
          en: "Taxi ~USD 15. Uber available. Transfer desks at arrivals. Avoid unsolicited offers.",
          pt: "Táxi ~USD 15. Uber disponível. Transfer nos balcões de desembarque. Evite ofertas espontâneas.",
        },
      },
      ezeiza: {
        image: "/images/property/ezeiza.jpg",
        time: "30-45 min",
        notes: {
          es: "Taxi ~USD 25. Uber disponible. Transfers ~USD 30 en mostradores oficiales.",
          en: "Taxi ~USD 25. Uber available. Transfers ~USD 30 at official desks.",
          pt: "Táxi ~USD 25. Uber disponível. Transfers ~USD 30 nos balcões oficiais.",
        },
      },
      vehicle: {
        image: "/images/property/dock14.jpg",
        notes: {
          es: "Cochera subterránea disponible. Llamar a la guardia o usar control remoto (depósito USD 20). 28 cocheras de cortesía en el exterior, sujetas a disponibilidad. Ingreso por las dos barreras del Dock.",
          en: "Underground parking available. Call the guard or use remote control (USD 20 deposit). 28 courtesy spots outside, subject to availability. Access through both Dock barriers.",
          pt: "Garagem subterrânea disponível. Chamar a guarita ou usar controle remoto (depósito USD 20). 28 vagas de cortesia no exterior, sujeitas a disponibilidade. Acesso pelas duas cancelas do Dock.",
        },
      },
    },
    financialTip: {
      es: "Cambie lo mínimo en el aeropuerto (~USD 50 es suficiente). Muchos comercios ofrecen descuentos por pago en efectivo. Evite billetes viejos o dañados. Euros solo en denominaciones chicas.",
      en: "Exchange minimal currency at the airport (~USD 50 is enough). Many businesses offer cash discounts. Avoid old or damaged bills. Euros only in small denominations.",
      pt: "Troque o mínimo no aeroporto (~USD 50 é suficiente). Muitos comércios oferecem descontos para pagamento em dinheiro. Evite notas velhas ou danificadas. Euros apenas em denominações pequenas.",
    },
    rules: [
      {
        title: { es: "Prohibido fumar", en: "No smoking", pt: "Proibido fumar" },
        text: {
          es: "Está prohibido fumar en toda la propiedad, incluyendo balcones.",
          en: "Smoking is not allowed anywhere on the property, including balconies.",
          pt: "É proibido fumar em toda a propriedade, incluindo varandas.",
        },
      },
      {
        title: { es: "Visitas", en: "Visitors", pt: "Visitas" },
        text: {
          es: "No se permiten visitas en las unidades de alquiler temporal.",
          en: "Visitors are not allowed in temporary rental units.",
          pt: "Não são permitidas visitas nas unidades de aluguel temporário.",
        },
      },
      {
        title: { es: "Ruidos", en: "Noise", pt: "Ruídos" },
        text: {
          es: "Respete a los residentes. No se permiten ruidos molestos ni música alta.",
          en: "Please respect residents. No loud noise or music.",
          pt: "Respeite os moradores. Não são permitidos ruídos incômodos nem música alta.",
        },
      },
      {
        title: { es: "Áreas comunes", en: "Common areas", pt: "Áreas comuns" },
        text: {
          es: "No se permite la circulación en traje de baño, sin camiseta, descalzos o mojados en áreas comunes del edificio.",
          en: "No swimwear, shirtless, barefoot or wet in common building areas.",
          pt: "Não é permitida a circulação de maiô, sem camiseta, descalço ou molhado nas áreas comuns.",
        },
      },
      {
        title: { es: "Recepción", en: "Lobby", pt: "Recepção" },
        text: {
          es: "No permanecer en el hall de entrada.",
          en: "Do not linger in the entrance hall.",
          pt: "Não permanecer no hall de entrada.",
        },
      },
      {
        title: { es: "Multas", en: "Fines", pt: "Multas" },
        text: {
          es: "Las infracciones al reglamento del edificio generan multas que se cargan al huésped.",
          en: "Building regulation violations incur fines charged to the guest.",
          pt: "Infrações ao regulamento do edifício geram multas cobradas do hóspede.",
        },
      },
      {
        title: { es: "Energía", en: "Energy", pt: "Energia" },
        text: {
          es: "Apague luces y aire acondicionado cuando no los use.",
          en: "Turn off lights and AC when not in use.",
          pt: "Apague luzes e ar-condicionado quando não estiver usando.",
        },
      },
      {
        title: { es: "Toldos del balcón", en: "Balcony awnings", pt: "Toldos da varanda" },
        text: {
          es: "Mantenga los toldos cerrados cuando se ausente o haya tormentas/viento fuerte.",
          en: "Keep awnings closed when absent or during storms/high winds.",
          pt: "Mantenha os toldos fechados quando se ausentar ou durante tempestades/ventos fortes.",
        },
      },
      {
        title: { es: "Limpieza", en: "Cleaning", pt: "Limpeza" },
        text: {
          es: "Servicio disponible con 48 hs de anticipación. Pago en efectivo al prestador.",
          en: "Cleaning service available with 48-hour notice. Cash payment to provider.",
          pt: "Serviço disponível com 48 h de antecedência. Pagamento em dinheiro ao prestador.",
        },
      },
      {
        title: { es: "Lavandería", en: "Laundry", pt: "Lavanderia" },
        text: {
          es: "Lavarropas y secadoras en el subsuelo (ambos extremos). Fichas en máquina del sector sur. Jabón y suavizante disponibles sin cargo.",
          en: "Washers and dryers in the basement (both ends). Tokens from machine in south section. Free detergent and fabric softener provided.",
          pt: "Lavadoras e secadoras no subsolo (ambas extremidades). Fichas na máquina do setor sul. Sabão e amaciante disponíveis sem custo.",
        },
      },
      {
        title: { es: "Residuos", en: "Waste", pt: "Resíduos" },
        text: {
          es: "Saque la basura y colóquela en los contenedores correspondientes. Lave los platos antes de irse.",
          en: "Take out the trash and place it in the appropriate containers. Wash dishes before leaving.",
          pt: "Retire o lixo e coloque nos contêineres correspondentes. Lave a louça antes de sair.",
        },
      },
      {
        title: { es: "Mascotas", en: "Pets", pt: "Animais" },
        text: {
          es: "Bienvenidas. Contamos con cama para mascotas y recipientes para comida y agua.",
          en: "Welcome! We provide a pet bed and food/water bowls.",
          pt: "Bem-vindos! Disponibilizamos cama para animais e potes de comida/água.",
        },
      },
      {
        title: { es: "Desperfectos", en: "Damages", pt: "Danos" },
        text: {
          es: "Comunique de inmediato cualquier rotura o mal funcionamiento de electrodomésticos.",
          en: "Report any breakage or appliance malfunction immediately.",
          pt: "Comunique imediatamente qualquer quebra ou mau funcionamento de eletrodomésticos.",
        },
      },
    ],
    registrationNotice: {
      es: "Todos los huéspedes deben estar identificados previamente a su llegada. Al llegar al edificio, deben registrarse en la guardia.",
      en: "All guests must be pre-identified before arrival. Upon arriving at the building, you must register at the front desk.",
      pt: "Todos os hóspedes devem estar identificados previamente à chegada. Ao chegar ao edifício, devem se registrar na guarita.",
    },
    sofaBedVideo: "/video/sofa-cama-105.mp4",
    contacts: [
      { name: "Karen", role: { es: "Anfitriona", en: "Host", pt: "Anfitriã" }, phone: "541130961959", whatsapp: true, image: "/images/property/karen.jpg" },
      { name: "Pablo", role: { es: "Anfitrión", en: "Host", pt: "Anfitrião" }, phone: "541136511204", whatsapp: true, image: "/images/property/pablo.jpg" },
      { name: "", role: { es: "Guardia del edificio", en: "Building guard", pt: "Guarita do edifício" }, phone: "541143141543", whatsapp: false, image: "/images/property/guardia.jpg" },
      { name: "Daniel", role: { es: "Mantenimiento", en: "Maintenance", pt: "Manutenção" }, phone: "541144710402", whatsapp: true, image: "/images/property/daniel.jpg" },
    ],
  },
};

export function getProperty(id: string): Property | null {
  return properties[id] ?? null;
}

export function listPropertyIds(): string[] {
  return Object.keys(properties);
}
