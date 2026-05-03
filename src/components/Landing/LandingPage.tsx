/**
 * @fileoverview Professional Landing Page for CivicSeva.
 * @module components/Landing/LandingPage
 */
import { motion } from 'framer-motion';
import { Landmark, ArrowRight, Shield, Search, MessageSquare } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="landing-container" style={{ 
      overflowX: 'hidden', 
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Animated Background Elements */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              width: 200 + i * 100,
              height: 200 + i * 100,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'var(--primary-glow)' : 'var(--purple-glow)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(80px)',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: '99px', 
            background: 'var(--surface)', 
            border: '1px solid var(--border)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--primary-light)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
          Trusted by 50,000+ Voters
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)', 
            fontWeight: 900, 
            lineHeight: 0.95,
            marginBottom: '1.5rem',
            background: 'linear-gradient(to bottom, #ffffff 40%, rgba(255,255,255,0.4))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.05em'
          }}
        >
          DEMOCRACY <br /> 
          <span style={{ color: 'var(--primary-light)', WebkitTextFillColor: 'initial' }}>INTELLIGENT.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '700px',
            marginBottom: '3rem',
            lineHeight: 1.6
          }}
        >
          Experience the future of civic engagement. CivicSeva combines Gemini AI 
          with real-time election data to guide your democratic journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button 
            className="button" 
            style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '14px' }} 
            onClick={onStart}
          >
            Launch Assistant <ArrowRight size={22} />
          </button>
          <a 
            href="#features" 
            className="button button-ghost" 
            style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '14px' }}
          >
            Explore Tools
          </a>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { value: '24/7', label: 'AI Support' },
            { value: '100%', label: 'Non-Partisan' },
            { value: '3+', label: 'Indian Languages' },
            { value: 'Instant', label: 'Booth Search' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '8rem 2rem', maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Smart Tools for Smart Voters</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Everything you need to participate in democracy, simplified.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {[
            { 
              icon: <Shield size={28} color="var(--primary)" />, 
              title: "Digital Eligibility", 
              desc: "Instant verification of your voting rights based on current Indian constitutional laws." 
            },
            { 
              icon: <Search size={28} color="var(--secondary)" />, 
              title: "Precise Mapping", 
              desc: "Integrated Google Maps support to find your exact polling booth coordinates in seconds." 
            },
            { 
              icon: <MessageSquare size={28} color="var(--purple)" />, 
              title: "AI Wisdom", 
              desc: "Powered by Gemini 1.5 Flash to answer complex questions about candidates and policies." 
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -12, borderColor: 'var(--primary)' }}
              className="content-card"
              style={{ padding: '3rem', height: '100%', border: '1px solid var(--border)' }}
            >
              <div style={{ 
                width: 64, height: 64, borderRadius: '18px', background: 'var(--surface-strong)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' 
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Footer */}
      <footer style={{ padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
          <Landmark size={24} color="var(--primary)" /> CivicSeva
        </div>
        <p style={{ opacity: 0.5, fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
          CivicSeva is an independent platform. We are not affiliated with the Election Commission of India. 
          All data is sourced from public records and interpreted by AI for educational purposes.
        </p>
      </footer>
    </div>
  );
};
