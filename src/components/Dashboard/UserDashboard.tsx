import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Login } from '../Auth/Login';
import { ShieldCheck, MapPin, Loader2, Calendar, Vote, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Loader2 size={32} className="animate-spin" color="var(--primary)" />
    </div>
  );

  if (!user) return (
    <div>
      <div className="page-header">
        <div className="page-header-badge">🗳️ Civic Platform</div>
        <h1 className="page-title">Your Election Dashboard</h1>
        <p className="page-description">Sign in to access personalized election information and track your civic journey.</p>
      </div>
      <Login />
    </div>
  );

  const stats = [
    { icon: <User size={22} />, label: 'Verified Age', value: '24 Years', color: 'var(--primary)', bg: 'var(--primary-glow)' },
    { icon: <ShieldCheck size={22} />, label: 'Registration', value: user.registered ? 'Verified' : 'Pending', color: user.registered ? 'var(--success)' : 'var(--warning)', bg: user.registered ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)' },
    { icon: <MapPin size={22} />, label: 'Constituency', value: user.constituency || 'Not Set', color: 'var(--purple)', bg: 'var(--purple-glow)' },
    { icon: <Calendar size={22} />, label: 'Next Election', value: 'Nov 3, 2026', color: 'var(--secondary)', bg: 'var(--secondary-glow)' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-badge">👋 Welcome back</div>
        <h1 className="page-title">{user.displayName?.split(' ')[0]}'s Profile</h1>
        <p className="page-description">Your voter profile and preparedness status at a glance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <motion.div className="content-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="card-title">Voter Readiness</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" strokeWidth="8" 
                  strokeDasharray="283" 
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * 0.75) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <span style={{ position: 'absolute', fontSize: '1.25rem', fontWeight: 800 }}>75%</span>
            </div>
            <div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Almost ready to vote!</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Complete your constituency check to reach 100%.</p>
            </div>
          </div>
        </motion.div>

        <Login />
      </div>

      <div className="stat-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="stat-card-icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-card-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div className="content-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="card-title"><Vote size={22} /> Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'Check Registration', path: '/registration', color: 'var(--primary)' },
            { label: 'View Timeline', path: '/timeline', color: 'var(--purple)' },
            { label: 'Find My Booth', path: '/booth', color: 'var(--secondary)' },
            { label: 'Ask AI Assistant', path: '/assistant', color: 'var(--success)' },
          ].map(a => (
            <button
              key={a.path}
              onClick={() => navigate(a.path)}
              style={{ padding: '1rem', background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 12, color: a.color, fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = a.color + '44'; e.currentTarget.style.background = a.color + '10'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-muted)'; }}
            >
              {a.label}
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
