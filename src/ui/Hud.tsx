import { climateAt, formatAge } from '../data/timeline';
import { t } from '../i18n';
import { actions, useVoyage } from '../state/store';

export function Hud() {
  const lang = useVoyage((s) => s.lang);
  return (
    <>
      <TopBar lang={lang} />
      <Controls lang={lang} />
      <ClimateStats lang={lang} />
    </>
  );
}

function TopBar({ lang }: { lang: 'it' | 'en' }) {
  return (
    <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', gap: 12, pointerEvents: 'none' }}>
      <div className="panel" style={{ padding: '12px 16px', pointerEvents: 'auto' }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.02em' }}>
          🌍 {t('title', lang)}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{t('subtitle', lang)}</div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6, opacity: 0.8 }}>{t('hint', lang)}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', pointerEvents: 'auto' }}>
        <button onClick={() => actions.toggleLang()} style={{ padding: '8px 12px', fontWeight: 600 }}>
          {lang === 'it' ? '🇬🇧 EN' : '🇮🇹 IT'}
        </button>
        <button onClick={captureScreenshot} style={{ padding: '8px 12px' }} title={t('screenshot', lang)}>
          📷
        </button>
      </div>
    </div>
  );
}

function Controls({ lang }: { lang: 'it' | 'en' }) {
  const playing = useVoyage((s) => s.playing);
  const speed = useVoyage((s) => s.speed);
  const layers = useVoyage((s) => s.layers);
  const clouds = useVoyage((s) => s.clouds);

  return (
    <div
      className="panel"
      style={{
        position: 'absolute',
        left: 16,
        bottom: 110,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 220,
      }}
    >
      <button
        onClick={() => actions.togglePlay()}
        style={{ padding: '10px 14px', fontWeight: 600, background: playing ? 'rgba(78,161,255,0.25)' : undefined }}
      >
        {playing ? `⏸ ${t('pause', lang)}` : `▶ ${t('play', lang)}`}
      </button>

      <label style={{ fontSize: 12, color: 'var(--text-dim)' }}>
        {t('speed', lang)}: {speed} Ma/s
        <input
          type="range"
          min={20}
          max={400}
          step={10}
          value={speed}
          onChange={(e) => actions.setSpeed(Number(e.target.value))}
          style={{ width: '100%', marginTop: 4 }}
        />
      </label>

      <div style={{ height: 1, background: 'var(--border)' }} />
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
        {t('layers', lang)}
      </div>
      <Toggle on={layers.geo} color="#ff7a3c" label={t('geoEvents', lang)} onClick={() => actions.toggleLayer('geo')} />
      <Toggle on={layers.bio} color="#49e0a0" label={t('bioEvents', lang)} onClick={() => actions.toggleLayer('bio')} />
      <Toggle on={clouds} color="#9fc4ff" label={t('clouds', lang)} onClick={() => actions.toggleClouds()} />
    </div>
  );
}

function Toggle({ on, color, label, onClick }: { on: boolean; color: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 10px',
        fontSize: 13,
        opacity: on ? 1 : 0.5,
        justifyContent: 'flex-start',
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: on ? color : 'transparent', border: `2px solid ${color}` }} />
      {label}
    </button>
  );
}

function ClimateStats({ lang }: { lang: 'it' | 'en' }) {
  const ma = useVoyage((s) => s.ma);
  const cl = climateAt(ma);

  return (
    <div className="panel" style={{ position: 'absolute', right: 16, bottom: 110, padding: 12, width: 200 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>
        {formatAge(ma, lang)}
      </div>
      <Stat label={t('temperature', lang)} value={`${cl.temperature.toFixed(0)} °C`} frac={(cl.temperature + 20) / 240} color="#ff8a5c" />
      <Stat label={t('co2', lang)} value={`${cl.co2 >= 1000 ? (cl.co2 / 1000).toFixed(1) + 'k' : cl.co2.toFixed(0)} ppm`} frac={Math.log10(cl.co2) / 5} color="#c08bff" />
      <Stat label={t('seaLevel', lang)} value={`${cl.seaLevel >= 0 ? '+' : ''}${cl.seaLevel.toFixed(0)} m`} frac={(cl.seaLevel + 80) / 360} color="#4ea1ff" />
      <Stat label={t('biodiversity', lang)} value={`${(cl.biodiversity * 100).toFixed(0)}%`} frac={cl.biodiversity} color="#49e0a0" />
    </div>
  );
}

function Stat({ label, value, frac, color }: { label: string; value: string; frac: number; color: string }) {
  const w = Math.min(1, Math.max(0, frac)) * 100;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
        <span style={{ color: 'var(--text-dim)' }}>{label}</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      </div>
      <div style={{ height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ height: '100%', width: `${w}%`, borderRadius: 4, background: color, transition: 'width 0.2s' }} />
      </div>
    </div>
  );
}

function captureScreenshot() {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;
  requestAnimationFrame(() => {
    const url = (canvas as HTMLCanvasElement).toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `geotime-voyage-${Date.now()}.png`;
    a.click();
  });
}
