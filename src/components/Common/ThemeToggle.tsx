/**
 * @fileoverview ThemeToggle component — switches between light and dark modes.
 * @module components/Common/ThemeToggle
 */
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

/** ThemeToggle component — handles UI and persistence for light/dark mode. */
export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('civicseva-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('civicseva-theme', theme);
  }, [theme]);

  const toggle = (): void => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggle}
      className="button button-ghost"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        padding: '0.5rem',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
      }}
    >
      {theme === 'light' ? (
        <Moon size={18} color="var(--text-primary)" />
      ) : (
        <Sun size={18} color="var(--primary-light)" />
      )}
    </button>
  );
};
