import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { LogIn, User, Loader2, Landmark } from 'lucide-react';

export const Login = () => {
  const { user, loginWithGoogle, logout, loading } = useAuth();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Loader2 size={32} className="animate-spin" color="var(--primary)" />
    </div>
  );

  if (user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 14 }}
      >
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {user.photoURL ? <img src={user.photoURL} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} /> : <User size={20} color="white" />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{user.displayName}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</div>
        </div>
        <button onClick={logout} className="button button-ghost button-sm">
          Sign out
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="content-card"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', padding: '3.5rem 2rem', background: 'linear-gradient(135deg, rgba(20,184,166,0.06), rgba(139,92,246,0.06))' }}
    >
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px var(--primary-glow)' }}>
        <Landmark size={32} color="white" />
      </div>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.6rem', fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, var(--text-primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Welcome to CivicSeva
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem', fontSize: '0.95rem' }}>
        Sign in to save your constituency, check your registration status, and get personalized election updates.
      </p>
      <button onClick={loginWithGoogle} className="button" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem', margin: '0 auto' }} aria-label="Sign in with Google">
        <LogIn size={20} /> Sign in with Google
      </button>
    </motion.div>
  );
};
