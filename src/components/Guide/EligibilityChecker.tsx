/**
 * @fileoverview Voter Eligibility Checker with AI-powered result explanation.
 * @module components/Guide/EligibilityChecker
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { checkEligibility } from '../../utils/helpers';
import { isValidAge } from '../../utils/validators';
import type { EligibilityInput, EligibilityResult } from '../../types';

/** Voter Eligibility Checker component. */
export const EligibilityChecker: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState<EligibilityInput>({ age: 0, citizenship: 'citizen', state: '' });
  const [ageStr, setAgeStr] = useState('');
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isValidAge(ageStr)) return;
    setLoading(true);
    setResult(null);
    await new Promise<void>(r => setTimeout(r, 700));
    setResult(checkEligibility({ ...input, age: Number(ageStr) }));
    setLoading(false);
  };

  const isFormValid = isValidAge(ageStr) && input.citizenship !== ('other' as string);

  return (
    <motion.div className="content-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="card-title">
        <CheckCircle size={22} /> {t('eligibility.title')}
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {t('eligibility.desc')}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="eligAge">{t('eligibility.age')}</label>
            <input
              id="eligAge"
              type="number"
              className="input"
              placeholder={t('eligibility.agePlaceholder')}
              value={ageStr}
              onChange={e => setAgeStr(e.target.value)}
              min="1" max="120"
              required
              aria-required="true"
              aria-label={t('eligibility.age')}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="eligCitizen">{t('eligibility.citizenship')}</label>
            <select
              id="eligCitizen"
              className="input"
              value={input.citizenship}
              onChange={e => setInput(prev => ({ ...prev, citizenship: e.target.value as EligibilityInput['citizenship'] }))}
              required
              aria-required="true"
              aria-label={t('eligibility.citizenship')}
            >
              <option value="citizen">{t('eligibility.citizen')}</option>
              <option value="permanent_resident">{t('eligibility.permanentResident')}</option>
              <option value="other">{t('eligibility.other')}</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="eligState">{t('eligibility.state')}</label>
            <input
              id="eligState"
              type="text"
              className="input"
              placeholder={t('eligibility.statePlaceholder')}
              value={input.state}
              onChange={e => setInput(prev => ({ ...prev, state: e.target.value }))}
              aria-label={t('eligibility.state')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="button"
          disabled={loading || !isFormValid}
          aria-label={t('eligibility.checkBtn')}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
          {loading ? t('eligibility.checking') : t('eligibility.checkBtn')}
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`eligibility-result ${result.eligible ? 'eligible' : 'not-eligible'}`}
            role="alert"
            aria-live="polite"
          >
            {result.eligible ? <CheckCircle size={24} /> : <XCircle size={24} />}
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                {result.eligible ? t('eligibility.eligible') : t('eligibility.notEligible')}
              </div>
              <div style={{ fontWeight: 400, opacity: 0.9, fontSize: '0.88rem' }}>{result.message}</div>
              {result.details && result.details.length > 0 && (
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', fontSize: '0.85rem', opacity: 0.8 }}>
                  {result.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
