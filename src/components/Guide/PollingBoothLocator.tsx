/**
 * @fileoverview Polling Booth Locator using the useBooths hook.
 * @module components/Guide/PollingBoothLocator
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Search, Clock, Loader2, Navigation, AlertCircle } from 'lucide-react';
import { useBooths } from '../../hooks/useElection';
import { isValidPincode } from '../../utils/validators';

/** Polling Booth Locator component. */
export const PollingBoothLocator: React.FC = () => {
  const { t } = useTranslation();
  const [pincode, setPincode] = useState('');
  const [searched, setSearched] = useState(false);
  const { booths, loading, error, search } = useBooths();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isValidPincode(pincode)) return;
    setSearched(true);
    search(pincode);
  };

  return (
    <motion.div className="content-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="card-title"><MapPin size={22} /> Polling Booth Locator</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
        Enter your 6-digit Pincode to find your designated polling station. Try <strong style={{ color: 'var(--primary-light)' }}>110001</strong>, <strong style={{ color: 'var(--primary-light)' }}>400001</strong>, or <strong style={{ color: 'var(--primary-light)' }}>600001</strong>.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: '480px', marginBottom: '2rem' }} noValidate>
        <input
          type="text"
          className="input"
          inputMode="numeric"
          value={pincode}
          onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter 6-digit Pincode"
          aria-label="Enter your pincode"
          required
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="button"
          disabled={loading || !isValidPincode(pincode)}
          aria-label={loading ? t('common.searching') : t('common.search')}
          style={{ flexShrink: 0 }}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          {loading ? t('common.searching') : t('common.search')}
        </button>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, color: 'var(--error)', marginBottom: '1rem' }}>
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}

        {searched && !loading && !error && booths.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-secondary)' }} role="alert">
            No polling booths found for <strong style={{ color: 'var(--text-primary)' }}>{pincode}</strong>. Please verify your pincode or try a neighboring area.
          </motion.div>
        )}

        {booths.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gap: '1rem' }}>
            {booths.map((booth, i) => (
              <motion.div
                key={booth.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '1.5rem', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 14 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--primary)" /> {booth.name}
                    </h3>
                    {booth.district && <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 600, marginBottom: '0.35rem', display: 'block' }}>{booth.district}</span>}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '0.75rem' }}>{booth.address}, {booth.pincode}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 600, fontSize: '0.86rem' }}>
                      <Clock size={15} /> {booth.timings}
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${booth.name} ${booth.address} ${booth.pincode}`)}`, '_blank', 'noopener,noreferrer')}
                    className="button button-sm"
                    aria-label={`Get directions to ${booth.name}`}
                    style={{ flexShrink: 0 }}
                  >
                    <Navigation size={15} /> {t('common.getDirections')}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
