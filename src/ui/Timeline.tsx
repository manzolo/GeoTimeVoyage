import { useCallback, useRef } from 'react';
import { EONS, EVENTS, formatAge, periodAt } from '../data/timeline';
import { actions, useVoyage } from '../state/store';
import { fracToMa, maToFrac } from '../utils/timeScale';

export function Timeline() {
  const ma = useVoyage((s) => s.ma);
  const lang = useVoyage((s) => s.lang);
  const layers = useVoyage((s) => s.layers);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const { eon, era } = periodAt(ma);

  const updateFromEvent = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    actions.setMa(fracToMa(f));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    actions.setPlaying(false);
    updateFromEvent(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromEvent(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  const cursor = `${maToFrac(ma) * 100}%`;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 18,
        transform: 'translateX(-50%)',
        width: 'min(1100px, 94vw)',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          color: 'var(--text-dim)',
          marginBottom: 6,
          padding: '0 2px',
        }}
      >
        <span>
          <strong style={{ color: eon.color }}>{eon.name[lang]}</strong>
          {era && <span> · {era.name[lang]}</span>}
        </span>
        <span style={{ color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
          {formatAge(ma, lang)}
        </span>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        className="panel"
        style={{ position: 'relative', height: 46, cursor: 'pointer', overflow: 'hidden', padding: 0 }}
      >
        {/* bande degli eoni/ere */}
        {EONS.flatMap((e) => {
          const segs = e.eras.length ? e.eras : [e];
          return segs.map((s) => {
            const left = maToFrac(s.start) * 100;
            const width = (maToFrac(s.end) - maToFrac(s.start)) * 100;
            return (
              <div
                key={s.id}
                title={s.name[lang]}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${left}%`,
                  width: `${width}%`,
                  background: s.color,
                  opacity: 0.32,
                  borderRight: '1px solid rgba(0,0,0,0.35)',
                }}
              />
            );
          });
        })}

        {/* tacche degli eventi */}
        {EVENTS.filter((ev) => layers[ev.category]).map((ev) => (
          <button
            key={ev.id}
            title={ev.title[lang]}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              actions.setPlaying(false);
              actions.setMa(ev.ma);
              actions.selectEvent(ev.id);
            }}
            style={{
              position: 'absolute',
              top: 6,
              left: `calc(${maToFrac(ev.ma) * 100}% - 5px)`,
              width: 10,
              height: 10,
              borderRadius: '50%',
              padding: 0,
              background: ev.category === 'geo' ? '#ff7a3c' : '#49e0a0',
              border: '1px solid rgba(0,0,0,0.4)',
              backdropFilter: 'none',
            }}
          />
        ))}

        {/* cursore */}
        <div
          style={{
            position: 'absolute',
            top: -3,
            bottom: -3,
            left: `calc(${cursor} - 1px)`,
            width: 2,
            background: '#fff',
            boxShadow: '0 0 8px rgba(255,255,255,0.9)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: 'var(--text-dim)',
          marginTop: 4,
        }}
      >
        <span>4.6 {lang === 'it' ? 'mld di anni fa' : 'Ga'}</span>
        <span>{lang === 'it' ? 'oggi' : 'today'}</span>
      </div>
    </div>
  );
}
