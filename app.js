import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isLocal = !process.env.PORT && !process.env.NODE_ENV;
const PORT = process.env.PORT || (isLocal ? 5010 : 3000);
const DB_FILE = path.join(__dirname, 'db.json');
const distPath = path.join(__dirname, 'dist');

// Middlewares
app.use(cors());
app.use(express.json({ limit: '25mb' })); // Support base64 image uploads

// Serve static compiled frontend React files
app.use(express.static(distPath));

const VALID_USERNAMES = ['nexbuild@gmail.com', 'nexbuild44@gmail.com', 'admin'];
const VALID_PASSWORDS = ['nexbuild@@2026', 'nexbuild2026'];

const VALID_TOKEN = 'nexbuild_session_token_2026';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  return authHeader === `Bearer ${VALID_TOKEN}`;
}

// ── GET /api/content ─────────────────────────────────────────
app.get('/api/content', (req, res) => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return res.json({ isEmpty: true });
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return res.json(JSON.parse(data));
  } catch (err) {
    console.error("Error reading database:", err);
    return res.status(500).json({ error: "Failed to read database content" });
  }
});

// ── POST /api/content ────────────────────────────────────────
app.post('/api/content', (req, res) => {
  try {
    const isSeeding = req.query.seed === 'true';
    if (!isSeeding && !checkAuth(req)) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: "Invalid data payload" });
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
    return res.json({ success: true });
  } catch (err) {
    console.error("Error writing to database:", err);
    return res.status(500).json({ error: "Failed to save data" });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const cleanUser = username.trim().toLowerCase();
  if (VALID_USERNAMES.includes(cleanUser) && VALID_PASSWORDS.includes(password)) {
    return res.json({ success: true, token: VALID_TOKEN });
  }

  return res.status(401).json({ success: false, error: "Invalid username or password credentials" });
});

// React Router SPA fallback routing (must be last)
app.get(/.*/, (req, res) => {
  const indexFile = path.join(distPath, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(404).send("Frontend assets not found. Ensure dist/ folder is built.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nexbuild Architects backend server running on http://localhost:${PORT}`);
});
