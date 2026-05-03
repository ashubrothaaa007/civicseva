import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'https://civicseva-84023535325.us-central1.run.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));

// ── RATE LIMITING ─────────────────────────────────────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 20,               // 20 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment and try again.' },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// ── GEMINI AI ─────────────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are CivicSeva AI — a friendly, non-partisan Election Assistant for Indian citizens.
Your purpose is to help people understand:
- Voter registration steps and deadlines
- Voter eligibility requirements (age, citizenship, state)
- Voting process and polling booth procedures  
- Electoral systems (FPTP, PR, EVM, etc.)
- Candidate nomination and campaign rules
- Vote counting and result declaration
- Post-election processes

Rules you must follow:
1. NEVER express political opinions or favor any candidate, party, or ideology
2. Always be encouraging about civic participation
3. Keep answers clear, concise, and factual
4. Use bullet points for step-by-step processes
5. Suggest practical next steps when relevant
6. If asked about something outside elections/civic matters, politely redirect
7. Always cite that citizens should verify information with their local Election Commission`;

/**
 * POST /api/chat — Proxies user message to Gemini AI.
 * Rate limited to 20 requests/minute per IP.
 */
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 1000 characters.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI service is not configured. Please contact the administrator.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build chat history for context
    const chatHistory = Array.isArray(history) ? history.slice(-10).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })) : [];

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I am CivicSeva AI, your non-partisan Election Assistant. How can I help you today?' }] },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return res.json({ reply });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[/api/chat] Error:', error);
    }
    return res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
});

/**
 * GET /api/health — Health check endpoint for Cloud Run.
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── STATIC FILES ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Catch-all: Only serve index.html for non-file requests
app.use((req, res) => {
  // If the request looks like a file (has an extension), don't serve index.html
  if (req.path.includes('.')) {
    return res.status(404).send('Not Found');
  }
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[CivicSeva] Server running on http://localhost:${PORT}`);
  }
});
