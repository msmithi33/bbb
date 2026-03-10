'use strict';

const path    = require('path');
const express = require('express');
const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:bbb.db',
  ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

const ROUND_SIZE  = 10;
const MAX_HISTORY = 5;

// Ensure schema exists — runs once per warm instance
let dbReady = false;
async function ensureDb() {
  if (dbReady) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS players (
      key          TEXT PRIMARY KEY,
      displayName  TEXT NOT NULL,
      bestScore    INTEGER,
      gamesPlayed  INTEGER NOT NULL DEFAULT 0,
      perfectGames INTEGER NOT NULL DEFAULT 0,
      history      TEXT NOT NULL DEFAULT '[]'
    )
  `);
  dbReady = true;
}

async function getAllPlayers() {
  const { rows } = await db.execute('SELECT * FROM players');
  const result = {};
  for (const row of rows) {
    result[row.key] = {
      displayName:  row.displayName,
      bestScore:    row.bestScore,
      gamesPlayed:  row.gamesPlayed,
      perfectGames: row.perfectGames,
      history:      JSON.parse(row.history),
    };
  }
  return result;
}

// ===== EXPRESS APP =====
const app = express();
app.use(express.json());

// Ensure DB is ready before every request
app.use(async (_req, res, next) => {
  try { await ensureDb(); next(); }
  catch (e) { res.status(500).json({ error: 'DB init failed: ' + e.message }); }
});

// GET /api/players
app.get('/api/players', async (_req, res) => {
  try { res.json(await getAllPlayers()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/players/upsert  { key, displayName }
app.post('/api/players/upsert', async (req, res) => {
  const { key, displayName } = req.body;
  if (!key || !displayName) return res.status(400).json({ error: 'key and displayName required' });
  try {
    await db.execute({
      sql: `INSERT INTO players (key, displayName) VALUES (?, ?)
            ON CONFLICT(key) DO UPDATE SET displayName = excluded.displayName`,
      args: [key, displayName],
    });
    res.json((await getAllPlayers())[key]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/players/merge  { keepKey, dropKey }
app.post('/api/players/merge', async (req, res) => {
  const { keepKey, dropKey } = req.body;
  if (!keepKey || !dropKey) return res.status(400).json({ error: 'keepKey and dropKey required' });
  try {
    const [kr, dr] = await Promise.all([
      db.execute({ sql: 'SELECT * FROM players WHERE key = ?', args: [keepKey] }),
      db.execute({ sql: 'SELECT * FROM players WHERE key = ?', args: [dropKey] }),
    ]);
    const keeper  = kr.rows[0];
    const dropped = dr.rows[0];
    if (!keeper || !dropped) return res.status(404).json({ error: 'Player not found' });

    const newGames   = (Number(keeper.gamesPlayed)  || 0) + (Number(dropped.gamesPlayed)  || 0);
    const newPerfect = (Number(keeper.perfectGames) || 0) + (Number(dropped.perfectGames) || 0);
    const rawBest    = Math.max(keeper.bestScore ?? -1, dropped.bestScore ?? -1);
    const newBest    = rawBest === -1 ? null : rawBest;
    const combined   = JSON.parse(keeper.history).concat(JSON.parse(dropped.history)).slice(0, MAX_HISTORY);

    await db.batch([
      {
        sql: 'UPDATE players SET gamesPlayed=?, perfectGames=?, bestScore=?, history=? WHERE key=?',
        args: [newGames, newPerfect, newBest, JSON.stringify(combined), keepKey],
      },
      { sql: 'DELETE FROM players WHERE key=?', args: [dropKey] },
    ], 'write');

    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/players/seed  { key: playerObj, ... }  — bulk insert, skips existing
app.post('/api/players/seed', async (req, res) => {
  try {
    const stmts = Object.entries(req.body).map(([key, p]) => ({
      sql: `INSERT OR IGNORE INTO players (key, displayName, bestScore, gamesPlayed, perfectGames, history)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [key, p.displayName, p.bestScore ?? null, p.gamesPlayed || 0, p.perfectGames || 0, JSON.stringify(p.history || [])],
    }));
    if (stmts.length > 0) await db.batch(stmts, 'write');
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/players/:key/game  { score }
app.post('/api/players/:key/game', async (req, res) => {
  const { key } = req.params;
  const { score } = req.body;
  try {
    const { rows } = await db.execute({ sql: 'SELECT * FROM players WHERE key=?', args: [key] });
    const player = rows[0];
    if (!player) return res.status(404).json({ error: 'Player not found' });

    const history    = JSON.parse(player.history);
    const newBest    = (player.bestScore === null || score > player.bestScore) ? score : Number(player.bestScore);
    const newGames   = Number(player.gamesPlayed) + 1;
    const newPerfect = Number(player.perfectGames) + (score === ROUND_SIZE ? 1 : 0);

    history.unshift({ date: new Date().toLocaleDateString(), score });
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;

    await db.execute({
      sql: 'UPDATE players SET bestScore=?, gamesPlayed=?, perfectGames=?, history=? WHERE key=?',
      args: [newBest, newGames, newPerfect, JSON.stringify(history), key],
    });

    res.json((await getAllPlayers())[key]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/players/:key
app.delete('/api/players/:key', async (req, res) => {
  try {
    await db.execute({ sql: 'DELETE FROM players WHERE key=?', args: [req.params.key] });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/debug', (_req, res) => {
  const fs = require('fs');
  res.json({
    dirname: __dirname,
    dirContents: fs.readdirSync(__dirname),
    hasIndex: fs.existsSync(require('path').join(__dirname, 'index.html')),
  });
});

// Serve static files.
// In production (Vercel): vercel-build copies index.html/css/js/assets/img into api/,
// so __dirname (/var/task/api) contains everything.
// In local dev: server.js adds its own express.static at the project root as a fallback.
app.use(express.static(__dirname));

module.exports = app;
