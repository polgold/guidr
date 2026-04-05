/**
 * Public homepage sections — Buenos Aires guide content.
 *
 * All items are real places/services near Puerto Madero and San Telmo.
 * Max 6–8 items per section. Edit freely; titles are proper nouns and
 * usually should NOT be translated. Descriptions are localized.
 */

import type { Locale } from "./i18n";

export type LocalizedText = Record<Locale, string>;

export type SectionItem = {
  title: string; // proper noun — usually kept the same in all languages
  description: LocalizedText;
  image?: string; // public path, e.g. /images/listings/foo.jpg
  imageKind?: "photo" | "logo"; // "logo" renders contained (not cropped) on a soft bg
  href?: string; // optional link to a /guias/[slug] page or external URL
  phone?: string; // E.164 without + for tel: links
  address?: string;
  mapsQuery?: string; // used to build a Google Maps search link
  hours?: string;
};

export type Section = {
  id: string; // URL anchor
  titleKey: string; // resolves against lib/i18n.ts
  subtitle: LocalizedText;
  items: SectionItem[];
};

export const sections: Section[] = [
  // --- EMERGENCIAS ---
  {
    id: "emergencias",
    titleKey: "section.emergencias.title",
    subtitle: {
      es: "Líneas directas a los principales servicios de emergencia de la Ciudad de Buenos Aires.",
      en: "Direct lines to Buenos Aires' main emergency services.",
      pt: "Linhas diretas para os principais serviços de emergência de Buenos Aires.",
    },
    items: [
      {
        title: "Policía",
        image: "/images/listings/policia.jpg",
        phone: "911",
        description: {
          es: "Emergencias 24 hs. Línea directa de la Policía de la Ciudad.",
          en: "24/7 emergencies. Direct line to the City Police.",
          pt: "Emergências 24 hs. Linha direta da Polícia da Cidade.",
        },
      },
      {
        title: "Bomberos",
        image: "/images/listings/bomberos.jpg",
        phone: "100",
        description: {
          es: "Incendios, accidentes y emergencias. Atención 24 hs.",
          en: "Fires, accidents and emergencies. 24/7.",
          pt: "Incêndios, acidentes e emergências. 24 hs.",
        },
      },
      {
        title: "SAME",
        image: "/images/listings/same-ambulancia.jpg",
        phone: "107",
        description: {
          es: "Servicio gratuito de ambulancias y atención médica de urgencia.",
          en: "Free ambulance service and medical emergencies.",
          pt: "Serviço gratuito de ambulâncias e atendimento médico de urgência.",
        },
      },
      {
        title: "Defensa Civil",
        image: "/images/listings/bomberos.jpg",
        phone: "103",
        description: {
          es: "Asistencia en catástrofes, incendios, inundaciones y rescates.",
          en: "Disaster, fire, flood and rescue assistance.",
          pt: "Assistência em catástrofes, incêndios, enchentes e resgates.",
        },
      },
      {
        title: "Turismo",
        image: "/images/listings/policia.jpg",
        phone: "+541143162128",
        description: {
          es: "Policía Turística de la Ciudad de Buenos Aires. Asistencia al visitante.",
          en: "Buenos Aires Tourist Police. Visitor assistance.",
          pt: "Polícia Turística de Buenos Aires. Assistência ao visitante.",
        },
      },
      {
        title: "Violencia de género",
        image: "/images/listings/policia.jpg",
        phone: "144",
        description: {
          es: "Línea nacional gratuita, atención las 24 hs.",
          en: "Free national hotline, 24/7 support.",
          pt: "Linha nacional gratuita, atendimento 24 hs.",
        },
      },
    ],
  },

  // --- GASTRONOMÍA ---
  {
    id: "gastronomia",
    titleKey: "section.gastronomia.title",
    subtitle: {
      es: "Algunos lugares que nos gustan, cerca del departamento.",
      en: "A few places we love, near the apartment.",
      pt: "Alguns lugares que amamos, perto do apartamento.",
    },
    items: [
      {
        title: "El Bodegón de Madero",
        image: "/images/listings/el-bodegon-de-madero.png",
        imageKind: "logo",
        address: "Puerto Madero",
        mapsQuery: "El Bodegón de Madero Puerto Madero",
        description: {
          es: "Experiencia clásica porteña a metros del río: cocina abundante, sabores tradicionales y ambiente cálido sin pretensiones.",
          en: "A classic Buenos Aires experience steps from the river: hearty cooking, traditional flavors, warm unpretentious atmosphere.",
          pt: "Experiência clássica portenha a metros do rio: cozinha farta, sabores tradicionais e clima acolhedor sem pretensões.",
        },
      },
      {
        title: "Siga La Vaca",
        image: "/images/listings/siga-la-vaca.jpeg",
        imageKind: "logo",
        address: "Puerto Madero",
        mapsQuery: "Siga La Vaca Puerto Madero",
        description: {
          es: "Clásico de la parrilla libre porteña: carnes asadas al estilo tradicional y abundantes guarniciones, en un ambiente informal.",
          en: "A classic all-you-can-eat parrilla: traditional grilled meats and plentiful sides in a relaxed setting.",
          pt: "Clássico do rodízio de parrilla portenho: carnes assadas tradicionais e guarnições fartas, em ambiente informal.",
        },
      },
      {
        title: "Sagardi",
        image: "/images/listings/sagardi.png",
        imageKind: "logo",
        address: "Humberto 1° 320, San Telmo",
        mapsQuery: "Sagardi San Telmo Buenos Aires",
        description: {
          es: "Auténtica cocina vasca con pintxos, carnes a la parrilla y productos de alta calidad. Tradición española, fuego y celebración gastronómica.",
          en: "Authentic Basque cuisine with pintxos, grilled meats and top-quality produce. Spanish tradition, fire and a celebration of food.",
          pt: "Autêntica cozinha basca com pintxos, carnes grelhadas e produtos de alta qualidade. Tradição espanhola, fogo e celebração gastronômica.",
        },
      },
      {
        title: "Jugador 12",
        image: "/images/listings/jugador-12.jpg",
        imageKind: "logo",
        address: "Puerto Madero",
        mapsQuery: "Jugador 12 Puerto Madero",
        description: {
          es: "Parrilla de espíritu futbolero atravesada por la pasión de Boca Juniors. Carne a la brasa, clima popular y abundancia.",
          en: "A football-loving parrilla full of Boca Juniors spirit. Grilled meats, lively vibe and generous portions.",
          pt: "Parrilla de espírito futebolístico, atravessada pela paixão pelo Boca Juniors. Carne na brasa, clima popular e fartura.",
        },
      },
      {
        title: "Free Hugs",
        image: "/images/listings/free-hugs.png",
        imageKind: "logo",
        address: "Junto al edificio",
        hours: "24 hs",
        description: {
          es: "Bar y drugstore 24 hs justo al lado de la entrada. Comida rápida, empanadas, sandwiches, bebidas. Mesas adentro y afuera.",
          en: "24-hour bar and convenience store right next to the entrance. Fast food, empanadas, sandwiches, drinks. Indoor and outdoor seating.",
          pt: "Bar e drugstore 24 hs ao lado da entrada. Comida rápida, empanadas, sanduíches, bebidas. Mesas dentro e fora.",
        },
      },
      {
        title: "La Veneciana",
        image: "/images/listings/la-veneciana.jpg",
        imageKind: "logo",
        mapsQuery: "La Veneciana heladería Buenos Aires",
        description: {
          es: "Heladería tradicional emblema de la herencia italiana en Buenos Aires. Sabores clásicos y cremas artesanales.",
          en: "A traditional ice-cream parlor, emblem of the Italian heritage in Buenos Aires. Classic flavors and artisan creams.",
          pt: "Sorveteria tradicional, emblema da herança italiana em Buenos Aires. Sabores clássicos e cremes artesanais.",
        },
      },
      {
        title: "Plaza Asturias",
        image: "/images/listings/plaza-asturias.png",
        imageKind: "logo",
        address: "Av. de Mayo 1199, Monserrat",
        mapsQuery: "Plaza Asturias Av. de Mayo Buenos Aires",
        description: {
          es: "Restaurante clásico de cocina española, tradición, platos abundantes y ambiente familiar desde hace décadas.",
          en: "A classic Spanish restaurant with tradition, generous plates and a family atmosphere for decades.",
          pt: "Restaurante clássico de cozinha espanhola, com tradição, pratos fartos e ambiente familiar há décadas.",
        },
      },
      {
        title: "Cabaña Las Lilas",
        image: "/images/listings/parrilla.jpg",
        address: "Av. Alicia Moreau de Justo 516",
        mapsQuery: "Cabaña Las Lilas Puerto Madero",
        description: {
          es: "La parrilla premium más conocida de Puerto Madero. Cortes selectos de carnes argentinas con vista al dique.",
          en: "Puerto Madero's most famous premium steakhouse. Select Argentine cuts with a view of the docks.",
          pt: "A parrilla premium mais conhecida de Puerto Madero. Cortes selecionados de carnes argentinas com vista ao dique.",
        },
      },
    ],
  },

  // --- BARES ---
  {
    id: "bares",
    titleKey: "section.bares.title",
    subtitle: {
      es: "Bares históricos y cocktail bars cerca de San Telmo y Puerto Madero.",
      en: "Historic bars and cocktail spots near San Telmo and Puerto Madero.",
      pt: "Bares históricos e coquetelarias perto de San Telmo e Puerto Madero.",
    },
    items: [
      {
        title: "La Puerta Roja",
        image: "/images/listings/puerta-roja.png",
        imageKind: "logo",
        address: "Chacabuco 733, San Telmo",
        mapsQuery: "La Puerta Roja San Telmo",
        description: {
          es: "Bar oculto detrás de una puerta roja. Clásico de San Telmo, ambiente relajado y buenos cócteles.",
          en: "A hidden bar behind a red door. A San Telmo classic with a laid-back vibe and solid cocktails.",
          pt: "Bar escondido atrás de uma porta vermelha. Clássico de San Telmo, ambiente relaxado e bons coquetéis.",
        },
      },
      {
        title: "Doppelgänger",
        image: "/images/listings/bar-san-telmo.jpg",
        address: "Av. Juan de Garay 500, San Telmo",
        mapsQuery: "Doppelgänger bar San Telmo",
        description: {
          es: "Cocktail bar clásico especializado en gin, vermouth y cócteles de autor. Una parada obligada de la coctelería porteña.",
          en: "A classic cocktail bar specializing in gin, vermouth and signature drinks. A must-stop on the Buenos Aires cocktail scene.",
          pt: "Coquetelaria clássica especializada em gin, vermute e coquetéis autorais. Parada obrigatória da cena portenha.",
        },
      },
      {
        title: "Bar Plaza Dorrego",
        image: "https://images.pexels.com/photos/14201458/pexels-photo-14201458.jpeg?auto=compress&cs=tinysrgb&w=800",
        address: "Defensa 1098, San Telmo",
        mapsQuery: "Bar Plaza Dorrego San Telmo",
        description: {
          es: "Bar notable frente a la Plaza Dorrego. Piso original, barra antigua y el latido de la feria dominical.",
          en: "A heritage-listed bar facing Plaza Dorrego. Original floors, an old-school bar and the pulse of the Sunday fair.",
          pt: "Bar notável em frente à Plaza Dorrego. Piso original, balcão antigo e o pulso da feira de domingo.",
        },
      },
      {
        title: "Bar Sur",
        image: "/images/listings/bar-sur.jpg",
        address: "Estados Unidos 299, San Telmo",
        mapsQuery: "Bar Sur San Telmo tango",
        description: {
          es: "Histórico bar con shows de tango en vivo. Pequeño, íntimo y con la esencia del arrabal porteño.",
          en: "A historic bar with live tango shows. Small, intimate, and full of the spirit of old Buenos Aires.",
          pt: "Bar histórico com shows de tango ao vivo. Pequeno, íntimo e com a essência do velho arrabalde portenho.",
        },
      },
      {
        title: "Boticario",
        image: "https://images.pexels.com/photos/17651216/pexels-photo-17651216.jpeg?auto=compress&cs=tinysrgb&w=800",
        address: "Venezuela 1413, Monserrat",
        mapsQuery: "Boticario bar Buenos Aires",
        description: {
          es: "Cocktail bar con estética de farmacia antigua. Cócteles creativos en un ambiente de elegancia oscura.",
          en: "A cocktail bar with an old apothecary aesthetic. Creative drinks in a darkly elegant setting.",
          pt: "Coquetelaria com estética de farmácia antiga. Coquetéis criativos em ambiente de elegância sombria.",
        },
      },
      {
        title: "Gran Bar Danzón",
        image: "https://images.pexels.com/photos/17864107/pexels-photo-17864107.jpeg?auto=compress&cs=tinysrgb&w=800",
        address: "Libertad 1161, Recoleta",
        mapsQuery: "Gran Bar Danzón Buenos Aires",
        description: {
          es: "Wine bar de referencia en la ciudad. Amplia carta de vinos argentinos, cocina sofisticada y coctelería.",
          en: "A benchmark wine bar in the city. A broad selection of Argentine wines, sophisticated food and cocktails.",
          pt: "Wine bar de referência na cidade. Ampla carta de vinhos argentinos, cozinha sofisticada e coquetéis.",
        },
      },
    ],
  },

  // --- FARMACIAS ---
  {
    id: "farmacias",
    titleKey: "section.farmacias.title",
    subtitle: {
      es: "Farmacias de guardia y turno extendido cerca del departamento.",
      en: "Pharmacies open late and on-call near the apartment.",
      pt: "Farmácias de plantão e horário estendido perto do apartamento.",
    },
    items: [
      {
        title: "Farmacity Puerto Madero",
        image: "/images/listings/farmacity.jpg",
        address: "Av. Alicia Moreau de Justo 240",
        hours: "24 hs",
        mapsQuery: "Farmacity Puerto Madero Alicia Moreau de Justo",
        description: {
          es: "Farmacia 24 hs a pocas cuadras del departamento. Medicamentos, perfumería y artículos esenciales.",
          en: "24-hour pharmacy a few blocks from the apartment. Medicine, toiletries and essentials.",
          pt: "Farmácia 24 hs a poucas quadras do apartamento. Medicamentos, perfumaria e artigos essenciais.",
        },
      },
      {
        title: "Farmacity San Telmo",
        image: "/images/listings/farmacity.jpg",
        address: "Av. Paseo Colón 255",
        mapsQuery: "Farmacity Paseo Colón San Telmo",
        description: {
          es: "Sucursal amplia con atención extendida. Ideal para visitas rápidas y medicamentos de venta libre.",
          en: "A large branch with extended hours. Ideal for quick visits and over-the-counter medication.",
          pt: "Filial ampla com horário estendido. Ideal para visitas rápidas e medicamentos de venda livre.",
        },
      },
      {
        title: "Farmacity Monserrat",
        image: "/images/listings/farmacity.jpg",
        address: "Av. Belgrano 499",
        mapsQuery: "Farmacity Belgrano Monserrat",
        description: {
          es: "En pleno centro histórico. Horario extendido y amplio stock.",
          en: "In the heart of the historic center. Extended hours and wide stock.",
          pt: "No centro histórico. Horário estendido e amplo estoque.",
        },
      },
      {
        title: "Dr. Ahorro",
        image: "/images/listings/farmacity.jpg",
        address: "Av. Independencia 1600",
        mapsQuery: "Dr. Ahorro Independencia Buenos Aires",
        description: {
          es: "Precios económicos y buena disponibilidad de medicamentos de uso común.",
          en: "Budget-friendly prices and good availability of common medicines.",
          pt: "Preços econômicos e boa disponibilidade de medicamentos de uso comum.",
        },
      },
      {
        title: "Farmacia Suizo Argentina",
        image: "/images/listings/farmacity.jpg",
        address: "Chacabuco 402, San Telmo",
        mapsQuery: "Farmacia Suizo Argentina San Telmo",
        description: {
          es: "Farmacia clásica de barrio, atención personalizada.",
          en: "A classic neighborhood pharmacy with personalized service.",
          pt: "Farmácia clássica de bairro, atendimento personalizado.",
        },
      },
    ],
  },

  // --- SUPERMERCADOS ---
  {
    id: "supermercados",
    titleKey: "section.supermercados.title",
    subtitle: {
      es: "Supermercados y autoservicios cerca del departamento.",
      en: "Supermarkets and mini-markets near the apartment.",
      pt: "Supermercados e autosserviços perto do apartamento.",
    },
    items: [
      {
        title: "Coto Puerto Madero",
        image: "/images/listings/coto.jpg",
        address: "Av. Alicia Moreau de Justo 540",
        mapsQuery: "Coto Puerto Madero",
        description: {
          es: "Supermercado grande con todo lo necesario. A pocas cuadras del departamento.",
          en: "Large supermarket with everything you need. A few blocks from the apartment.",
          pt: "Supermercado grande com tudo o que você precisa. A poucas quadras do apartamento.",
        },
      },
      {
        title: "Carrefour Express Puerto Madero",
        image: "/images/listings/carrefour.jpg",
        address: "Puerto Madero",
        mapsQuery: "Carrefour Express Puerto Madero",
        description: {
          es: "Formato de cercanía, ideal para compras rápidas.",
          en: "A small-format store, ideal for quick shopping.",
          pt: "Formato de proximidade, ideal para compras rápidas.",
        },
      },
      {
        title: "Jumbo San Telmo",
        image: "/images/listings/jumbo.jpg",
        address: "Av. San Juan 2550",
        mapsQuery: "Jumbo San Juan Buenos Aires",
        description: {
          es: "Hipermercado con gran variedad de productos importados y frescos.",
          en: "A hypermarket with a wide range of imported and fresh products.",
          pt: "Hipermercado com grande variedade de produtos importados e frescos.",
        },
      },
      {
        title: "Carrefour Perú",
        image: "/images/listings/carrefour.jpg",
        address: "Perú 900, San Telmo",
        mapsQuery: "Carrefour Perú San Telmo",
        description: {
          es: "Supermercado del centro histórico, con todo lo básico.",
          en: "Supermarket in the historic center, with all the basics.",
          pt: "Supermercado do centro histórico, com todo o básico.",
        },
      },
      {
        title: "Día Balcarce",
        image: "/images/listings/coto.jpg",
        address: "Balcarce 1100, San Telmo",
        mapsQuery: "Día Balcarce San Telmo",
        description: {
          es: "Supermercado económico, ideal para compras diarias.",
          en: "A budget supermarket, ideal for daily shopping.",
          pt: "Supermercado econômico, ideal para compras diárias.",
        },
      },
      {
        title: "Mercado de San Telmo",
        image: "/images/listings/san-telmo.jpg",
        address: "Defensa 961, San Telmo",
        mapsQuery: "Mercado de San Telmo Defensa",
        description: {
          es: "Mercado histórico con puestos de frutas, verduras, carnicerías, antigüedades y gastronomía. Experiencia local imperdible.",
          en: "A historic market with fruit, vegetable, butcher, antiques and food stalls. An unmissable local experience.",
          pt: "Mercado histórico com bancas de frutas, verduras, açougues, antiguidades e gastronomia. Experiência local imperdível.",
        },
      },
    ],
  },

  // --- TRANSPORTE ---
  {
    id: "transporte",
    titleKey: "section.transporte.title",
    subtitle: {
      es: "Cómo moverse por Buenos Aires desde Puerto Madero.",
      en: "Getting around Buenos Aires from Puerto Madero.",
      pt: "Como se locomover por Buenos Aires a partir de Puerto Madero.",
    },
    items: [
      {
        title: "Tarjeta SUBE",
        image: "/images/listings/sube.jpg",
        description: {
          es: "Tarjeta recargable para subte, colectivos y trenes. Se compra en kioscos y estaciones.",
          en: "Rechargeable card for subway, buses and trains. Buy at kiosks and stations.",
          pt: "Cartão recarregável para metrô, ônibus e trens. Compre em bancas e estações.",
        },
      },
      {
        title: "Red de Subte — Mapa",
        image: "/images/listings/subte-mapa.jpg",
        description: {
          es: "6 líneas (A, B, C, D, E y H) que conectan el centro con los barrios. Se paga con tarjeta SUBE.",
          en: "6 lines (A, B, C, D, E and H) connecting the centre to the neighbourhoods. Pay with the SUBE card.",
          pt: "6 linhas (A, B, C, D, E e H) conectando o centro aos bairros. Pague com o cartão SUBE.",
        },
      },
      {
        title: "Uber",
        image: "/images/listings/uber-logo.jpg",
        imageKind: "logo",
        description: {
          es: "App de viajes disponible en toda la ciudad. Pago con tarjeta, sin efectivo.",
          en: "Ride-hailing app available throughout the city. Card payment, no cash needed.",
          pt: "App de transporte disponível em toda a cidade. Pagamento com cartão, sem dinheiro.",
        },
      },
      {
        title: "DiDi",
        image: "/images/listings/didi-logo.jpg",
        imageKind: "logo",
        description: {
          es: "Alternativa económica a Uber. App de viajes con tarifas competitivas en Buenos Aires.",
          en: "A budget-friendly Uber alternative. Ride-hailing app with competitive fares in Buenos Aires.",
          pt: "Alternativa econômica ao Uber. App de transporte com tarifas competitivas em Buenos Aires.",
        },
      },
      {
        title: "Taxi",
        image: "https://images.pexels.com/photos/2438327/pexels-photo-2438327.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: {
          es: "Taxis negros y amarillos habilitados. Pedir siempre el uso del taxímetro.",
          en: "Licensed black-and-yellow taxis. Always ask for the meter to be used.",
          pt: "Táxis pretos e amarelos habilitados. Sempre pedir o uso do taxímetro.",
        },
      },
      {
        title: "Aeroparque (AEP)",
        image: "/images/listings/aeroparque.jpeg",
        description: {
          es: "20–25 min. Taxi ≈ USD 15 (en pesos). También Uber y transfers con stand en llegadas.",
          en: "20–25 min. Taxi ≈ USD 15 (in pesos). Also Uber and airport transfers at the arrivals stand.",
          pt: "20–25 min. Táxi ≈ USD 15 (em pesos). Também Uber e transfers no hall de chegada.",
        },
      },
      {
        title: "Ezeiza (EZE)",
        image: "/images/listings/ezeiza.jpg",
        description: {
          es: "30–45 min. Taxi ≈ USD 25 (en pesos). Uber y transfers disponibles antes de la salida.",
          en: "30–45 min. Taxi ≈ USD 25 (in pesos). Uber and transfers available before exit.",
          pt: "30–45 min. Táxi ≈ USD 25 (em pesos). Uber e transfers disponíveis antes da saída.",
        },
      },
    ],
  },

  // --- BUENOS AIRES ---
  {
    id: "buenos-aires",
    titleKey: "section.buenosAires.title",
    subtitle: {
      es: "Lugares imperdibles para conocer la ciudad.",
      en: "Can't-miss places to get to know the city.",
      pt: "Lugares imperdíveis para conhecer a cidade.",
    },
    items: [
      {
        title: "Plaza de Mayo & Casa Rosada",
        image: "/images/listings/casa-rosada.jpg",
        mapsQuery: "Plaza de Mayo Buenos Aires",
        description: {
          es: "El corazón histórico y político de la Argentina. Casa Rosada, Catedral y Cabildo alrededor de la plaza.",
          en: "Argentina's historic and political heart. Casa Rosada, Cathedral and Cabildo around the square.",
          pt: "O coração histórico e político da Argentina. Casa Rosada, Catedral e Cabildo ao redor da praça.",
        },
      },
      {
        title: "Puerto Madero & Puente de la Mujer",
        image: "/images/listings/puente-mujer.jpg",
        mapsQuery: "Puente de la Mujer Puerto Madero",
        description: {
          es: "Paseo frente a los docks, la Fragata Sarmiento y el puente de Calatrava. Restaurantes, bares y la Reserva Ecológica al fondo.",
          en: "A promenade facing the docks, the Sarmiento frigate and the Calatrava bridge. Restaurants, bars and the Ecological Reserve beyond.",
          pt: "Passeio em frente aos docks, a Fragata Sarmiento e a ponte de Calatrava. Restaurantes, bares e a Reserva Ecológica ao fundo.",
        },
      },
      {
        title: "Reserva Ecológica Costanera Sur",
        image: "/images/listings/reserva-ecologica.jpg",
        mapsQuery: "Reserva Ecológica Costanera Sur",
        description: {
          es: "350 hectáreas de humedal frente al Río de la Plata. Ideal para caminar, correr o andar en bici. Entrada gratuita.",
          en: "350 hectares of wetland facing the Río de la Plata. Ideal for walking, running or biking. Free entry.",
          pt: "350 hectares de zona úmida em frente ao Rio da Prata. Ideal para caminhar, correr ou andar de bike. Entrada gratuita.",
        },
      },
      {
        title: "Mercado de San Telmo",
        image: "/images/listings/san-telmo.jpg",
        mapsQuery: "Mercado de San Telmo",
        description: {
          es: "Mercado histórico de 1897. Anticuarios, puestos de comida y la feria de los domingos sobre Defensa.",
          en: "A historic market from 1897. Antique dealers, food stalls and the Sunday fair along Defensa street.",
          pt: "Mercado histórico de 1897. Antiquários, bancas de comida e a feira de domingo pela rua Defensa.",
        },
      },
      {
        title: "Caminito & La Boca",
        image: "/images/listings/caminito.jpg",
        mapsQuery: "Caminito La Boca Buenos Aires",
        description: {
          es: "Calle museo con casas de colores, tango en la calle y el Museo Quinquela Martín. Visitar solo de día.",
          en: "An open-air museum street with colorful houses, street tango and the Quinquela Martín Museum. Visit only during the day.",
          pt: "Rua-museu com casas coloridas, tango na rua e o Museu Quinquela Martín. Visitar somente durante o dia.",
        },
      },
      {
        title: "Teatro Colón",
        image: "/images/listings/teatro-colon.jpg",
        mapsQuery: "Teatro Colón Buenos Aires",
        description: {
          es: "Uno de los mejores teatros de ópera del mundo. Visitas guiadas diarias y temporada de ópera, ballet y conciertos.",
          en: "One of the world's finest opera houses. Daily guided tours and a season of opera, ballet and concerts.",
          pt: "Um dos melhores teatros de ópera do mundo. Visitas guiadas diárias e temporada de ópera, balé e concertos.",
        },
      },
      {
        title: "Cementerio de la Recoleta",
        image: "https://images.pexels.com/photos/33583570/pexels-photo-33583570.jpeg?auto=compress&cs=tinysrgb&w=800",
        mapsQuery: "Cementerio de la Recoleta",
        description: {
          es: "Mausoleos centenarios, esculturas notables y la tumba de Eva Perón. Uno de los cementerios más bellos del mundo.",
          en: "Century-old mausoleums, notable sculptures and Eva Perón's tomb. One of the most beautiful cemeteries in the world.",
          pt: "Mausoléus centenários, esculturas notáveis e o túmulo de Eva Perón. Um dos cemitérios mais bonitos do mundo.",
        },
      },
      {
        title: "MALBA",
        image: "/images/listings/malba.jpg",
        mapsQuery: "MALBA Buenos Aires",
        description: {
          es: "Museo de Arte Latinoamericano de Buenos Aires. Colección de Frida Kahlo, Xul Solar, Berni y muestras temporales.",
          en: "Museum of Latin American Art of Buenos Aires. Works by Frida Kahlo, Xul Solar, Berni and rotating exhibitions.",
          pt: "Museu de Arte Latino-Americana de Buenos Aires. Obras de Frida Kahlo, Xul Solar, Berni e mostras temporárias.",
        },
      },
    ],
  },

  // --- FÚTBOL ---
  {
    id: "futbol",
    titleKey: "section.futbol.title",
    subtitle: {
      es: "Viví el fútbol argentino en los estadios más emblemáticos.",
      en: "Experience Argentine football in its most iconic stadiums.",
      pt: "Viva o futebol argentino nos estádios mais emblemáticos.",
    },
    items: [
      {
        title: "River Plate Experience",
        image: "/images/listings/river-experience.jpg",
        imageKind: "logo",
        mapsQuery: "Estadio Monumental River Plate",
        description: {
          es: "Entradas en plateas con excelentes ubicaciones para partidos de River y la Selección Argentina en el Estadio Monumental.",
          en: "Premium seats for River Plate and Argentina national team matches at the Monumental Stadium.",
          pt: "Ingressos em tribunas com ótimas localizações para jogos do River e da Seleção Argentina no Estádio Monumental.",
        },
      },
      {
        title: "La Bombonera — Tour",
        image: "/images/listings/bombonera.jpg",
        address: "Brandsen 805, La Boca",
        mapsQuery: "La Bombonera Boca Juniors",
        description: {
          es: "Visita guiada al mítico estadio de Boca Juniors. Incluye Museo de la Pasión Boquense y acceso a la cancha.",
          en: "Guided tour of Boca Juniors' legendary stadium. Includes the Pasión Boquense museum and pitch access.",
          pt: "Visita guiada ao lendário estádio do Boca Juniors. Inclui o Museu da Pasión Boquense e acesso ao campo.",
        },
      },
      {
        title: "Museo River",
        image: "/images/listings/monumental.jpg",
        mapsQuery: "Museo River Plate Monumental",
        description: {
          es: "Tour por el Estadio Monumental con historia del club, vestuarios y acceso al campo de juego.",
          en: "Tour of the Monumental Stadium with club history, locker rooms and pitch access.",
          pt: "Tour pelo Estádio Monumental com história do clube, vestiários e acesso ao campo.",
        },
      },
    ],
  },
];

export function getSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function mapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
