/**
 * @fileoverview Language switcher component for multi-language support.
 * @module components/Common/LanguageSwitcher
 */
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हि', full: 'हिन्दी' },
  { code: 'ta', label: 'த', full: 'தமிழ்' },
];

/** Language switcher button group. */
export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const current = i18n.language.split('-')[0];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.3rem 0.5rem' }}>
      <Globe size={14} color="var(--text-muted)" />
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          title={lang.full}
          aria-label={`Switch to ${lang.full}`}
          aria-pressed={current === lang.code}
          style={{
            background: current === lang.code ? 'var(--primary-glow)' : 'transparent',
            border: `1px solid ${current === lang.code ? 'rgba(20,184,166,0.4)' : 'transparent'}`,
            borderRadius: 6,
            padding: '0.2rem 0.5rem',
            color: current === lang.code ? 'var(--primary-light)' : 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: current === lang.code ? 700 : 400,
            cursor: 'pointer',
            transition: 'all 0.15s',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
