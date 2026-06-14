// Dati del tempo geologico — Ma = milioni di anni fa.
// Riferimenti: International Commission on Stratigraphy (ICS 2023),
// USGS, NASA, ricostruzioni paleoclimatiche (Scotese, Royer et al.).

export const TIMELINE_START_MA = 4600;

export interface Bilingual {
  it: string;
  en: string;
}

export interface Eon {
  id: string;
  name: Bilingual;
  start: number; // Ma
  end: number; // Ma
  color: string;
  eras: Era[];
}

export interface Era {
  id: string;
  name: Bilingual;
  start: number;
  end: number;
  color: string;
}

export type EventCategory = 'geo' | 'bio';

export interface GeoEvent {
  id: string;
  ma: number;
  category: EventCategory;
  title: Bilingual;
  description: Bilingual;
  consequences: Bilingual;
  /** Posizione del marker sul globo (gradi). */
  lat: number;
  lon: number;
  fossils?: Bilingual;
}

export const EONS: Eon[] = [
  {
    id: 'hadean',
    name: { it: 'Adeano', en: 'Hadean' },
    start: 4600,
    end: 4031,
    color: '#c0392b',
    eras: [],
  },
  {
    id: 'archean',
    name: { it: 'Archeano', en: 'Archean' },
    start: 4031,
    end: 2500,
    color: '#d35400',
    eras: [],
  },
  {
    id: 'proterozoic',
    name: { it: 'Proterozoico', en: 'Proterozoic' },
    start: 2500,
    end: 538.8,
    color: '#b8860b',
    eras: [],
  },
  {
    id: 'phanerozoic',
    name: { it: 'Fanerozoico', en: 'Phanerozoic' },
    start: 538.8,
    end: 0,
    color: '#2e86c1',
    eras: [
      { id: 'paleozoic', name: { it: 'Paleozoico', en: 'Paleozoic' }, start: 538.8, end: 251.9, color: '#5dade2' },
      { id: 'mesozoic', name: { it: 'Mesozoico', en: 'Mesozoic' }, start: 251.9, end: 66, color: '#48c9b0' },
      { id: 'cenozoic', name: { it: 'Cenozoico', en: 'Cenozoic' }, start: 66, end: 0, color: '#f4d03f' },
    ],
  },
];

export const EVENTS: GeoEvent[] = [
  {
    id: 'formation',
    ma: 4540,
    category: 'geo',
    title: { it: 'Formazione della Terra', en: 'Formation of Earth' },
    description: {
      it: 'Accrescimento del pianeta dal disco protoplanetario attorno al giovane Sole. Superficie fusa, oceano di magma.',
      en: 'The planet accretes from the protoplanetary disk around the young Sun. A molten magma-ocean surface.',
    },
    consequences: {
      it: 'Differenziazione del nucleo metallico e del mantello; nascita del campo magnetico primordiale.',
      en: 'Differentiation of the metallic core and mantle; birth of the primordial magnetic field.',
    },
    lat: 0,
    lon: 0,
  },
  {
    id: 'moon',
    ma: 4510,
    category: 'geo',
    title: { it: 'Impatto di Theia → Luna', en: 'Theia impact → the Moon' },
    description: {
      it: "Un protopianeta delle dimensioni di Marte (Theia) colpisce la Terra. I detriti in orbita formano la Luna, allora vicinissima.",
      en: 'A Mars-sized protoplanet (Theia) strikes Earth. Orbiting debris coalesces into the Moon, then very close.',
    },
    consequences: {
      it: "Inclinazione dell'asse, maree intense, giorno di poche ore. La Luna si allontana ~3,8 cm/anno.",
      en: 'Axial tilt, intense tides, a few-hour day. The Moon recedes ~3.8 cm/year.',
    },
    lat: 20,
    lon: 140,
  },
  {
    id: 'oceans',
    ma: 4400,
    category: 'geo',
    title: { it: 'Primi oceani', en: 'First oceans' },
    description: {
      it: 'Raffreddamento della crosta e condensazione del vapore: compaiono i primi oceani liquidi (zirconi di Jack Hills).',
      en: 'Crust cools and vapor condenses: the first liquid oceans appear (Jack Hills zircons).',
    },
    consequences: {
      it: "Ambiente acquatico stabile, presupposto per la chimica prebiotica.",
      en: 'A stable aquatic environment, a prerequisite for prebiotic chemistry.',
    },
    lat: -10,
    lon: 200,
  },
  {
    id: 'life',
    ma: 3800,
    category: 'bio',
    title: { it: 'Origine della vita', en: 'Origin of life' },
    description: {
      it: 'Comparsa dei primi procarioti (LUCA), probabilmente presso sorgenti idrotermali oceaniche.',
      en: 'First prokaryotes (LUCA) appear, likely at oceanic hydrothermal vents.',
    },
    consequences: {
      it: 'Inizio del metabolismo biologico e del ciclo del carbonio organico.',
      en: 'Onset of biological metabolism and the organic carbon cycle.',
    },
    fossils: { it: 'Microfossili di Isua (Groenlandia)', en: 'Isua microfossils (Greenland)' },
    lat: 5,
    lon: 300,
  },
  {
    id: 'photosynthesis',
    ma: 3500,
    category: 'bio',
    title: { it: 'Prima fotosintesi', en: 'First photosynthesis' },
    description: {
      it: 'I cianobatteri costruiscono stromatoliti e iniziano la fotosintesi ossigenica.',
      en: 'Cyanobacteria build stromatolites and begin oxygenic photosynthesis.',
    },
    consequences: {
      it: "Lenta produzione di ossigeno, base della futura atmosfera respirabile.",
      en: 'Slow oxygen production, the basis of the future breathable atmosphere.',
    },
    fossils: { it: 'Stromatoliti di Pilbara (Australia)', en: 'Pilbara stromatolites (Australia)' },
    lat: -22,
    lon: 118,
  },
  {
    id: 'goe',
    ma: 2400,
    category: 'geo',
    title: { it: 'Grande Ossidazione (GOE)', en: 'Great Oxidation Event' },
    description: {
      it: "L'ossigeno si accumula nell'atmosfera, ossidando il ferro disciolto negli oceani (banded iron formations).",
      en: 'Oxygen accumulates in the atmosphere, oxidizing iron in the oceans (banded iron formations).',
    },
    consequences: {
      it: 'Prima estinzione di massa (per gli anaerobi) e possibile glaciazione Uroniana.',
      en: 'First mass extinction (of anaerobes) and a possible Huronian glaciation.',
    },
    lat: 50,
    lon: 90,
  },
  {
    id: 'snowball',
    ma: 700,
    category: 'geo',
    title: { it: 'Terra a palla di neve', en: 'Snowball Earth' },
    description: {
      it: 'Durante il Criogeniano i ghiacci raggiungono i tropici: il pianeta è quasi interamente congelato.',
      en: 'During the Cryogenian, ice reaches the tropics: the planet is almost entirely frozen.',
    },
    consequences: {
      it: "Forte pressione selettiva; il disgelo precede l'esplosione della vita complessa.",
      en: 'Strong selective pressure; the thaw precedes the explosion of complex life.',
    },
    lat: 0,
    lon: 180,
  },
  {
    id: 'ediacara',
    ma: 575,
    category: 'bio',
    title: { it: 'Fauna di Ediacara', en: 'Ediacaran biota' },
    description: {
      it: 'Primi organismi pluricellulari macroscopici a corpo molle.',
      en: 'First macroscopic, soft-bodied multicellular organisms.',
    },
    consequences: {
      it: "Sperimentazione dei primi piani corporei animali.",
      en: 'First experiments with animal body plans.',
    },
    fossils: { it: 'Dickinsonia, Charnia', en: 'Dickinsonia, Charnia' },
    lat: -30,
    lon: 138,
  },
  {
    id: 'cambrian',
    ma: 538,
    category: 'bio',
    title: { it: 'Esplosione Cambriana', en: 'Cambrian explosion' },
    description: {
      it: 'In pochi milioni di anni compaiono quasi tutti i phyla animali moderni, con esoscheletri e occhi.',
      en: 'In a few million years almost all modern animal phyla appear, with exoskeletons and eyes.',
    },
    consequences: {
      it: "Inizio di reti trofiche complesse e della predazione.",
      en: 'Onset of complex food webs and predation.',
    },
    fossils: { it: 'Anomalocaris, trilobiti (Burgess Shale)', en: 'Anomalocaris, trilobites (Burgess Shale)' },
    lat: 51,
    lon: -116,
  },
  {
    id: 'land-plants',
    ma: 470,
    category: 'bio',
    title: { it: 'Colonizzazione della terraferma', en: 'Colonization of land' },
    description: {
      it: 'Le prime piante e poi gli artropodi colonizzano i continenti.',
      en: 'The first plants and then arthropods colonize the continents.',
    },
    consequences: {
      it: "Formazione dei suoli, calo della CO₂, nuovi ecosistemi terrestri.",
      en: 'Soil formation, CO₂ drawdown, new terrestrial ecosystems.',
    },
    lat: 40,
    lon: 10,
  },
  {
    id: 'ordovician-ext',
    ma: 444,
    category: 'bio',
    title: { it: 'Estinzione Ordoviciano-Siluriano', en: 'Ordovician–Silurian extinction' },
    description: {
      it: "Glaciazione rapida e calo del livello del mare: ~85% delle specie marine scompare.",
      en: 'Rapid glaciation and sea-level fall: ~85% of marine species vanish.',
    },
    consequences: {
      it: 'Prima delle "cinque grandi" estinzioni di massa.',
      en: 'The first of the "Big Five" mass extinctions.',
    },
    lat: -60,
    lon: -60,
  },
  {
    id: 'carboniferous',
    ma: 320,
    category: 'bio',
    title: { it: 'Foreste del Carbonifero', en: 'Carboniferous forests' },
    description: {
      it: 'Immense foreste di felci arboree; ossigeno fino al 35%, insetti giganti.',
      en: 'Vast tree-fern forests; oxygen up to 35%, giant insects.',
    },
    consequences: {
      it: 'Accumulo del carbone odierno; raffreddamento globale.',
      en: "Today's coal deposits accumulate; global cooling.",
    },
    fossils: { it: 'Meganeura, Lepidodendron', en: 'Meganeura, Lepidodendron' },
    lat: 0,
    lon: 20,
  },
  {
    id: 'pangea',
    ma: 300,
    category: 'geo',
    title: { it: 'Supercontinente Pangea', en: 'Pangea supercontinent' },
    description: {
      it: 'Tutte le terre emerse si fondono in un unico supercontinente circondato dal Panthalassa.',
      en: 'All landmasses merge into a single supercontinent surrounded by Panthalassa.',
    },
    consequences: {
      it: 'Clima continentale estremo, vasti deserti interni.',
      en: 'Extreme continental climate, vast interior deserts.',
    },
    lat: 0,
    lon: 0,
  },
  {
    id: 'permian-ext',
    ma: 252,
    category: 'geo',
    title: { it: 'Grande Moria (P-T)', en: 'The Great Dying (P–T)' },
    description: {
      it: 'I Trappi Siberiani scatenano la più grave estinzione di sempre: ~96% delle specie marine.',
      en: 'The Siberian Traps trigger the worst extinction ever: ~96% of marine species.',
    },
    consequences: {
      it: 'Riscaldamento estremo, anossia oceanica; reset della biosfera.',
      en: 'Extreme warming, ocean anoxia; reset of the biosphere.',
    },
    lat: 65,
    lon: 100,
  },
  {
    id: 'dinosaurs',
    ma: 230,
    category: 'bio',
    title: { it: 'Comparsa dei dinosauri', en: 'Rise of the dinosaurs' },
    description: {
      it: 'Dopo l\'estinzione P-T i dinosauri si diversificano e dominano gli ecosistemi terrestri.',
      en: 'After the P–T extinction, dinosaurs diversify and dominate terrestrial ecosystems.',
    },
    consequences: {
      it: 'Dominio per oltre 160 milioni di anni.',
      en: 'Dominance for over 160 million years.',
    },
    fossils: { it: 'Eoraptor, Herrerasaurus', en: 'Eoraptor, Herrerasaurus' },
    lat: -31,
    lon: -64,
  },
  {
    id: 'birds',
    ma: 150,
    category: 'bio',
    title: { it: 'Primi uccelli', en: 'First birds' },
    description: {
      it: 'Archaeopteryx documenta la transizione dai dinosauri teropodi agli uccelli.',
      en: 'Archaeopteryx documents the transition from theropod dinosaurs to birds.',
    },
    consequences: {
      it: "Conquista dell'aria da parte dei vertebrati piumati.",
      en: 'Feathered vertebrates conquer the air.',
    },
    fossils: { it: 'Archaeopteryx (Solnhofen)', en: 'Archaeopteryx (Solnhofen)' },
    lat: 49,
    lon: 11,
  },
  {
    id: 'chicxulub',
    ma: 66,
    category: 'geo',
    title: { it: 'Impatto di Chicxulub (K-Pg)', en: 'Chicxulub impact (K–Pg)' },
    description: {
      it: 'Un asteroide di ~10 km colpisce lo Yucatán; in concomitanza con i Trappi del Deccan provoca l\'estinzione dei dinosauri non aviari.',
      en: 'A ~10 km asteroid strikes the Yucatán; together with the Deccan Traps it ends the non-avian dinosaurs.',
    },
    consequences: {
      it: 'Inverno da impatto; ascesa dei mammiferi.',
      en: 'Impact winter; the rise of mammals.',
    },
    fossils: { it: 'Strato di iridio K-Pg', en: 'K–Pg iridium layer' },
    lat: 21,
    lon: -89,
  },
  {
    id: 'petm',
    ma: 56,
    category: 'geo',
    title: { it: 'Massimo Termico (PETM)', en: 'Thermal Maximum (PETM)' },
    description: {
      it: 'Rapido rilascio di carbonio: +5/8 °C globali in pochi millenni.',
      en: 'Rapid carbon release: +5/8 °C globally within a few millennia.',
    },
    consequences: {
      it: 'Acidificazione oceanica; analogo del riscaldamento attuale.',
      en: 'Ocean acidification; an analogue of present-day warming.',
    },
    lat: 80,
    lon: 0,
  },
  {
    id: 'antarctic-ice',
    ma: 34,
    category: 'geo',
    title: { it: 'Glaciazione antartica', en: 'Antarctic glaciation' },
    description: {
      it: "L'Antartide si isola e si ricopre di ghiaccio permanente.",
      en: 'Antarctica becomes isolated and covered by permanent ice.',
    },
    consequences: {
      it: "Raffreddamento globale; nascita della circolazione circumpolare.",
      en: 'Global cooling; birth of circumpolar circulation.',
    },
    lat: -82,
    lon: 0,
  },
  {
    id: 'hominids',
    ma: 7,
    category: 'bio',
    title: { it: 'Primi ominidi', en: 'First hominids' },
    description: {
      it: 'In Africa compaiono i primi ominidi bipedi (Sahelanthropus).',
      en: 'The first bipedal hominids appear in Africa (Sahelanthropus).',
    },
    consequences: {
      it: 'Inizio della linea evolutiva umana.',
      en: 'Start of the human evolutionary lineage.',
    },
    fossils: { it: 'Sahelanthropus, Ardipithecus', en: 'Sahelanthropus, Ardipithecus' },
    lat: 15,
    lon: 18,
  },
  {
    id: 'sapiens',
    ma: 0.3,
    category: 'bio',
    title: { it: 'Homo sapiens', en: 'Homo sapiens' },
    description: {
      it: "Comparsa della nostra specie in Africa; espansione globale e civiltà.",
      en: 'Our species appears in Africa; global expansion and civilization.',
    },
    consequences: {
      it: 'Antropocene: impatto umano sul sistema Terra.',
      en: 'Anthropocene: human impact on the Earth system.',
    },
    fossils: { it: 'Jebel Irhoud (Marocco)', en: 'Jebel Irhoud (Morocco)' },
    lat: 32,
    lon: -8,
  },
];

// ── Curve paleoclimatiche (keyframe in Ma) ──────────────────
// Valori semplificati per la visualizzazione, non simulazioni.
interface KF {
  ma: number;
  v: number;
}

function interp(kfs: KF[], ma: number): number {
  if (ma >= kfs[0].ma) return kfs[0].v;
  if (ma <= kfs[kfs.length - 1].ma) return kfs[kfs.length - 1].v;
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i];
    const b = kfs[i + 1];
    if (ma <= a.ma && ma >= b.ma) {
      const t = (a.ma - ma) / (a.ma - b.ma);
      return a.v + (b.v - a.v) * t;
    }
  }
  return kfs[kfs.length - 1].v;
}

// Temperatura media globale (°C)
const TEMP: KF[] = [
  { ma: 4600, v: 200 }, { ma: 4000, v: 60 }, { ma: 3000, v: 35 }, { ma: 2400, v: 12 },
  { ma: 700, v: -10 }, { ma: 538, v: 22 }, { ma: 444, v: 14 }, { ma: 300, v: 12 },
  { ma: 252, v: 28 }, { ma: 66, v: 26 }, { ma: 56, v: 28 }, { ma: 34, v: 18 },
  { ma: 2.6, v: 13 }, { ma: 0, v: 15 },
];

// CO₂ atmosferica (ppm, scala log nella mente)
const CO2: KF[] = [
  { ma: 4600, v: 100000 }, { ma: 3500, v: 30000 }, { ma: 2400, v: 4000 },
  { ma: 538, v: 4500 }, { ma: 444, v: 4000 }, { ma: 300, v: 300 },
  { ma: 252, v: 2000 }, { ma: 200, v: 1800 }, { ma: 66, v: 1000 },
  { ma: 34, v: 600 }, { ma: 2.6, v: 280 }, { ma: 0, v: 420 },
];

// Livello del mare relativo (m rispetto a oggi)
const SEALEVEL: KF[] = [
  { ma: 600, v: -60 }, { ma: 538, v: 60 }, { ma: 444, v: 120 }, { ma: 300, v: -40 },
  { ma: 252, v: -20 }, { ma: 200, v: 40 }, { ma: 90, v: 250 }, { ma: 66, v: 100 },
  { ma: 34, v: 20 }, { ma: 2.6, v: -10 }, { ma: 0, v: 0 },
];

// Biodiversità relativa 0..1
const BIODIV: KF[] = [
  { ma: 4600, v: 0 }, { ma: 3800, v: 0.02 }, { ma: 2400, v: 0.05 }, { ma: 575, v: 0.12 },
  { ma: 538, v: 0.4 }, { ma: 444, v: 0.35 }, { ma: 320, v: 0.55 }, { ma: 252, v: 0.08 },
  { ma: 200, v: 0.4 }, { ma: 66, v: 0.45 }, { ma: 34, v: 0.7 }, { ma: 0, v: 1 },
];

export interface ClimateSnapshot {
  temperature: number;
  co2: number;
  seaLevel: number;
  biodiversity: number;
}

export function climateAt(ma: number): ClimateSnapshot {
  return {
    temperature: interp(TEMP, ma),
    co2: interp(CO2, ma),
    seaLevel: interp(SEALEVEL, ma),
    biodiversity: interp(BIODIV, ma),
  };
}

/** Restituisce eone ed era correnti per un dato Ma. */
export function periodAt(ma: number): { eon: Eon; era?: Era } {
  const eon = EONS.find((e) => ma <= e.start && ma >= e.end) ?? EONS[0];
  const era = eon.eras.find((er) => ma <= er.start && ma >= er.end);
  return { eon, era };
}

export function formatAge(ma: number, lang: 'it' | 'en'): string {
  if (ma >= 1000) return `${(ma / 1000).toFixed(2)} ${lang === 'it' ? 'mld di anni fa' : 'Ga'}`;
  if (ma >= 1) return `${ma.toFixed(ma < 10 ? 1 : 0)} ${lang === 'it' ? 'mln di anni fa' : 'Ma'}`;
  const ka = Math.round(ma * 1000);
  return `${ka} ${lang === 'it' ? 'mila anni fa' : 'ka'}`;
}
