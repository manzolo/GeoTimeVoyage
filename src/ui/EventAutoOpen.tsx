import { useEffect, useRef } from 'react';
import { EVENTS } from '../data/timeline';
import { actions, useVoyage } from '../state/store';
import { maToFrac } from '../utils/timeScale';

// Quando il cursore della timeline passa vicino a un evento (nello spazio
// "frazione" della scala non lineare), apre automaticamente la sua scheda.
// Per non riaprirla subito dopo che l'utente l'ha chiusa, si agisce solo
// quando cambia l'evento più vicino (ingresso/uscita dalla zona).
const THRESHOLD = 0.012;

export function EventAutoOpen() {
  const ma = useVoyage((s) => s.ma);
  const layers = useVoyage((s) => s.layers);
  const lastNear = useRef<string | null>(null);

  useEffect(() => {
    const cursor = maToFrac(ma);
    let bestId: string | null = null;
    let bestD = Infinity;
    for (const e of EVENTS) {
      if (!layers[e.category]) continue;
      const d = Math.abs(maToFrac(e.ma) - cursor);
      if (d < bestD) {
        bestD = d;
        bestId = e.id;
      }
    }
    const nearId = bestD <= THRESHOLD ? bestId : null;
    if (nearId !== lastNear.current) {
      lastNear.current = nearId;
      actions.selectEvent(nearId);
    }
  }, [ma, layers]);

  return null;
}
