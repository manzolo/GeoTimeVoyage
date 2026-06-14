import { EVENTS, formatAge } from '../data/timeline';
import { GLOBAL_CREDITS, SOURCES, type Source } from '../data/sources';
import { t } from '../i18n';
import { actions, useVoyage } from '../state/store';

export function InfoPanel() {
  const selected = useVoyage((s) => s.selectedEvent);
  const lang = useVoyage((s) => s.lang);
  const event = EVENTS.find((e) => e.id === selected);
  if (!event) return null;

  const accent = event.category === 'geo' ? '#ff7a3c' : '#49e0a0';
  const sources = SOURCES[event.id] ?? [];

  return (
    <div
      className="panel fade-in"
      style={{
        position: 'absolute',
        top: 84,
        right: 16,
        width: 'min(360px, 90vw)',
        padding: 18,
        maxHeight: 'calc(100vh - 220px)',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>
            {event.category === 'geo' ? t('geoEvents', lang) : t('bioEvents', lang)} · {formatAge(event.ma, lang)}
          </div>
          <h2 style={{ fontSize: 19, marginTop: 4, lineHeight: 1.25 }}>{event.title[lang]}</h2>
        </div>
        <button
          onClick={() => actions.selectEvent(null)}
          style={{ padding: '4px 8px', fontSize: 12, flexShrink: 0 }}
          aria-label={t('close', lang)}
        >
          ✕
        </button>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.5, marginTop: 12, color: 'var(--text)' }}>
        {event.description[lang]}
      </p>

      <Section title={t('consequences', lang)} body={event.consequences[lang]} accent={accent} />
      {event.fossils && <Section title={t('fossils', lang)} body={event.fossils[lang]} accent={accent} />}

      {sources.length > 0 && <Links title={t('sources', lang)} items={sources} accent={accent} />}

      <div style={{ height: 1, background: 'var(--border)', margin: '16px 0 12px' }} />
      <Links title={t('credits', lang)} items={GLOBAL_CREDITS} accent="var(--text-dim)" dim />
    </div>
  );
}

function Section({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, marginBottom: 4 }}>
        {title}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-dim)' }}>{body}</p>
    </div>
  );
}

function Links({ title, items, accent, dim }: { title: string; items: Source[]; accent: string; dim?: boolean }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, marginBottom: 6 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {items.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: dim ? 11.5 : 12.5,
                color: dim ? 'var(--text-dim)' : 'var(--accent)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              ↗ {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
