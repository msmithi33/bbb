'use strict';

// Local development entry point.
// For production, Vercel runs api/handler.js as a serverless function.
//
// Env vars (optional for local — falls back to file:bbb.db):
//   TURSO_DATABASE_URL=libsql://your-db.turso.io
//   TURSO_AUTH_TOKEN=your-token

const http = require('http');
const path = require('path');
const express = require('express');
const app = require('./api/handler');

const PORT = process.env.PORT || 3000;

// Serve static files locally (Vercel CDN handles this in production)
app.use(express.static(path.join(__dirname, '.')));

http.createServer(app).listen(PORT, () => {
  console.log(`BBB server running on http://localhost:${PORT}`);
});
