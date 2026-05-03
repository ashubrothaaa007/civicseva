import { useState, type ReactElement } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BookOpen, Calendar, Landmark, Vote,
  MessageCircle, ClipboardCheck, User, Users, MapPin, ArrowRight, Wand2
} from 'lucide-react';
import { Login } from './components/Auth/Login';
import { Assistant } from './components/Guide/Assistant';
import { EligibilityChecker } from './components/Guide/EligibilityChecker';
import { ElectionWizard } from './components/Guide/ElectionWizard';
import { TimelineTracker } from './components/Timeline/TimelineTracker';
import { PollingBoothLocator } from './components/Guide/PollingBoothLocator';
import { CandidateList } from './components/Dashboard/CandidateList';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { Notifications } from './components/Dashboard/Notifications';
import { LanguageSwitcher } from './components/Common/LanguageSwitcher';
import { ThemeToggle } from './components/Common/ThemeToggle';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { LandingPage } from './components/Landing/LandingPage';
import { useAuth } from './hooks/useAuth';

/** Animated page wrapper with fade-up transition. */
const Page: React.FC<{ badge?: string; title: string; desc?: string; children: React.ReactNode }> = ({ badge, title, desc, children }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
    <div className="page-header">
      {badge && <div className="page-header-badge">{badge}</div>}
      <h1 className="page-title">{title}</h1>
      {desc && <p className="page-description">{desc}</p>}
    </div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </motion.div>
);

// ── STATIC PAGES ──────────────────────────────────────────────────────────────
const RegistrationPage: React.FC = () => (
  <Page badge="📋 Step 1" title="Voter Registration" desc="Check your eligibility and learn how to register to vote in India.">
    <EligibilityChecker />
    <div className="content-card">
      <h2 className="card-title"><ClipboardCheck size={22} /> How to Register to Vote</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Voter registration in India is managed by the Election Commission of India (ECI) through the National Voters' Services Portal.
      </p>
      <ul className="step-list">
        <li><strong>Visit nvsp.in</strong> or download the Voter Helpline App to check your current registration status.</li>
        <li><strong>Fill Form 6</strong> (for new registrations) or Form 8 (to update details).</li>
        <li><strong>Upload documents:</strong> Age proof (Aadhaar, Birth Certificate, Passport) and Address proof.</li>
        <li><strong>Submit online or visit</strong> your local Block Development Officer (BDO) or ERO office.</li>
        <li><strong>Track your application</strong> using the reference number sent to your registered mobile/email.</li>
      </ul>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a href="https://www.nvsp.in" target="_blank" rel="noreferrer" className="button" aria-label="Open NVSP portal">
          Open NVSP Portal ↗
        </a>
        <a href="https://electoralsearch.eci.gov.in" target="_blank" rel="noreferrer" className="button button-ghost" aria-label="Check voter status">
          Check Voter Status ↗
        </a>
      </div>
    </div>
  </Page>
);

const VotingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Page badge="🗳️ Voting Guide" title="How to Vote" desc="A complete guide to casting your vote on Election Day in India.">
      <div className="content-card">
        <h2 className="card-title"><Vote size={22} /> Voting Day Checklist</h2>
        <ul className="step-list">
          <li><strong>Carry your Voter ID (EPIC)</strong> — or one of 12 alternative IDs: Aadhaar, Passport, Driving License, PAN Card, MNREGA Job Card, etc.</li>
          <li><strong>Arrive at your assigned polling booth</strong> — booths are open 7:00 AM to 6:00 PM.</li>
          <li><strong>Join the queue</strong> and wait for your turn. Senior citizens and differently-abled voters have priority lanes.</li>
          <li><strong>Verification:</strong> Poll workers will verify your ID, mark your name off the list, and apply indelible ink to your left index finger.</li>
          <li><strong>Proceed to the EVM (Electronic Voting Machine)</strong> in the voting compartment.</li>
          <li><strong>Press the blue button</strong> next to your chosen candidate's name and symbol on the EVM.</li>
          <li><strong>VVPAT slip confirmation:</strong> A slip will appear in the VVPAT machine for 7 seconds for your verification.</li>
          <li><strong>Collect your "I Voted" slip</strong> and leave the polling station. Congratulations — you've cast your vote! 🗳️</li>
        </ul>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="button" onClick={() => navigate('/booth')} aria-label="Find my polling station">
            <MapPin size={18} /> Find My Polling Station
          </button>
          <button className="button button-ghost" onClick={() => navigate('/assistant')} aria-label="Ask AI assistant">
            <MessageCircle size={18} /> Ask AI for Help
          </button>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title"><BookOpen size={22} /> Approved Photo ID Documents</h2>
        <div className="info-grid">
          {['Voter ID (EPIC)', 'Aadhaar Card', 'Passport', 'Driving License', 'PAN Card', 'MNREGA Job Card', 'Bank / Post-Office Passbook', 'Smart Card (CGHS/ECHS)', 'Service Identity Card', 'Pension Document with Photo', 'NPR Smart Card', 'Disability Certificate'].map(doc => (
            <div key={doc} className="info-box">
              <h4 style={{ fontSize: '0.9rem' }}>✓ {doc}</h4>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

const SystemsPage: React.FC = () => (
  <Page badge="📖 Learn" title="Electoral Systems" desc="How different voting systems translate votes into representation.">
    <div className="content-card">
      <h2 className="card-title"><Landmark size={22} /> The Indian Electoral System</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
        India uses the <strong style={{ color: 'var(--text-primary)' }}>First-Past-The-Post (FPTP)</strong> system for Lok Sabha and State Assembly elections. 543 constituencies each elect one Member of Parliament.
      </p>
      <ul className="step-list">
        <li>Each registered voter casts <strong>one vote</strong> for their preferred candidate.</li>
        <li>The candidate with the <strong>most votes wins</strong>, even without an absolute majority.</li>
        <li>The party or coalition commanding majority seats in Lok Sabha forms the <strong>government</strong>.</li>
        <li>The <strong>President of India</strong> invites the majority party leader to serve as Prime Minister.</li>
      </ul>
    </div>
    <div className="content-card">
      <h2 className="card-title"><BookOpen size={22} /> Global Voting Systems</h2>
      <div className="info-grid">
        {[
          { title: 'First-Past-The-Post (FPTP)', desc: 'Most votes wins. Simple and decisive. Used in India, UK, USA, Canada.' },
          { title: 'Proportional Representation', desc: 'Seats distributed proportionally to votes. Used in Germany, Netherlands.' },
          { title: 'Ranked Choice Voting', desc: 'Voters rank candidates. Transfers votes until one has a majority. Used in Australia.' },
          { title: 'Two-Round System', desc: 'If no majority in round 1, top two face a run-off. Used in France, Brazil.' },
        ].map(item => (
          <div className="info-box" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

// ── APP ───────────────────────────────────────────────────────────────────────
function App(): ReactElement {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <Wand2 size={40} className="animate-spin" color="var(--primary)" />
      </div>
    );
  }

  // Guest Experience: Landing Page with Login Overlay
  if (!user) {
    return (
      <div className="landing-layout" style={{ background: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
        <LandingPage onStart={() => setShowLogin(true)} />
        
        <AnimatePresence>
          {showLogin && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ 
                position: 'fixed', inset: 0, zIndex: 1000, 
                background: 'rgba(5, 8, 15, 0.8)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
              }}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={{ width: '100%', maxWidth: '400px', position: 'relative' }}
              >
                <button 
                  onClick={() => setShowLogin(false)}
                  style={{ position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                  Close [ESC]
                </button>
                <div className="content-card" style={{ padding: '2.5rem' }}>
                  <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Welcome to CivicSeva</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    Sign in to access your personalized election dashboard and AI assistant.
                  </p>
                  <Login />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Routes>
          <Route path="*" element={<div />} />
        </Routes>
      </div>
    );
  }

  const navItems = [
    { to: '/', icon: <User size={18} />, label: t('nav.dashboard'), end: true },
    { to: '/wizard', icon: <Wand2 size={18} />, label: t('nav.wizard') },
    { to: '/registration', icon: <ClipboardCheck size={18} />, label: t('nav.registration') },
    { to: '/timeline', icon: <Calendar size={18} />, label: t('nav.timeline') },
    { to: '/voting', icon: <Vote size={18} />, label: t('nav.voting') },
    { to: '/booth', icon: <MapPin size={18} />, label: t('nav.booth') },
    { to: '/candidates', icon: <Users size={18} />, label: t('nav.candidates') },
    { to: '/systems', icon: <BookOpen size={18} />, label: t('nav.systems') },
  ];

  return (
    <div className="app-container">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar" aria-label="Main Navigation">
        <div className="logo" tabIndex={0} aria-label="CivicSeva home">
          <Landmark size={26} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          {t('appName')}
        </div>

        <div className="nav-section-label">Menu</div>

        <nav className="nav-menu" role="navigation" aria-label="Primary">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <div className="nav-divider" />

          <NavLink to="/assistant" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <MessageCircle size={18} />
            {t('nav.assistant')}
          </NavLink>
        </nav>

        {!user && (
          <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 12, textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Personalized updates await</p>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-light)' }}>
              Sign In <ArrowRight size={13} />
            </NavLink>
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <main className="main-content" role="main">
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <ThemeToggle />
          <LanguageSwitcher />
          <Notifications />
        </div>

        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/wizard" element={
            <Page badge="🧭 Guided" title={t('wizard.title')} desc={t('wizard.desc')}>
              <ElectionWizard />
            </Page>
          } />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/timeline" element={
            <Page badge="📅 Schedule" title={t('nav.timeline')} desc="Track every key date on the path to Election Day.">
              <TimelineTracker />
            </Page>
          } />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/booth" element={
            <Page badge="📍 Locate" title={t('nav.booth')} desc="Enter your pincode to find your nearest polling station.">
              <PollingBoothLocator />
            </Page>
          } />
          <Route path="/candidates" element={
            <Page badge="👥 Compare" title={t('nav.candidates')} desc="View and compare candidates running in your constituency.">
              <CandidateList />
            </Page>
          } />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/assistant" element={
            <Page badge="🤖 Gemini AI" title={t('assistant.title')} desc={t('assistant.desc')}>
              <Assistant />
            </Page>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
