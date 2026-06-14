import type { Lang } from './state/store';

type Dict = Record<string, { it: string; en: string }>;

const STRINGS: Dict = {
  title: { it: 'GeoTime Voyage', en: 'GeoTime Voyage' },
  subtitle: {
    it: 'Un viaggio nel tempo geologico della Terra',
    en: "A journey through Earth's geological time",
  },
  play: { it: 'Accelera il tempo', en: 'Accelerate time' },
  pause: { it: 'Pausa', en: 'Pause' },
  layers: { it: 'Layer', en: 'Layers' },
  geoEvents: { it: 'Eventi geologici', en: 'Geological events' },
  bioEvents: { it: 'Eventi biologici', en: 'Biological events' },
  clouds: { it: 'Nuvole', en: 'Clouds' },
  temperature: { it: 'Temperatura', en: 'Temperature' },
  co2: { it: 'CO₂', en: 'CO₂' },
  seaLevel: { it: 'Livello del mare', en: 'Sea level' },
  biodiversity: { it: 'Biodiversità', en: 'Biodiversity' },
  eon: { it: 'Eone', en: 'Eon' },
  era: { it: 'Era', en: 'Era' },
  consequences: { it: 'Conseguenze', en: 'Consequences' },
  fossils: { it: 'Fossili', en: 'Fossils' },
  sources: { it: 'Fonti', en: 'Sources' },
  credits: { it: 'Crediti dati', en: 'Data credits' },
  autoOpened: { it: 'Apertura automatica', en: 'Auto-opened' },
  close: { it: 'Chiudi', en: 'Close' },
  screenshot: { it: 'Fotografa epoca', en: 'Capture epoch' },
  speed: { it: 'Velocità', en: 'Speed' },
  hint: {
    it: 'Trascina la timeline o ruota il globo · clicca i marker',
    en: 'Drag the timeline or rotate the globe · click the markers',
  },
  loading: { it: 'Avvio del viaggio…', en: 'Starting the voyage…' },
};

export function t(key: keyof typeof STRINGS | string, lang: Lang): string {
  const e = STRINGS[key];
  return e ? e[lang] : key;
}
