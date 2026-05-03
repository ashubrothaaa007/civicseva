/**
 * @fileoverview Election Timeline Tracker using the useTimeline hook.
 * @module components/Timeline/TimelineTracker
 */
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTimeline } from '../../hooks/useElection';
import { formatDate, isPastDate, daysUntil } from '../../utils/helpers';

const categoryColors: Record<string, string> = {
  registration: 'var(--primary)',
  campaign: 'var(--purple)',
  voting: 'var(--secondary)',
  results: 'var(--success)',
};

/** Election Timeline Tracker component. */
export const TimelineTracker: React.FC = () => {
  const { t } = useTranslation();
  const { events, loading, error } = useTimeline();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Loader2 size={32} className="animate-spin" color="var(--primary)" aria-label={t('common.loading')} />
    </div>
  );

  if (error) return (
    <div className="content-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--error)' }}>
      <AlertCircle size={32} style={{ margin: '0 auto 1rem' }} />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="content-card">
      <h2 className="card-title"><Calendar size={22} /> Election Timeline</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Track every key date on the path to Election Day.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
        <div className="timeline-line" />
        {events.map((event, i) => {
          const past = isPastDate(event.date);
          const days = daysUntil(event.date);
          const isToday = days === 0 || days === 1;
          const accent = categoryColors[event.category ?? 'voting'];

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: past ? 'rgba(255,255,255,0.05)' : isToday ? accent : `linear-gradient(135deg, ${accent}, ${accent}99)`, border: past ? '1px solid var(--border)' : 'none', boxShadow: past ? 'none' : `0 0 18px ${accent}44`, opacity: past ? 0.6 : 1 }}>
                {past ? <CheckCircle size={20} color="var(--text-muted)" /> : <Clock size={20} color="white" />}
              </div>

              <div style={{ flex: 1, background: 'rgba(255,255,255,0.025)', border: `1px solid ${past ? 'var(--border)' : `${accent}30`}`, borderRadius: 12, padding: '1rem 1.25rem', opacity: past ? 0.65 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 600, color: past ? 'var(--text-muted)' : accent, letterSpacing: '0.03em' }}>
                    {formatDate(event.date)} {past ? '• Done' : isToday ? '• Today!' : days > 0 ? `• In ${days} days` : ''}
                  </span>
                  {event.category && (
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.6rem', borderRadius: '9999px', background: `${accent}15`, color: accent, border: `1px solid ${accent}30`, fontWeight: 600, textTransform: 'capitalize' }}>
                      {event.category}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{event.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
