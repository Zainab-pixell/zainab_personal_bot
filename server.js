require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const Groq = require('groq-sdk');

const REQUIRED_ENV_VARS = ['APP_USERNAME', 'APP_PASSWORD'];
const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and fill in real values before starting the server.');
  process.exit(1);
}

if (!process.env.GROQ_API_KEY) {
  console.warn('GROQ_API_KEY is not set — the login gate will work, but /api/chat will return an error until it is set.');
}

const SYSTEM_PROMPT = fs.readFileSync(path.join(__dirname, 'prompt.md'), 'utf8');
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-only-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
  })
);

function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) return next();
  return res.redirect('/login.html');
}

// Public: login page and its assets (no secrets live in these files).
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === process.env.APP_USERNAME && password === process.env.APP_PASSWORD) {
    req.session.loggedIn = true;
    return res.json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: 'Invalid username or password.' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// Protected: the bot page itself lives outside public/ so it can never be
// fetched directly by the static file server, bypassing the login check.
app.get('/', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/chat', requireLogin, async (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!groq) {
    return res.status(500).json({ error: 'Server is missing GROQ_API_KEY. Set it in .env and restart the server.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('Groq API error:', err);
    res.status(500).json({ error: 'Something went wrong talking to the bot.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
