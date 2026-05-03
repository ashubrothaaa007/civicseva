/**
 * @fileoverview AI Election Assistant chat component using Gemini API.
 * @module components/Guide/Assistant
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Send, Loader2, Bot, User } from 'lucide-react';
import type { ChatMessage } from '../../types';

const SUGGESTED_QUESTIONS = [
  'How do I register to vote in India?',
  'What ID is needed on voting day?',
  'How does the EVM work?',
  'When are election results declared?',
  'What is the Model Code of Conduct?',
];

/** AI Election Assistant component with chat history. */
export const Assistant: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t('assistant.welcome'), timestamp: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: updatedMessages.slice(-10),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Server error');
      }

      const data = await res.json() as { reply: string };
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, timestamp: Date.now() }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Connection error.';
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${msg} Please try again.`, timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendMessage(input);
  };

  const renderContent = (text: string): string =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');

  return (
    <motion.div className="content-card" style={{ padding: 0 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bot size={18} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem' }}>CivicSeva AI</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
            {t('assistant.online')}
          </div>
        </div>
        <MessageCircle size={18} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
      </div>

      {/* Messages */}
      <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: msg.role === 'user' ? 'linear-gradient(135deg, var(--primary), #0d9488)' : 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                {msg.role === 'user' ? <User size={14} color="white" /> : <Bot size={14} color="var(--primary-light)" />}
              </div>
              <div
                className={msg.role === 'user' ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-ai'}
                dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }} aria-label="AI is responding">
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
              <Bot size={14} color="var(--primary-light)" />
            </div>
            <div className="chat-bubble chat-bubble-ai">
              <Loader2 size={16} className="animate-spin" color="var(--primary-light)" />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div style={{ padding: '0.75rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--border)' }}>
          {SUGGESTED_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => void sendMessage(q)}
              aria-label={`Ask: ${q}`}
              style={{ padding: '0.4rem 0.9rem', background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: '9999px', color: 'var(--primary-light)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.18s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(20,184,166,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(20,184,166,0.07)')}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="chat-input-area">
        <input
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('assistant.inputPlaceholder')}
          disabled={loading}
          maxLength={1000}
          aria-label="Chat input"
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="button"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          style={{ padding: '0.65rem 1rem', flexShrink: 0 }}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </motion.div>
  );
};
