/**
 * @fileoverview Election Guide Wizard — 5-step guided civic flow.
 * @module components/Guide/ElectionWizard
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ChevronRight, ChevronLeft, Wand2, ClipboardCheck, MapPin, Vote, BookOpen, PartyPopper } from 'lucide-react';
import { EligibilityChecker } from './EligibilityChecker';

interface Step {
  id: number;
  key: string;
  icon: React.ReactNode;
  route: string;
}

const STEPS: Step[] = [
  { id: 0, key: 'step1', icon: <CheckCircle size={20} />, route: '/registration' },
  { id: 1, key: 'step2', icon: <ClipboardCheck size={20} />, route: '/registration' },
  { id: 2, key: 'step3', icon: <MapPin size={20} />, route: '/candidates' },
  { id: 3, key: 'step4', icon: <MapPin size={20} />, route: '/booth' },
  { id: 4, key: 'step5', icon: <Vote size={20} />, route: '/voting' },
];

/** Election Guide Wizard component — walks users through the full election process. */
export const ElectionWizard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const markComplete = (): void => {
    const next = new Set(completed);
    next.add(current);
    setCompleted(next);
    if (current < STEPS.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const stepLabels = [t('wizard.step1'), t('wizard.step2'), t('wizard.step3'), t('wizard.step4'), t('wizard.step5')];

  const stepContent: React.ReactNode[] = [
    <EligibilityChecker key="elig" />,
    <div key="reg" className="content-card">
      <h3 className="card-title"><ClipboardCheck size={20} />{t('wizard.step2')}</h3>
      <ul className="step-list">
        <li><strong>Visit the NVSP portal</strong> (nvsp.in) or your local Election Commission office.</li>
        <li><strong>Fill Form 6</strong> to add your name to the electoral roll.</li>
        <li><strong>Upload documents:</strong> Age proof (Aadhaar/Passport) + Address proof.</li>
        <li><strong>Submit and note your Application ID</strong> to track your status.</li>
      </ul>
      <a href="https://www.nvsp.in" target="_blank" rel="noreferrer" className="button" style={{ marginTop: '1.5rem', textDecoration: 'none', display: 'inline-flex' }}>
        Open NVSP Portal ↗
      </a>
    </div>,
    <div key="const" className="content-card">
      <h3 className="card-title"><MapPin size={20} />{t('wizard.step3')}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>Your constituency is determined by your registered address.</p>
      <ul className="step-list">
        <li><strong>Check on Voter Helpline App</strong> or call 1950 (Election Commission helpline).</li>
        <li><strong>Visit electoralsearch.eci.gov.in</strong> and enter your details to find your constituency and polling station.</li>
        <li>Navigate to <strong>Candidates</strong> tab to see who is running in your constituency.</li>
      </ul>
      <button onClick={() => navigate('/candidates')} className="button" style={{ marginTop: '1.5rem' }}>
        View Candidates <ChevronRight size={16} />
      </button>
    </div>,
    <div key="booth" className="content-card">
      <h3 className="card-title"><MapPin size={20} />{t('wizard.step4')}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>Know your polling booth in advance to plan your voting day.</p>
      <ul className="step-list">
        <li>Your assigned polling booth is printed on your <strong>Voter ID card (EPIC)</strong>.</li>
        <li>Use the <strong>Find Booth</strong> tool to search by pincode.</li>
        <li>Note the booth address and check how to get there.</li>
      </ul>
      <button onClick={() => navigate('/booth')} className="button" style={{ marginTop: '1.5rem' }}>
        Locate My Booth <ChevronRight size={16} />
      </button>
    </div>,
    <div key="voting" className="content-card">
      <h3 className="card-title"><Vote size={20} />{t('wizard.step5')}</h3>
      <ul className="step-list">
        <li><strong>Carry your Voter ID (EPIC)</strong> or any 12 approved alternative IDs (Aadhaar, Passport, Driving License, etc.).</li>
        <li><strong>Arrive early</strong> to avoid long queues. Booths open at 7:00 AM.</li>
        <li><strong>Check in with poll officers</strong> who will verify your identity and mark your name.</li>
        <li><strong>Use the EVM</strong> to cast your vote — press the blue button next to your chosen candidate.</li>
        <li><strong>Get your finger marked</strong> with indelible ink — proof that you voted!</li>
      </ul>
    </div>,
  ];

  if (done) {
    return (
      <motion.div className="content-card" style={{ textAlign: 'center', padding: '3rem' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <PartyPopper size={56} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{t('wizard.complete')}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>{t('wizard.completedMsg')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { setCurrent(0); setCompleted(new Set()); setDone(false); }} className="button button-ghost">Start Over</button>
          <button onClick={() => navigate('/assistant')} className="button">Ask AI Assistant</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="content-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '24px', left: '48px', right: '48px', height: '2px', background: 'var(--border)' }} />
          <div style={{ position: 'absolute', top: '24px', left: '48px', height: '2px', background: 'linear-gradient(90deg, var(--primary), var(--purple))', width: `${(current / (STEPS.length - 1)) * 100}%`, transition: 'width 0.4s ease', right: 'auto' }} />
          {STEPS.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1, zIndex: 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', background: completed.has(i) ? 'linear-gradient(135deg,var(--success),#059669)' : i === current ? 'linear-gradient(135deg,var(--primary),#0d9488)' : 'rgba(255,255,255,0.05)', border: `2px solid ${completed.has(i) ? 'var(--success)' : i === current ? 'var(--primary)' : 'var(--border)'}`, boxShadow: i === current ? '0 0 20px var(--primary-glow)' : 'none', color: completed.has(i) || i === current ? 'white' : 'var(--text-muted)' }}>
                {completed.has(i) ? <CheckCircle size={20} /> : step.icon}
              </div>
              <span style={{ fontSize: '0.72rem', color: i === current ? 'var(--primary-light)' : 'var(--text-muted)', fontWeight: i === current ? 700 : 400, textAlign: 'center', maxWidth: '72px' }}>
                {stepLabels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {stepContent[current]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} className="button button-ghost" disabled={current === 0} aria-label="Previous step">
          <ChevronLeft size={18} /> {t('wizard.prev')}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <Wand2 size={14} color="var(--primary)" />
          Step {current + 1} of {STEPS.length}
        </div>
        <button onClick={markComplete} className="button" aria-label={current === STEPS.length - 1 ? 'Finish wizard' : 'Next step'}>
          {current === STEPS.length - 1 ? <><BookOpen size={18} /> {t('wizard.finish')}</> : <>{t('wizard.next')} <ChevronRight size={18} /></>}
        </button>
      </div>
    </div>
  );
};
