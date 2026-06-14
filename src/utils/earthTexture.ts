// Generazione procedurale della texture equirettangolare della Terra
// in funzione dell'epoca (Ma). Niente asset esterni: continenti, oceani,
// ghiacci e vegetazione vengono calcolati dal value-noise 3D campionato
// sulla sfera, così la mappa è senza cuciture e cambia nel tempo.

import { climateAt } from '../data/timeline';
import { fbm } from './noise';

const W = 512;
const H = 256;

function clamp(v: number, lo = 0, hi = 1) {
  return Math.min(hi, Math.max(lo, v));
}
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function gauss(x: number, mu: number, sigma: number) {
  const d = (x - mu) / sigma;
  return Math.exp(-0.5 * d * d);
}

// ── cache: quantizziamo il tempo per riusare le texture ──────
const colorCache = new Map<number, HTMLCanvasElement>();
const cloudCache = new Map<number, HTMLCanvasElement>();

function quantize(ma: number) {
  // passi più fini vicino al presente, più larghi nel profondo passato
  const step = ma > 1000 ? 25 : ma > 100 ? 5 : 1;
  return Math.round(ma / step) * step;
}

export function getEarthCanvas(ma: number): HTMLCanvasElement {
  const key = quantize(ma);
  let c = colorCache.get(key);
  if (!c) {
    c = buildEarth(key);
    if (colorCache.size > 24) colorCache.clear();
    colorCache.set(key, c);
  }
  return c;
}

export function getCloudCanvas(ma: number): HTMLCanvasElement {
  const key = quantize(ma);
  let c = cloudCache.get(key);
  if (!c) {
    c = buildClouds(key);
    if (cloudCache.size > 24) cloudCache.clear();
    cloudCache.set(key, c);
  }
  return c;
}

function buildEarth(ma: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(W, H);
  const d = img.data;

  const cl = climateAt(ma);
  const molten = ma >= 4000; // oceano di magma adeano/archeano antico
  const archean = ma >= 2500 && ma < 4000;

  // soglia mare/terra dal livello del mare
  const seaThreshold = clamp(0.5 + cl.seaLevel * 0.0004, 0.4, 0.62);
  // latitudine dove iniziano i ghiacci (più freddo = più bassa)
  const iceLat = clamp(90 - (26 - cl.temperature) * 2.0, 14, 96);
  // quantità di vegetazione: solo dopo la colonizzazione della terraferma
  const tempVeg = 1 - clamp(Math.abs(cl.temperature - 18) / 26);
  const vegBase = ma > 470 ? 0 : tempVeg * (0.4 + 0.6 * cl.biodiversity);
  // fattore "supercontinente" (Pangea ~300, Rodinia ~1000 Ma)
  const pangea = gauss(ma, 300, 120) * 0.9 + gauss(ma, 1000, 200) * 0.6;
  // deriva dei continenti nel tempo
  const drift = ma * 0.0011;
  const morph = ma * 0.0007;

  const cosD = Math.cos(drift);
  const sinD = Math.sin(drift);

  let p = 0;
  for (let y = 0; y < H; y++) {
    const lat = Math.PI / 2 - (y / H) * Math.PI;
    const latDeg = (lat * 180) / Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let x = 0; x < W; x++, p += 4) {
      const lon = (x / W) * Math.PI * 2 - Math.PI;
      // punto sulla sfera unitaria
      let sx = cosLat * Math.cos(lon);
      let sy = sinLat;
      let sz = cosLat * Math.sin(lon);
      // rotazione (deriva) attorno all'asse Y
      const rx = sx * cosD - sz * sinD;
      const rz = sx * sinD + sz * cosD;
      sx = rx;
      sz = rz;

      const scale = 2.2;
      let elev = fbm(sx * scale + 10, sy * scale + morph, sz * scale - 4, 4);
      // clustering verso un emisfero quando si forma un supercontinente
      elev += pangea * 0.28 * sx;

      let r: number, g: number, b: number;

      if (molten) {
        const v = clamp(elev * 1.1);
        const crack = fbm(sx * 6, sy * 6, sz * 6, 3);
        r = 70 + 185 * v + 30 * crack;
        g = 15 + 70 * v * v + 40 * crack * crack;
        b = 10 + 25 * v;
      } else {
        const polar = Math.abs(latDeg) > iceLat;
        if (elev < seaThreshold) {
          // ── oceano ──
          const depth = clamp((seaThreshold - elev) / seaThreshold);
          if (polar) {
            // ghiaccio marino
            r = 210; g = 226; b = 240;
          } else if (archean) {
            r = mix(20, 8, depth); g = mix(70, 35, depth); b = mix(75, 55, depth);
          } else {
            r = mix(28, 6, depth); g = mix(110, 28, depth); b = mix(150, 70, depth);
          }
        } else {
          // ── terra ──
          const h = clamp((elev - seaThreshold) / (1 - seaThreshold)); // 0..1 altitudine
          if (polar) {
            r = 234; g = 240; b = 250; // calotta
          } else {
            // roccia/deserto di base
            let br: number, bg: number, bb: number;
            if (archean) {
              br = 120; bg = 70; bb = 52; // crosta ricca di ferro, rossastra
            } else {
              const desert = clamp(tempVeg < 0.4 ? 1 : 0.3);
              br = mix(120, 175, desert); bg = mix(98, 140, desert); bb = mix(76, 95, desert);
            }
            const moisture = fbm(sx * 3 + 50, sy * 3, sz * 3, 3);
            const veg = clamp(vegBase * (0.5 + moisture) * (1 - h * 0.6));
            r = mix(br, 46, veg); g = mix(bg, 120, veg); b = mix(bb, 50, veg);
            // neve sulle vette
            const snow = clamp((h - 0.7) * 3) * (cl.temperature < 24 ? 1 : 0.2);
            r = mix(r, 240, snow); g = mix(g, 244, snow); b = mix(b, 252, snow);
          }
        }
      }

      d[p] = r;
      d[p + 1] = g;
      d[p + 2] = b;
      d[p + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas;
}

function buildClouds(ma: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(W, H);
  const d = img.data;
  const cl = climateAt(ma);
  // più nuvole quando fa caldo e umido; quasi nessuna sulla Terra a palla di neve
  const cover = clamp(0.35 + (cl.temperature - 10) * 0.012);
  const drift = ma * 0.002;
  const cosD = Math.cos(drift);
  const sinD = Math.sin(drift);

  let p = 0;
  for (let y = 0; y < H; y++) {
    const lat = Math.PI / 2 - (y / H) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let x = 0; x < W; x++, p += 4) {
      const lon = (x / W) * Math.PI * 2 - Math.PI;
      let sx = cosLat * Math.cos(lon);
      const sy = sinLat;
      let sz = cosLat * Math.sin(lon);
      const rx = sx * cosD - sz * sinD;
      const rz = sx * sinD + sz * cosD;
      sx = rx; sz = rz;
      const n = fbm(sx * 3.2 + 100, sy * 3.2, sz * 3.2, 5);
      const a = clamp((n - (1 - cover)) * 3);
      d[p] = 255; d[p + 1] = 255; d[p + 2] = 255;
      d[p + 3] = a * 220;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}
