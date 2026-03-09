/* ===== BBB — Ball, Base, Back Up, Blast! — app.js ===== */
'use strict';

// ===== CONSTANTS =====
const STORAGE_CURRENT = 'bbb_currentPlayer';
const ROUND_SIZE = 10;
const MAX_HISTORY = 5;
const WRONG_CHOICES = 4; // wrong answers shown per question

const BALLPARK_IMAGES = [
  'img/ballparks/camden.jpg', 'img/ballparks/fenway.jpg',
  'img/ballparks/yankee.jpg', 'img/ballparks/rogers.jpg',
  'img/ballparks/guaranteed.jpg', 'img/ballparks/progressive.jpg',
  'img/ballparks/comerica.jpg', 'img/ballparks/kauffman.jpg',
  'img/ballparks/target.jpg', 'img/ballparks/minutemaid.jpg',
  'img/ballparks/angel.jpg', 'img/ballparks/tmobile.jpg',
  'img/ballparks/globelife.jpg', 'img/ballparks/tropicana.jpg',
  'img/ballparks/truist.jpg', 'img/ballparks/wrigley.jpg',
  'img/ballparks/greatamerican.jpg', 'img/ballparks/coors.jpg',
  'img/ballparks/americanfamily.jpg', 'img/ballparks/chase.jpg',
  'img/ballparks/dodger.jpg', 'img/ballparks/petco.jpg',
  'img/ballparks/oracle.jpg', 'img/ballparks/nationals.jpg',
  'img/ballparks/citi.jpg', 'img/ballparks/citizensbank.jpg',
  'img/ballparks/busch.jpg', 'img/ballparks/loandepot.jpg',
  'img/ballparks/pnc.jpg'
];

const BALLPARK_INFO = {
  camden:         { park: 'Camden Yards',              team: 'Baltimore Orioles' },
  fenway:         { park: 'Fenway Park',               team: 'Boston Red Sox' },
  yankee:         { park: 'Yankee Stadium',            team: 'New York Yankees' },
  rogers:         { park: 'Rogers Centre',             team: 'Toronto Blue Jays' },
  guaranteed:     { park: 'Guaranteed Rate Field',     team: 'Chicago White Sox' },
  progressive:    { park: 'Progressive Field',         team: 'Cleveland Guardians' },
  comerica:       { park: 'Comerica Park',             team: 'Detroit Tigers' },
  kauffman:       { park: 'Kauffman Stadium',          team: 'Kansas City Royals' },
  target:         { park: 'Target Field',              team: 'Minnesota Twins' },
  minutemaid:     { park: 'Minute Maid Park',          team: 'Houston Astros' },
  angel:          { park: 'Angel Stadium',             team: 'Los Angeles Angels' },
  tmobile:        { park: 'T-Mobile Park',             team: 'Seattle Mariners' },
  globelife:      { park: 'Globe Life Field',          team: 'Texas Rangers' },
  tropicana:      { park: 'Tropicana Field',           team: 'Tampa Bay Rays' },
  truist:         { park: 'Truist Park',               team: 'Atlanta Braves' },
  wrigley:        { park: 'Wrigley Field',             team: 'Chicago Cubs' },
  greatamerican:  { park: 'Great American Ball Park',  team: 'Cincinnati Reds' },
  coors:          { park: 'Coors Field',               team: 'Colorado Rockies' },
  americanfamily: { park: 'American Family Field',     team: 'Milwaukee Brewers' },
  chase:          { park: 'Chase Field',               team: 'Arizona Diamondbacks' },
  dodger:         { park: 'Dodger Stadium',            team: 'Los Angeles Dodgers' },
  petco:          { park: 'Petco Park',                team: 'San Diego Padres' },
  oracle:         { park: 'Oracle Park',               team: 'San Francisco Giants' },
  nationals:      { park: 'Nationals Park',            team: 'Washington Nationals' },
  citi:           { park: 'Citi Field',                team: 'New York Mets' },
  citizensbank:   { park: 'Citizens Bank Park',        team: 'Philadelphia Phillies' },
  busch:          { park: 'Busch Stadium',             team: 'St. Louis Cardinals' },
  loandepot:      { park: 'loanDepot park',            team: 'Miami Marlins' },
  pnc:            { park: 'PNC Park',                  team: 'Pittsburgh Pirates' },
};

let lastBgIndex = -1;

// ===== STATE =====
const state = {
  players: {},       // in-memory cache, updated by WS pushes
  currentPlayer: null,   // string: normalized (lowercase) player key
  questions: [],         // array of 10 question objects for this round
  currentIndex: 0,       // 0–9
  score: 0,
  answered: false        // has the current question been answered?
};

// ===== ADMIN & NAME HELPERS =====
function isAdmin(name) {
  return String(name).toLowerCase().startsWith('coach');
}

function normalizeName(name) {
  return String(name).trim().toLowerCase();
}

// ===== BACKGROUND ROTATION =====
function rotateBg() {
  const overlay = document.getElementById('bg-overlay');
  if (!overlay || BALLPARK_IMAGES.length === 0) return;

  let idx;
  do {
    idx = Math.floor(Math.random() * BALLPARK_IMAGES.length);
  } while (idx === lastBgIndex && BALLPARK_IMAGES.length > 1);

  lastBgIndex = idx;
  overlay.style.backgroundImage = 'url(' + BALLPARK_IMAGES[idx] + ')';

  const key = BALLPARK_IMAGES[idx].replace('img/ballparks/', '').replace('.jpg', '');
  const info = BALLPARK_INFO[key];
  if (info) {
    document.getElementById('park-label-name').textContent = info.park;
    document.getElementById('park-label-team').textContent = info.team;
  }
}

// ===== API HELPERS =====
async function fetchPlayers() {
  const res = await fetch('/api/players');
  return res.json();
}

async function apiUpsertPlayer(key, displayName) {
  await fetch('/api/players/upsert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, displayName })
  });
}

async function apiRecordGame(key, score) {
  await fetch('/api/players/' + encodeURIComponent(key) + '/game', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score })
  });
}

async function apiDeletePlayer(key) {
  await fetch('/api/players/' + encodeURIComponent(key), { method: 'DELETE' });
}

async function apiMergePlayers(keepKey, dropKey) {
  await fetch('/api/players/merge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keepKey, dropKey })
  });
}

// ===== POLLING CLIENT =====
// Vercel serverless functions don't support persistent WebSocket connections,
// so we poll the REST API every 5 seconds to keep state.players in sync.
function startPolling() {
  setInterval(async function() {
    try {
      const players = await fetchPlayers();
      state.players = players;
      refreshCurrentScreenIfNeeded();
    } catch (e) {
      // silent — don't disrupt the game on transient network errors
    }
  }, 5000);
}

function refreshCurrentScreenIfNeeded() {
  const active = document.querySelector('.screen--active');
  if (!active) return;
  const id = active.id;
  if (id === 'screen-home') showHomeScreen();
  else if (id === 'screen-leaderboard') showLeaderboard();
  else if (id === 'screen-stats' && isAdmin(state.currentPlayer)) showPlayerStats();
}

// ===== STORAGE LAYER (session only) =====
function loadCurrentPlayer() {
  try {
    return localStorage.getItem(STORAGE_CURRENT) || null;
  } catch (e) {
    return null;
  }
}

function saveCurrentPlayer(name) {
  try {
    if (name) {
      localStorage.setItem(STORAGE_CURRENT, name);
    } else {
      localStorage.removeItem(STORAGE_CURRENT);
    }
  } catch (e) {
    // silent fail
  }
}

// ===== NAVIGATION =====
function showScreen(id) {
  rotateBg();
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('screen--active');
  });
  const target = document.getElementById(id);
  if (target) target.classList.add('screen--active');
  window.scrollTo(0, 0);
}

// ===== UTILITIES =====
function shuffle(arr) {
  // Fisher-Yates in-place shuffle; returns the array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectQuestions(bank) {
  // Shuffle a copy and take first ROUND_SIZE
  const copy = bank.slice();
  shuffle(copy);
  return copy.slice(0, ROUND_SIZE);
}

function buildAnswerOptions(question) {
  const posCode = question.position.match(/\((\w+)\)/)[1];
  const correct = window.ANSWERS.find(function(a) { return a.id === question.correct; });

  // Filter pool: applicable to position, exclude correct answer
  const pool = window.ANSWERS.filter(function(a) {
    return a.id !== question.correct &&
      (a.pos === 'all' || a.pos.indexOf(posCode) !== -1);
  });

  // Try to include one wrong answer from each category other than the correct's
  const cats = ['ball', 'base', 'backup', 'joke'];
  const wrongs = [];
  const usedIds = {};
  cats.forEach(function(cat) {
    if (cat === correct.cat) return;
    const opts = pool.filter(function(a) { return a.cat === cat && !usedIds[a.id]; });
    if (!opts.length) return;
    const pick = opts[Math.floor(Math.random() * opts.length)];
    wrongs.push(pick);
    usedIds[pick.id] = true;
  });

  // Fill remaining slots from any category
  const remaining = pool.filter(function(a) { return !usedIds[a.id]; });
  shuffle(remaining);
  while (wrongs.length < WRONG_CHOICES && remaining.length) {
    wrongs.push(remaining.shift());
  }

  return shuffle([correct].concat(wrongs));
}

// ===== LOGIN SCREEN =====
function initLoginScreen() {
  const input = document.getElementById('name-input');
  const welcomeBack = document.getElementById('welcome-back');
  const welcomeName = document.getElementById('welcome-name');
  const error = document.getElementById('name-error');

  // Reset state
  input.value = '';
  welcomeBack.hidden = true;
  error.hidden = true;
  input.classList.remove('input--error');
  input.focus();

  function checkWelcomeBack() {
    const name = input.value.trim();
    const key = normalizeName(name);
    error.hidden = true;
    input.classList.remove('input--error');
    if (name.length > 0) {
      const player = state.players[key];
      if (player) {
        welcomeName.textContent = player.displayName || name;
        welcomeBack.hidden = false;
      } else {
        welcomeBack.hidden = true;
      }
    } else {
      welcomeBack.hidden = true;
    }
  }

  input.addEventListener('input', checkWelcomeBack);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleLogin();
  });

  document.getElementById('btn-play').onclick = handleLogin;
}

async function handleLogin() {
  const input = document.getElementById('name-input');
  const error = document.getElementById('name-error');
  const name = input.value.trim();

  if (!name) {
    error.hidden = false;
    input.classList.add('input--error');
    input.focus();
    return;
  }

  const key = normalizeName(name);
  state.currentPlayer = key;
  saveCurrentPlayer(key);
  await apiUpsertPlayer(key, name.trim());
  showHomeScreen();
}

// ===== HOME SCREEN =====
function showHomeScreen() {
  showScreen('screen-home');

  const player = state.players[state.currentPlayer] || { displayName: state.currentPlayer, bestScore: null, gamesPlayed: 0, perfectGames: 0, history: [] };
  const displayName = player.displayName || state.currentPlayer;

  document.getElementById('home-player-name').textContent = displayName + "'s Stats";
  document.getElementById('stat-best').textContent = player.bestScore !== null ? player.bestScore + '/10' : '—';
  document.getElementById('stat-games').textContent = player.gamesPlayed;
  document.getElementById('stat-perfect').textContent = player.perfectGames;

  renderHistoryList(player.history);

  document.getElementById('btn-start').onclick = startRound;
  document.getElementById('btn-logout').onclick = handleLogout;
  document.getElementById('btn-leaderboard').onclick = showLeaderboard;

  const statsBtn = document.getElementById('btn-player-stats');
  if (isAdmin(state.currentPlayer)) {
    statsBtn.hidden = false;
    statsBtn.onclick = showPlayerStats;
  } else {
    statsBtn.hidden = true;
  }
}

function renderHistoryList(history) {
  const list = document.getElementById('history-list');
  if (!history || history.length === 0) {
    list.innerHTML = '<li class="history-empty">No rounds yet — let\'s play!</li>';
    return;
  }
  list.innerHTML = history.map(function(entry) {
    const isPerfect = entry.score === ROUND_SIZE;
    return '<li class="history-item">' +
      '<span class="history-date">' + escapeHtml(entry.date) + '</span>' +
      '<span class="history-score' + (isPerfect ? ' history-score--perfect' : '') + '">' +
        entry.score + '/10' + (isPerfect ? ' ⭐' : '') +
      '</span>' +
    '</li>';
  }).join('');
}

function handleLogout() {
  state.currentPlayer = null;
  saveCurrentPlayer(null);
  showScreen('screen-login');
  initLoginScreen();
}

// ===== LEADERBOARD SCREEN =====
function showLeaderboard() {
  showScreen('screen-leaderboard');

  const rows = Object.values(state.players)
    .filter(function(p) { return !isAdmin(p.displayName || ''); })
    .sort(function(a, b) { return (b.bestScore ?? -1) - (a.bestScore ?? -1); });

  const tbody = document.getElementById('leaderboard-body');
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--gray-500);padding:20px;">No players yet!</td></tr>';
  } else {
    tbody.innerHTML = rows.map(function(p, i) {
      const isMe = (p.displayName || '').toLowerCase() === state.currentPlayer;
      return '<tr' + (isMe ? ' class="leaderboard-me"' : '') + '>' +
        '<td class="rank-cell">' + (i + 1) + '</td>' +
        '<td>' + escapeHtml(p.displayName || '—') + '</td>' +
        '<td>' + (p.bestScore !== null && p.bestScore !== undefined ? p.bestScore + '/10' : '—') + '</td>' +
        '<td>' + (p.gamesPlayed || 0) + '</td>' +
        '<td>' + (p.perfectGames || 0) + '</td>' +
      '</tr>';
    }).join('');
  }

  document.getElementById('btn-leaderboard-back').onclick = showHomeScreen;
}

// ===== PLAYER STATS SCREEN (admin only) =====
function showPlayerStats() {
  if (!isAdmin(state.currentPlayer)) return;
  showScreen('screen-stats');

  const rows = Object.entries(state.players)
    .filter(function(entry) { return !isAdmin(entry[1].displayName || ''); });

  const tbody = document.getElementById('stats-body');
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--gray-500);padding:20px;">No players yet!</td></tr>';
  } else {
    tbody.innerHTML = rows.map(function(entry) {
      const key = entry[0];
      const p = entry[1];
      const lastPlayed = (p.history && p.history.length > 0) ? p.history[0].date : '—';
      return '<tr>' +
        '<td>' + escapeHtml(p.displayName || '—') + '</td>' +
        '<td>' + (p.bestScore !== null && p.bestScore !== undefined ? p.bestScore + '/10' : '—') + '</td>' +
        '<td>' + (p.gamesPlayed || 0) + '</td>' +
        '<td>' + (p.perfectGames || 0) + '</td>' +
        '<td>' + escapeHtml(lastPlayed) + '</td>' +
        '<td><button class="btn btn--sm btn--danger action-remove" data-key="' + escapeAttr(key) + '">Remove</button></td>' +
      '</tr>';
    }).join('');

    tbody.addEventListener('click', async function(e) {
      const btn = e.target.closest('.action-remove');
      if (!btn) return;
      const key = btn.getAttribute('data-key');
      const name = btn.closest('tr').querySelector('td').textContent;
      if (confirm('Remove ' + name + '? This cannot be undone.')) {
        await apiDeletePlayer(key);
        // WS push will refresh the screen automatically
      }
    });
  }

  populateMergeSelects(state.players);
  document.getElementById('btn-stats-back').onclick = showHomeScreen;
}

function populateMergeSelects(players) {
  const names = Object.keys(players)
    .filter(function(k) { return !isAdmin(k); })
    .map(function(k) { return { key: k, display: players[k].displayName || k }; })
    .sort(function(a, b) { return a.display.localeCompare(b.display); });

  ['merge-keep', 'merge-drop'].forEach(function(id) {
    const sel = document.getElementById(id);
    sel.innerHTML = names.map(function(n) {
      return '<option value="' + escapeAttr(n.key) + '">' + escapeHtml(n.display) + '</option>';
    }).join('');
  });

  const drop = document.getElementById('merge-drop');
  if (drop.options.length > 1) drop.selectedIndex = 1;

  document.getElementById('btn-merge').onclick = async function() {
    const keepKey = document.getElementById('merge-keep').value;
    const dropKey = document.getElementById('merge-drop').value;
    if (keepKey === dropKey) {
      showMergeStatus('Choose two different players.', false);
      return;
    }
    const keepName = (state.players[keepKey] || {}).displayName || keepKey;
    const dropName = (state.players[dropKey] || {}).displayName || dropKey;
    if (confirm('Merge "' + dropName + '" into "' + keepName + '"? "' + dropName + '" will be deleted.')) {
      await apiMergePlayers(keepKey, dropKey);
      // WS push will refresh the screen automatically
    }
  };
}

function showMergeStatus(message, ok) {
  const el = document.getElementById('merge-status');
  el.hidden = false;
  el.textContent = message;
  el.className = 'merge-status ' + (ok ? 'merge-status--ok' : 'merge-status--err');
}

// ===== QUIZ ENGINE =====
function startRound() {
  // Validate question bank
  if (!window.ANSWERS || !window.QUESTIONS || window.QUESTIONS.length < ROUND_SIZE) {
    alert('Heads up! The question bank didn\'t load — please refresh the page to get started.');
    return;
  }

  state.questions = selectQuestions(window.QUESTIONS);
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;

  showScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  state.answered = false;

  // Progress
  updateProgress();

  // Position badge
  document.getElementById('position-badge').textContent = q.position;

  // Scenario
  document.getElementById('scenario-text').textContent = q.scenario;

  // Score badge
  document.getElementById('score-val').textContent = state.score;

  // Build answer buttons
  buildAnswerButtons(q);

  // Hide feedback
  const feedbackBox = document.getElementById('feedback-box');
  feedbackBox.hidden = true;
  feedbackBox.className = 'feedback-box';
}

function buildAnswerButtons(question) {
  const container = document.getElementById('answers-container');
  const options = buildAnswerOptions(question);

  container.innerHTML = options.map(function(answer, idx) {
    return '<button class="answer-btn" data-idx="' + idx + '" data-id="' + escapeAttr(answer.id) + '">' +
      escapeHtml(answer.text) +
    '</button>';
  }).join('');

  container.querySelectorAll('.answer-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      onAnswerClick(btn, question);
    });
  });
}

function onAnswerClick(btn, question) {
  if (state.answered) return;
  state.answered = true;

  const chosen = btn.getAttribute('data-id');
  const isCorrect = chosen === question.correct;

  // Disable all buttons and color them
  const allBtns = document.querySelectorAll('.answer-btn');
  allBtns.forEach(function(b) {
    b.disabled = true;
    const answer = b.getAttribute('data-id');
    if (answer === question.correct) {
      b.classList.add('answer--correct');
    } else if (b === btn && !isCorrect) {
      b.classList.add('answer--wrong');
    } else {
      b.classList.add('answer--disabled');
    }
  });

  if (isCorrect) {
    state.score += 1;
    document.getElementById('score-val').textContent = state.score;
  }

  showFeedback(isCorrect, question.explanation);
}

function showFeedback(isCorrect, explanation) {
  const box = document.getElementById('feedback-box');
  const icon = document.getElementById('feedback-icon');
  const text = document.getElementById('feedback-text');
  const btnNext = document.getElementById('btn-next');

  box.hidden = false;
  box.className = 'feedback-box ' + (isCorrect ? 'feedback-box--correct' : 'feedback-box--wrong');
  icon.textContent = isCorrect ? '✅' : '💡';

  const label = isCorrect ? 'Nice work! ' : 'Good thinking — here\'s the play: ';
  text.innerHTML = '<strong>' + label + '</strong>' + escapeHtml(explanation);

  const isLast = state.currentIndex === state.questions.length - 1;
  btnNext.textContent = isLast ? 'See My Score →' : 'Next Question →';
  btnNext.onclick = onNext;
}

function updateProgress() {
  const total = state.questions.length;
  const current = state.currentIndex + 1;
  const pct = (current / total) * 100;

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = current + ' / ' + total;
}

async function onNext() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    await finishRound();
  }
}

// ===== RESULTS SCREEN =====
async function finishRound() {
  await apiRecordGame(state.currentPlayer, state.score);
  showResults();
}

function showResults() {
  showScreen('screen-results');

  const score = state.score;
  document.getElementById('results-score').textContent = score;
  document.getElementById('results-trophy').textContent = trophyEmoji(score);
  document.getElementById('results-score-text').textContent = scoreHeading(score);
  document.getElementById('results-encourage').textContent = encouragementMessage(score);

  document.getElementById('btn-play-again').onclick = startRound;
  document.getElementById('btn-home').onclick = function() {
    showHomeScreen();
  };
}

function trophyEmoji(score) {
  if (score === 10) return '🏆';
  if (score >= 8)  return '⭐';
  if (score >= 6)  return '⚾';
  if (score >= 4)  return '🧢';
  return '🤔';
}

function scoreHeading(score) {
  if (score === 10) return 'Perfect Game!';
  if (score >= 8)  return 'Great Job!';
  if (score >= 6)  return 'Getting There!';
  if (score >= 4)  return 'Keep Practicing!';
  return 'Room to Grow!';
}

function encouragementMessage(score) {
  if (score === 10) return 'You answered every question correctly! You really know your positions!';
  if (score >= 8)  return 'Excellent work! You know most of your fielding responsibilities. A few more rounds and you\'ll be perfect!';
  if (score >= 6)  return 'Solid effort! Keep studying the Ball, Base, Backup concept and your score will climb.';
  if (score >= 4)  return 'You\'re learning the game! Review the positions you missed and try again — you\'ve got this.';
  return 'Baseball takes practice — on and off the field! Study each position\'s responsibilities and give it another go.';
}

// ===== SECURITY HELPERS =====
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

// ===== BOOTSTRAP =====
async function init() {
  startPolling();

  try {
    state.players = await fetchPlayers();
  } catch (e) {
    console.warn('[BBB] Could not reach server:', e);
  }

  const savedPlayer = loadCurrentPlayer();
  if (savedPlayer) {
    const key = normalizeName(savedPlayer);
    if (state.players[key]) {
      state.currentPlayer = key;
      showHomeScreen();
      return;
    }
  }

  showScreen('screen-login');
  initLoginScreen();
}

function syncHeaderHeight() {
  const h = document.getElementById('game-title-bar');
  if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
}

window.addEventListener('resize', syncHeaderHeight);
document.addEventListener('DOMContentLoaded', () => {
  // Wait one frame for the SVG image to size itself before measuring
  requestAnimationFrame(() => { syncHeaderHeight(); init(); });
});
