import { useSyncExternalStore } from 'react';
import { TIMELINE_START_MA } from '../data/timeline';

export type Lang = 'it' | 'en';

export interface VoyageState {
  /** Tempo corrente in milioni di anni fa (Ma). 4600 = formazione, 0 = oggi. */
  ma: number;
  /** Riproduzione automatica ("Accelerazione Temporale"). */
  playing: boolean;
  /** Velocità di riproduzione in Ma al secondo. */
  speed: number;
  /** Lingua dell'interfaccia. */
  lang: Lang;
  /** Evento attualmente selezionato (id) o null. */
  selectedEvent: string | null;
  /** Layer overlay attivi. */
  layers: { geo: boolean; bio: boolean };
  /** Mostra le nuvole atmosferiche. */
  clouds: boolean;
}

type Listener = () => void;

const state: VoyageState = {
  ma: TIMELINE_START_MA,
  playing: false,
  speed: 120,
  lang: 'it',
  selectedEvent: null,
  layers: { geo: true, bio: true },
  clouds: true,
};

const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

export function getState(): Readonly<VoyageState> {
  return state;
}

export function setState(patch: Partial<VoyageState>) {
  Object.assign(state, patch);
  emit();
}

export function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Hook generico per selezionare una porzione dello stato. */
export function useVoyage<T>(selector: (s: Readonly<VoyageState>) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

// ── azioni ──────────────────────────────────────────────────
export const actions = {
  setMa(ma: number) {
    setState({ ma: clampMa(ma) });
  },
  togglePlay() {
    setState({ playing: !state.playing });
  },
  setPlaying(playing: boolean) {
    setState({ playing });
  },
  setSpeed(speed: number) {
    setState({ speed });
  },
  toggleLang() {
    setState({ lang: state.lang === 'it' ? 'en' : 'it' });
  },
  selectEvent(id: string | null) {
    setState({ selectedEvent: id });
  },
  toggleLayer(key: 'geo' | 'bio') {
    setState({ layers: { ...state.layers, [key]: !state.layers[key] } });
  },
  toggleClouds() {
    setState({ clouds: !state.clouds });
  },
};

export function clampMa(ma: number) {
  return Math.min(TIMELINE_START_MA, Math.max(0, ma));
}
