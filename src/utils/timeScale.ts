import { TIMELINE_START_MA } from '../data/timeline';

// Scala non lineare condivisa: dà più spazio alle epoche recenti.
export const K = 3;

/** Ma → frazione [0,1] lungo la timeline (0 = 4600 Ma, 1 = oggi). */
export const maToFrac = (ma: number) => 1 - Math.pow(ma / TIMELINE_START_MA, 1 / K);

/** Frazione [0,1] → Ma. */
export const fracToMa = (f: number) => TIMELINE_START_MA * Math.pow(1 - f, K);
