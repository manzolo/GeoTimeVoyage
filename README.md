# 🌍 GeoTime Voyage

Un viaggio interattivo in **3D** attraverso i **4,6 miliardi di anni** di storia della Terra.
Scorri la timeline e guarda il pianeta trasformarsi: deriva dei continenti, glaciazioni,
livello del mare, comparsa della vita, estinzioni di massa, impatti di asteroidi.

Costruito con **React + Three.js (@react-three/fiber + drei)**, **TypeScript**, shader
personalizzati per l'atmosfera e texture della Terra **generate proceduralmente** (nessun
asset esterno da scaricare).

![tech](https://img.shields.io/badge/React-18-61dafb) ![tech](https://img.shields.io/badge/Three.js-r169-black) ![tech](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Funzionalità

- 🌐 **Terra 3D** con texture dinamiche (continenti, oceani, ghiacci, vegetazione) che cambiano per epoca
- ☀️ Illuminazione realistica con *faint young Sun* (Sole più debole nel passato)
- 🕰️ **Timeline** trascinabile con eoni, ere ed eventi cliccabili (scala non lineare)
- 🌋 **Overlay** di eventi geologici e biologici attivabili, con marker sul globo e pannello informativo
- 📈 Statistiche per epoca: **temperatura, CO₂, livello del mare, biodiversità**
- ⏩ **Accelerazione Temporale** per vedere tutta la storia in pochi minuti
- 🌙 Luna che cambia distanza e dimensione nel tempo, sfondo stellato, atmosfera variabile
- 📷 **Screenshot** dell'epoca corrente
- 🇮🇹 / 🇬🇧 Interfaccia in italiano e inglese

## 🚀 Avvio rapido (Docker + Make)

```bash
make build    # costruisce le immagini Docker
make up       # avvia lo sviluppo → http://localhost:5173
make down     # ferma tutto
```

Altri comandi utili:

```bash
make help        # elenco di tutti i comandi
make up-d        # sviluppo in background
make logs        # log del container
make preview     # build di produzione servita da nginx → http://localhost:8080
make build-static  # genera ./dist per il deploy manuale
make clean       # rimuove container, volumi e build
```

### Senza Docker

```bash
make install   # oppure: npm install
npm run dev
```

## 📦 Deploy su GitHub Pages

Il workflow `.github/workflows/deploy.yml` builda e pubblica automaticamente a ogni push su `main`.

1. Crea un repository chiamato **`GeoTimeVoyage`** (il nome del repo viene usato come `base` Vite).
2. In **Settings → Pages → Build and deployment**, imposta *Source* = **GitHub Actions**.
3. Fai push su `main`: il sito sarà su `https://<utente>.github.io/GeoTimeVoyage/`.

> Se usi un nome di repo diverso, il workflow lo rileva da solo (`VITE_BASE=/<nome-repo>/`).
> Per il deploy manuale: `make build-static` e pubblica la cartella `dist/`.

## 🗂️ Struttura

```
src/
├── data/timeline.ts      # eoni, ere, eventi e curve paleoclimatiche
├── utils/
│   ├── noise.ts          # value-noise 3D / fbm
│   └── earthTexture.ts   # texture procedurale della Terra per epoca
├── scene/                # Three.js: Globe, Atmosphere, Moon, EventMarkers, Scene
├── ui/                   # Timeline, Hud (controlli+statistiche), InfoPanel
├── state/store.ts        # store globale leggero (useSyncExternalStore)
└── i18n.ts               # stringhe IT/EN
```

## 🔬 Note scientifiche

I dati seguono la scala dei tempi ICS 2023 e ricostruzioni paleoclimatiche semplificate
(Scotese, Royer et al., USGS, NASA). I continenti sono **stilizzati** (generati da noise):
le forme non riproducono mappe paleogeografiche esatte, ma rendono la deriva, l'emersione
e la copertura di ghiaccio in modo qualitativamente coerente con l'epoca.

## 🛠️ Roadmap (idee)

- Morphing su ricostruzioni paleogeografiche reali (PALEOMAP/GPlates)
- Split view per confrontare due epoche
- Click su una regione → scheda locale dell'epoca
- Effetti particellari per impatti ed eruzioni
