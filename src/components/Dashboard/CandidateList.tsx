import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchCandidates } from '../../services/election';
import type { Candidate } from '../../types';
import { Users, Loader2, MapPin, Award } from 'lucide-react';

const partyColors: Record<string, string> = {
  'Progressive Alliance': '#14b8a6',
  'Civic Forward Party': '#8b5cf6',
  'Independent': '#f59e0b',
};

const constituencies = ['Downtown', 'Uptown', 'Westside'];

export const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [constituency, setConstituency] = useState('Downtown');

  useEffect(() => {
    setLoading(true);
    fetchCandidates(constituency).then(data => {
      setCandidates(data);
      setLoading(false);
    });
  }, [constituency]);

  return (
    <motion.div className="content-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="card-title"><Users size={22} /> Candidates</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <MapPin size={16} color="var(--primary)" /> Constituency:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {constituencies.map(c => (
            <button
              key={c}
              onClick={() => setConstituency(c)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                border: `1px solid ${constituency === c ? 'rgba(20,184,166,0.5)' : 'var(--border)'}`,
                background: constituency === c ? 'rgba(20,184,166,0.15)' : 'transparent',
                color: constituency === c ? 'var(--primary-light)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: constituency === c ? 600 : 400,
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={32} className="animate-spin" color="var(--primary)" />
        </div>
      ) : candidates.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No candidates found for this constituency.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {candidates.map((candidate, i) => {
            const color = partyColors[candidate.party] || 'var(--primary)';
            return (
              <motion.div
                key={candidate.id}
                className="candidate-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(135deg, ${color}22, transparent)`, borderRadius: '16px 16px 0 0' }} />
                <div className="candidate-avatar" style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 0 20px ${color}44` }}>
                  {candidate.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {candidate.name}
                </h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: `${color}18`, border: `1px solid ${color}44`, color, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
                  <Award size={12} /> {candidate.party}
                </div>
                <div style={{ width: '100%', background: 'var(--surface-muted)', padding: '0.75rem', borderRadius: 10, border: '1px dashed var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Election Symbol</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{candidate.symbol}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
