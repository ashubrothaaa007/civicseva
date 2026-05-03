/**
 * @fileoverview Notifications panel — Firestore-based election reminders.
 * @module components/Dashboard/Notifications
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Notification } from '../../types';

const mockNotifications: Notification[] = [
  { id: 'n1', userId: '', title: '📅 Registration Deadline in 7 Days', body: 'Voter registration closes on September 15, 2026. Register now to avoid missing out!', createdAt: Date.now() - 86400000, read: false, type: 'reminder' },
  { id: 'n2', userId: '', title: '🗳️ Election Day: November 3rd', body: 'Mark your calendar! Polling booths will be open from 7:00 AM to 6:00 PM.', createdAt: Date.now() - 172800000, read: false, type: 'alert' },
  { id: 'n3', userId: '', title: '✅ Your Registration Was Confirmed', body: 'Your name has been added to the electoral roll for Downtown constituency.', createdAt: Date.now() - 604800000, read: true, type: 'info' },
];

const iconMap = {
  reminder: <CheckCircle size={16} color="var(--primary)" />,
  alert: <AlertTriangle size={16} color="var(--warning)" />,
  info: <Info size={16} color="var(--purple)" />,
};

/** Notifications panel with mark-as-read and dismiss functionality. */
export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = (id: string): void => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id: string): void => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = (): void => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const formatTime = (ts: number): string => {
    const diff = Date.now() - ts;
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 10, padding: '0.5rem 0.75rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative', transition: 'all 0.2s' }}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{ position: 'absolute', right: 0, top: '110%', width: 360, background: 'var(--sidebar-bg)', border: '1px solid var(--border-strong)', borderRadius: 16, zIndex: 200, backdropFilter: 'blur(20px)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            role="dialog"
            aria-label="Notifications"
          >
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif' }}>Notifications</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ fontSize: '0.75rem', color: 'var(--primary-light)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Mark all read</button>
                )}
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} aria-label="Close notifications">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <BellOff size={28} style={{ margin: '0 auto 0.75rem' }} />
                  <p style={{ fontSize: '0.88rem' }}>No notifications</p>
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: n.read ? 'transparent' : 'var(--surface)', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-strong)')}
                    onMouseLeave={e => (e.currentTarget.style.background = n.read ? 'transparent' : 'var(--surface)')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && markRead(n.id)}
                    aria-label={`Notification: ${n.title}`}
                  >
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <div style={{ marginTop: '2px' }}>{iconMap[n.type]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: n.read ? 500 : 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{n.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.body}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{formatTime(n.createdAt)}</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); dismiss(n.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.1rem', flexShrink: 0 }} aria-label="Dismiss notification">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
