// Fonti e crediti per gli eventi. Riferimenti a istituzioni e voci
// enciclopediche autorevoli (USGS, NASA, NOAA, Smithsonian, ICS, Wikipedia).

export interface Source {
  label: string;
  url: string;
}

export const SOURCES: Record<string, Source[]> = {
  formation: [
    { label: 'NASA — Formation of Earth', url: 'https://science.nasa.gov/earth/' },
    { label: 'Wikipedia — History of Earth', url: 'https://en.wikipedia.org/wiki/History_of_Earth' },
  ],
  moon: [
    { label: 'NASA — Moon formation', url: 'https://science.nasa.gov/moon/moon-formation/' },
    { label: 'Wikipedia — Giant-impact hypothesis', url: 'https://en.wikipedia.org/wiki/Giant-impact_hypothesis' },
  ],
  oceans: [
    { label: 'Wikipedia — Jack Hills zircon', url: 'https://en.wikipedia.org/wiki/Jack_Hills' },
    { label: 'Wikipedia — Origin of water on Earth', url: 'https://en.wikipedia.org/wiki/Origin_of_water_on_Earth' },
  ],
  life: [
    { label: 'NASA Astrobiology', url: 'https://astrobiology.nasa.gov/' },
    { label: 'Wikipedia — Abiogenesis', url: 'https://en.wikipedia.org/wiki/Abiogenesis' },
  ],
  photosynthesis: [
    { label: 'Wikipedia — Stromatolite', url: 'https://en.wikipedia.org/wiki/Stromatolite' },
    { label: 'Wikipedia — Cyanobacteria', url: 'https://en.wikipedia.org/wiki/Cyanobacteria' },
  ],
  goe: [
    { label: 'Wikipedia — Great Oxidation Event', url: 'https://en.wikipedia.org/wiki/Great_Oxidation_Event' },
    { label: 'Wikipedia — Banded iron formation', url: 'https://en.wikipedia.org/wiki/Banded_iron_formation' },
  ],
  snowball: [
    { label: 'Wikipedia — Snowball Earth', url: 'https://en.wikipedia.org/wiki/Snowball_Earth' },
    { label: 'Wikipedia — Cryogenian', url: 'https://en.wikipedia.org/wiki/Cryogenian' },
  ],
  ediacara: [
    { label: 'Wikipedia — Ediacaran biota', url: 'https://en.wikipedia.org/wiki/Ediacaran_biota' },
  ],
  cambrian: [
    { label: 'Smithsonian — Burgess Shale', url: 'https://naturalhistory.si.edu/education/teaching-resources/paleontology/burgess-shale' },
    { label: 'Wikipedia — Cambrian explosion', url: 'https://en.wikipedia.org/wiki/Cambrian_explosion' },
  ],
  'land-plants': [
    { label: 'Wikipedia — Evolutionary history of plants', url: 'https://en.wikipedia.org/wiki/Evolutionary_history_of_plants' },
  ],
  'ordovician-ext': [
    { label: 'Wikipedia — Late Ordovician mass extinction', url: 'https://en.wikipedia.org/wiki/Late_Ordovician_mass_extinction' },
  ],
  carboniferous: [
    { label: 'USGS — Coal & the Carboniferous', url: 'https://www.usgs.gov/centers/eastern-energy-resources-science-center' },
    { label: 'Wikipedia — Carboniferous', url: 'https://en.wikipedia.org/wiki/Carboniferous' },
  ],
  pangea: [
    { label: 'USGS — This Dynamic Earth', url: 'https://pubs.usgs.gov/gip/dynamic/dynamic.html' },
    { label: 'Wikipedia — Pangaea', url: 'https://en.wikipedia.org/wiki/Pangaea' },
  ],
  'permian-ext': [
    { label: 'Wikipedia — Permian–Triassic extinction', url: 'https://en.wikipedia.org/wiki/Permian%E2%80%93Triassic_extinction_event' },
    { label: 'Wikipedia — Siberian Traps', url: 'https://en.wikipedia.org/wiki/Siberian_Traps' },
  ],
  dinosaurs: [
    { label: 'Wikipedia — Evolution of dinosaurs', url: 'https://en.wikipedia.org/wiki/Evolution_of_dinosaurs' },
  ],
  birds: [
    { label: 'Wikipedia — Archaeopteryx', url: 'https://en.wikipedia.org/wiki/Archaeopteryx' },
  ],
  chicxulub: [
    { label: 'NASA — Chicxulub impact', url: 'https://www.nasa.gov/' },
    { label: 'Wikipedia — Chicxulub crater', url: 'https://en.wikipedia.org/wiki/Chicxulub_crater' },
  ],
  petm: [
    { label: 'NOAA — Paleoclimate', url: 'https://www.ncei.noaa.gov/products/paleoclimatology' },
    { label: 'Wikipedia — PETM', url: 'https://en.wikipedia.org/wiki/Paleocene%E2%80%93Eocene_Thermal_Maximum' },
  ],
  'antarctic-ice': [
    { label: 'Wikipedia — Eocene–Oligocene transition', url: 'https://en.wikipedia.org/wiki/Eocene%E2%80%93Oligocene_extinction_event' },
  ],
  hominids: [
    { label: 'Smithsonian — Human Origins', url: 'https://humanorigins.si.edu/' },
    { label: 'Wikipedia — Sahelanthropus', url: 'https://en.wikipedia.org/wiki/Sahelanthropus' },
  ],
  sapiens: [
    { label: 'Smithsonian — Homo sapiens', url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens' },
    { label: 'Wikipedia — Jebel Irhoud', url: 'https://en.wikipedia.org/wiki/Jebel_Irhoud' },
  ],
};

// Crediti generali sui dati usati in tutta l'applicazione.
export const GLOBAL_CREDITS: Source[] = [
  { label: 'ICS — International Chronostratigraphic Chart 2023', url: 'https://stratigraphy.org/chart' },
  { label: 'USGS — Geologic Time', url: 'https://www.usgs.gov/' },
  { label: 'NASA — Earth & Solar System', url: 'https://science.nasa.gov/earth/' },
  { label: 'Scotese — PALEOMAP Project', url: 'https://www.scotese.com/' },
];
