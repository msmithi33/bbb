/* ===== BBB — Ball, Base, Back Up, Blast! — app.js ===== */
'use strict';

// ===== CONSTANTS =====
const STORAGE_CURRENT = 'bbb_currentPlayer';
const STORAGE_ROUND = 'bbb_round';
const STORAGE_LOCAL_PLAYERS = 'bbb_localPlayers';
const ROUND_SIZE = 10;
const MAX_HISTORY = 5;
const WRONG_CHOICES = 4; // wrong answers shown per question

const BALLPARK_IMAGES = [
  'assets/images/ballparks/camden.jpg', 'assets/images/ballparks/fenway.jpg',
  'assets/images/ballparks/yankee.jpg', 'assets/images/ballparks/rogers.jpg',
  'assets/images/ballparks/guaranteed.jpg', 'assets/images/ballparks/progressive.jpg',
  'assets/images/ballparks/comerica.jpg', 'assets/images/ballparks/kauffman.jpg',
  'assets/images/ballparks/target.jpg', 'assets/images/ballparks/minutemaid.jpg',
  'assets/images/ballparks/angel.jpg', 'assets/images/ballparks/tmobile.jpg',
  'assets/images/ballparks/globelife.jpg', 'assets/images/ballparks/tropicana.jpg',
  'assets/images/ballparks/truist.jpg', 'assets/images/ballparks/wrigley.jpg',
  'assets/images/ballparks/greatamerican.jpg', 'assets/images/ballparks/coors.jpg',
  'assets/images/ballparks/americanfamily.jpg', 'assets/images/ballparks/chase.jpg',
  'assets/images/ballparks/dodger.jpg', 'assets/images/ballparks/petco.jpg',
  'assets/images/ballparks/oracle.jpg', 'assets/images/ballparks/nationals.jpg',
  'assets/images/ballparks/citi.jpg', 'assets/images/ballparks/citizensbank.jpg',
  'assets/images/ballparks/busch.jpg', 'assets/images/ballparks/loandepot.jpg',
  'assets/images/ballparks/pnc.jpg'
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
let _popstateNav = false;

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

function looksLikeFakeName(name) {
  const n = name.trim().toLowerCase();
  if (n.startsWith('coach')) return false;
  if (n.length < 2) return true;
  if (/^\d+$/.test(n)) return true;
  if (/^(qwer|asdf|zxcv)/.test(n)) return true;
  if (n.length > 3 && !/[aeiou]/.test(n)) return true;
  if (/(.)\1{2,}/.test(n)) return true;
  const BLOCKLIST = ['test','asdf','qwerty','player','user','anon','anonymous','foo','bar','fake','unknown','nobody','name','abc','xyz','hello'];
  if (BLOCKLIST.includes(n)) return true;
  return false;
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

  const key = BALLPARK_IMAGES[idx].replace('assets/images/ballparks/', '').replace('.jpg', '');
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

async function apiRecordAnswer(questionId, isCorrect) {
  await fetch('/api/questions/' + encodeURIComponent(questionId) + '/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correct: isCorrect })
  });
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

function loadLocalPlayers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_LOCAL_PLAYERS) || '[]');
  } catch(e) { return []; }
}

function addLocalPlayer(key, displayName) {
  try {
    const list = loadLocalPlayers();
    if (!list.find(function(p) { return p.key === key; })) {
      list.push({ key: key, displayName: displayName });
      localStorage.setItem(STORAGE_LOCAL_PLAYERS, JSON.stringify(list));
    }
  } catch(e) {}
}

function saveRoundState() {
  const key = STORAGE_ROUND + '_' + state.currentPlayer;
  const payload = {
    questionIds: state.questions.map(function(q) { return q.id; }),
    currentIndex: state.currentIndex,
    score: state.score
  };
  try { localStorage.setItem(key, JSON.stringify(payload)); } catch(e) {}
}

function loadRoundState() {
  try {
    const raw = localStorage.getItem(STORAGE_ROUND + '_' + state.currentPlayer);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function clearRoundState() {
  try { localStorage.removeItem(STORAGE_ROUND + '_' + state.currentPlayer); } catch(e) {}
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
  if (!_popstateNav) history.pushState({ screen: id }, '');
}

function restoreScreen(id) {
  if (id === 'screen-login') { showScreen(id); initLoginScreen(); }
  else if (id === 'screen-home') showHomeScreen();
  else if (id === 'screen-leaderboard') showLeaderboard();
  else if (id === 'screen-coaches' && isAdmin(state.currentPlayer)) showCoachesCorner();
  else if (id === 'screen-quiz' && state.questions.length) { showScreen(id); renderQuestion(); }
  else if (id === 'screen-results') { showScreen(id); showResults(); }
  else showHomeScreen(); // safe fallback
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
  const usedTexts = { [correct.text]: true };
  cats.forEach(function(cat) {
    if (cat === correct.cat) return;
    const opts = pool.filter(function(a) { return a.cat === cat && !usedIds[a.id] && !usedTexts[a.text]; });
    if (!opts.length) return;
    const pick = opts[Math.floor(Math.random() * opts.length)];
    wrongs.push(pick);
    usedIds[pick.id] = true;
    usedTexts[pick.text] = true;
  });

  // Fill remaining slots — exclude jokes so at most one joke appears
  const remaining = pool.filter(function(a) { return !usedIds[a.id] && !usedTexts[a.text] && a.cat !== 'joke'; });
  shuffle(remaining);
  while (wrongs.length < WRONG_CHOICES && remaining.length) {
    wrongs.push(remaining.shift());
  }

  return shuffle([correct].concat(wrongs));
}

// ===== LOGIN SCREEN =====
let confirmedFakeName = false;

function initLoginScreen() {
  const select = document.getElementById('player-select');
  const error = document.getElementById('name-error');

  confirmedFakeName = false;

  // Rebuild dropdown options
  select.innerHTML = '<option value="">Play as...</option>';
  loadLocalPlayers().forEach(function(p) {
    const opt = document.createElement('option');
    opt.value = p.key;
    opt.textContent = p.displayName;
    select.appendChild(opt);
  });
  const newOpt = document.createElement('option');
  newOpt.value = '__new__';
  newOpt.textContent = '+ New Player';
  select.appendChild(newOpt);

  select.value = '';
  error.hidden = true;

  select.onchange = function() {
    if (select.value === '__new__') {
      select.value = '';
      openNewPlayerModal();
    }
    error.hidden = true;
  };

  document.getElementById('btn-play').onclick = handleLogin;
}

function openNewPlayerModal() {
  confirmedFakeName = false;
  const modal = document.getElementById('new-player-modal');
  const input = document.getElementById('name-input');
  const errorModal = document.getElementById('name-error-modal');
  const warning = document.getElementById('name-warning');
  input.value = '';
  errorModal.hidden = true;
  warning.hidden = true;
  modal.hidden = false;
  input.focus();

  document.getElementById('btn-modal-cancel').onclick = closeNewPlayerModal;

  input.onkeydown = function(e) {
    if (e.key === 'Enter') handleAddNewPlayer();
    if (e.key === 'Escape') closeNewPlayerModal();
  };

  const addBtn = document.getElementById('btn-modal-add');
  addBtn.textContent = 'Add Player';
  addBtn.onclick = handleAddNewPlayer;
}

function closeNewPlayerModal() {
  document.getElementById('new-player-modal').hidden = true;
}

function handleAddNewPlayer() {
  const input = document.getElementById('name-input');
  const errorModal = document.getElementById('name-error-modal');
  const warning = document.getElementById('name-warning');
  const name = input.value.trim();

  errorModal.hidden = true;
  warning.hidden = true;

  if (!name) {
    errorModal.textContent = 'Almost! Just enter your name above to get started.';
    errorModal.hidden = false;
    input.focus();
    return;
  }

  const key = normalizeName(name);
  if (state.players[key]) {
    // Soft confirmation — let them claim the name on this device
    errorModal.textContent = '"' + name + '" is already registered. Is this you?';
    errorModal.hidden = false;
    const addBtn = document.getElementById('btn-modal-add');
    addBtn.textContent = "Yes, that's me";
    addBtn.onclick = function() {
      const displayName = state.players[key].displayName || name;
      addLocalPlayer(key, displayName);
      closeNewPlayerModal();
      state.currentPlayer = key;
      saveCurrentPlayer(key);
      apiUpsertPlayer(key, displayName).then(showHomeScreen);
    };
    input.focus();
    return;
  }

  if (!confirmedFakeName && looksLikeFakeName(name)) {
    warning.innerHTML =
      'Hey! Your teammates will see this name on the leaderboard \u2014 using your real name helps them cheer you on \uD83C\uDF89 ' +
      '<a id="use-name-anyway">Carry on with \u201c' + name + '\u201d anyway.</a>';
    warning.hidden = false;
    document.getElementById('use-name-anyway').addEventListener('click', function() {
      confirmedFakeName = true;
      handleAddNewPlayer();
    });
    return;
  }

  // All good — add locally, close modal, log in
  addLocalPlayer(key, name);
  closeNewPlayerModal();
  state.currentPlayer = key;
  saveCurrentPlayer(key);
  apiUpsertPlayer(key, name).then(showHomeScreen);
}

async function handleLogin() {
  const select = document.getElementById('player-select');
  const error = document.getElementById('name-error');
  const key = select.value;

  if (!key || key === '__new__') {
    error.hidden = false;
    return;
  }

  error.hidden = true;
  const localPlayers = loadLocalPlayers();
  const player = localPlayers.find(function(p) { return p.key === key; });
  const displayName = (player && player.displayName) || key;

  state.currentPlayer = key;
  saveCurrentPlayer(key);
  await apiUpsertPlayer(key, displayName);
  showHomeScreen();
}

// ===== HOME SCREEN =====
function showHomeScreen() {
  showScreen('screen-home');
  document.getElementById('btn-start').onclick = startRound;
  document.getElementById('btn-logout').onclick = handleLogout;
  document.getElementById('btn-leaderboard').onclick = showLeaderboard;

  const saved = loadRoundState();
  const resumeBanner = document.getElementById('resume-banner');
  const resumeText = document.getElementById('resume-text');
  const btnResume = document.getElementById('btn-resume');

  if (saved && window.QUESTIONS) {
    const questions = saved.questionIds.map(function(id) {
      return window.QUESTIONS.find(function(q) { return q.id === id; });
    }).filter(Boolean);

    if (questions.length === saved.questionIds.length) {
      resumeText.textContent =
        'Game in progress — Question ' + (saved.currentIndex + 1) +
        ' of ' + questions.length + ', Score: ' + saved.score;
      btnResume.onclick = function() { resumeRound(saved, questions); };
      resumeBanner.hidden = false;
    } else {
      clearRoundState();
      resumeBanner.hidden = true;
    }
  } else {
    resumeBanner.hidden = true;
  }

  renderHomeScreenData();
}

function resumeRound(saved, questions) {
  if (!window.ANSWERS) {
    alert('Heads up! The question bank didn\'t load — please refresh the page.');
    return;
  }
  state.questions = questions;
  state.currentIndex = saved.currentIndex;
  state.score = saved.score;
  state.answered = false;
  showScreen('screen-quiz');
  renderQuestion();
}

function renderHomeScreenData() {
  const player = state.players[state.currentPlayer] || { displayName: state.currentPlayer, bestScore: null, gamesPlayed: 0, perfectGames: 0, history: [] };
  const displayName = player.displayName || state.currentPlayer;

  document.getElementById('home-player-name').textContent = displayName + "'s Stats";
  document.getElementById('stat-best').textContent = player.bestScore !== null ? player.bestScore + '/10' : '—';
  document.getElementById('stat-games').textContent = player.gamesPlayed;
  document.getElementById('stat-perfect').textContent = player.perfectGames;

  renderHistoryList(player.history);

  const statsBtn = document.getElementById('btn-player-stats');
  if (isAdmin(state.currentPlayer)) {
    statsBtn.hidden = false;
    statsBtn.onclick = showCoachesCorner;
  } else {
    statsBtn.hidden = true;
  }
}

function renderHistoryList(history) {
  const list = document.getElementById('history-list');
  if (!history || history.length === 0) {
    list.innerHTML = '<li class="history-empty">No games yet — let\'s play!</li>';
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
  clearRoundState();
  state.currentPlayer = null;
  saveCurrentPlayer(null);
  showScreen('screen-login');
  initLoginScreen();
}

// ===== LEADERBOARD SCREEN =====
function showLeaderboard() {
  showScreen('screen-leaderboard');
  document.getElementById('btn-leaderboard-back').onclick = showHomeScreen;
  renderLeaderboardData();
}

function renderLeaderboardData() {
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
}

// ===== COACHES CORNER SCREEN (admin only) =====
function showCoachesCorner() {
  if (!isAdmin(state.currentPlayer)) return;
  showScreen('screen-coaches');
  switchCoachesTab('stats');
  renderCoachesStatsTab();
  document.querySelectorAll('.coaches-tab-btn').forEach(function(btn) {
    btn.onclick = function() { switchCoachesTab(btn.dataset.tab); };
  });
  document.getElementById('btn-coaches-back').onclick = showHomeScreen;
}

function switchCoachesTab(tabName) {
  document.querySelectorAll('.coaches-tab-btn').forEach(function(btn) {
    btn.classList.toggle('coaches-tab-btn--active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.coaches-tab-panel').forEach(function(panel) {
    panel.hidden = (panel.id !== 'coaches-tab-' + tabName);
  });
  if (tabName === 'questions') {
    var panel = document.getElementById('coaches-tab-questions');
    if (!panel.children.length) renderQuestionsTab();
  }
  if (tabName === 'answers') {
    var panel = document.getElementById('coaches-tab-answers');
    if (!panel.children.length) renderAnswersTab();
  }
  if (tabName === 'rules') {
    var panel = document.getElementById('coaches-tab-rules');
    if (!panel.children.length) renderRulesTab();
  }
  if (tabName === 'question-stats') {
    renderQuestionStatsTab();
  }
}

function renderCoachesStatsTab() {
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
        state.players = await fetchPlayers();
        renderHomeScreenData();
        renderLeaderboardData();
        renderCoachesStatsTab();
      }
    });
  }

  populateMergeSelects(state.players);
}

function renderQuestionsTab() {
  var panel = document.getElementById('coaches-tab-questions');
  var groups = {};
  var order = [];
  window.QUESTIONS.forEach(function(q) {
    if (!groups[q.position]) { groups[q.position] = []; order.push(q.position); }
    groups[q.position].push(q);
  });
  var html = order.map(function(pos, i) {
    var qs = groups[pos];
    var expanded = (i === 0);
    var cardsHtml = qs.map(function(q) {
      var answer = window.ANSWERS.find(function(a) { return a.id === q.correct; });
      var answerText = answer ? escapeHtml(answer.text) : escapeHtml(q.correct);
      return '<div class="question-card">' +
        '<div class="question-card-header">' +
          '<span class="question-id">' + escapeHtml(q.id) + '</span>' +
          '<span class="type-badge type-badge--' + escapeAttr(q.type) + '">' + escapeHtml(q.type) + '</span>' +
        '</div>' +
        '<div class="question-field"><span class="question-field-label">Runners</span><span class="question-field-value">' + escapeHtml(q.runners) + '</span></div>' +
        '<div class="question-field"><span class="question-field-label">Ball</span><span class="question-field-value">' + escapeHtml(q.ball) + '</span></div>' +
        '<div class="question-field"><span class="question-field-label">Answer</span><span class="question-field-value question-answer">' + answerText + '</span></div>' +
        '<div class="question-field"><span class="question-field-label">Why</span><span class="question-field-value question-explanation">' + escapeHtml(q.explanation) + '</span></div>' +
      '</div>';
    }).join('');
    return '<div class="accordion-section">' +
      '<button class="accordion-header" aria-expanded="' + expanded + '">' +
        '<span>' + escapeHtml(pos) + ' (' + qs.length + ')</span>' +
        '<span class="accordion-chevron">▼</span>' +
      '</button>' +
      '<div class="accordion-body"' + (expanded ? '' : ' hidden') + '>' + cardsHtml + '</div>' +
    '</div>';
  }).join('');
  panel.innerHTML = html;
  panel.querySelectorAll('.accordion-header').forEach(function(hdr) {
    hdr.addEventListener('click', toggleAccordion);
  });
}

function renderAnswersTab() {
  var panel = document.getElementById('coaches-tab-answers');
  var cats = ['ball', 'base', 'backup', 'joke'];
  var groups = {};
  cats.forEach(function(c) { groups[c] = []; });
  window.ANSWERS.forEach(function(a) {
    if (groups[a.cat]) groups[a.cat].push(a);
  });
  var html = cats.map(function(cat, i) {
    var answers = groups[cat];
    var expanded = (i === 0);
    var rowsHtml = answers.map(function(a) {
      var posHtml = (a.pos === 'all')
        ? '<span class="pos-badge">All</span>'
        : a.pos.map(function(p) { return '<span class="pos-badge">' + escapeHtml(p) + '</span>'; }).join('');
      return '<tr>' +
        '<td style="font-size:0.75rem;color:var(--gray-500);white-space:nowrap">' + escapeHtml(a.id) + '</td>' +
        '<td>' + escapeHtml(a.text) + '</td>' +
        '<td><div class="answers-pos">' + posHtml + '</div></td>' +
      '</tr>';
    }).join('');
    var label = cat.charAt(0).toUpperCase() + cat.slice(1);
    return '<div class="accordion-section">' +
      '<button class="accordion-header" aria-expanded="' + expanded + '">' +
        '<span>' + escapeHtml(label) + ' (' + answers.length + ')</span>' +
        '<span class="accordion-chevron">▼</span>' +
      '</button>' +
      '<div class="accordion-body"' + (expanded ? '' : ' hidden') + '>' +
        '<table class="data-table">' +
          '<thead><tr><th>ID</th><th>Text</th><th>Positions</th></tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
      '</div>' +
    '</div>';
  }).join('');
  panel.innerHTML = html;
  panel.querySelectorAll('.accordion-header').forEach(function(hdr) {
    hdr.addEventListener('click', toggleAccordion);
  });
}

function renderRulesTab() {
  var panel = document.getElementById('coaches-tab-rules');
  var listHtml = window.RULES.map(function(rule, i) {
    return '<li class="rules-item"><span class="rules-num">' + (i + 1) + '</span>' +
           '<span>' + escapeHtml(rule) + '</span></li>';
  }).join('');
  panel.innerHTML = '<div class="card"><ol class="rules-list">' + listHtml + '</ol></div>';
}

async function renderQuestionStatsTab() {
  const panel = document.getElementById('coaches-tab-question-stats');
  panel.innerHTML = '<div class="card"><p style="color:var(--gray-500);font-size:0.9rem">Loading...</p></div>';
  try {
    const res = await fetch('/api/questions/stats');
    const stats = await res.json();

    const rows = window.QUESTIONS
      .map(function(q) {
        const s = stats[q.id] || { timesAsked: 0, timesWrong: 0 };
        return { q, timesAsked: s.timesAsked, timesWrong: s.timesWrong };
      })
      .filter(function(r) { return r.timesAsked > 0; })
      .sort(function(a, b) {
        return (b.timesWrong / b.timesAsked) - (a.timesWrong / a.timesAsked);
      });

    if (!rows.length) {
      panel.innerHTML = '<div class="card"><p style="color:var(--gray-500);font-size:0.9rem">No data yet — play some games first!</p></div>';
      return;
    }

    const rowsHtml = rows.map(function(r) {
      const pct = Math.round((r.timesWrong / r.timesAsked) * 100);
      return '<tr>' +
        '<td style="font-size:0.75rem;color:var(--gray-500);white-space:nowrap">' + escapeHtml(r.q.id) + '</td>' +
        '<td style="font-size:0.8rem">' + escapeHtml(r.q.position) + '</td>' +
        '<td style="font-size:0.8rem">' + escapeHtml(r.q.ball) + '</td>' +
        '<td style="text-align:center">' + r.timesAsked + '</td>' +
        '<td style="text-align:center">' + r.timesWrong + '</td>' +
        '<td style="text-align:center;font-weight:600' + (pct >= 50 ? ';color:var(--red-wrong)' : '') + '">' + pct + '%</td>' +
      '</tr>';
    }).join('');

    panel.innerHTML = '<div class="card" style="overflow-x:auto">' +
      '<table class="data-table">' +
        '<thead><tr><th>ID</th><th>Position</th><th>Scenario</th><th>Asked</th><th>Wrong</th><th>% Wrong</th></tr></thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
      '</table></div>';
  } catch (e) {
    panel.innerHTML = '<div class="card"><p style="color:var(--red-wrong)">Could not load question stats.</p></div>';
  }
}

function toggleAccordion(e) {
  var hdr = e.currentTarget;
  var body = hdr.nextElementSibling;
  var open = hdr.getAttribute('aria-expanded') === 'true';
  hdr.setAttribute('aria-expanded', open ? 'false' : 'true');
  body.hidden = open;
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
      state.players = await fetchPlayers();
      renderHomeScreenData();
      renderLeaderboardData();
      renderCoachesStatsTab();
      showMergeStatus('"' + dropName + '" merged into "' + keepName + '" successfully.', true);
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

  clearRoundState();

  state.questions = selectQuestions(window.QUESTIONS);
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;

  saveRoundState();
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
  document.getElementById('runners-text').textContent = q.runners;
  document.getElementById('ball-text').textContent = q.ball;

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
  apiRecordAnswer(question.id, isCorrect); // fire-and-forget

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
    saveRoundState();
    renderQuestion();
  } else {
    await finishRound();
  }
}

// ===== RESULTS SCREEN =====
async function finishRound() {
  clearRoundState();
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
  if (score >= 8)  return 'Excellent work! You know most of your fielding responsibilities. A few more games and you\'ll be perfect!';
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
  try {
    state.players = await fetchPlayers();
  } catch (e) {
    console.warn('[BBB] Could not reach server:', e);
  }

  const savedPlayer = loadCurrentPlayer();
  if (savedPlayer) {
    const key = normalizeName(savedPlayer);
    if (state.players[key]) {
      const displayName = state.players[key].displayName || key;
      addLocalPlayer(key, displayName);
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

window.addEventListener('popstate', function(e) {
  var id = e.state && e.state.screen;
  if (!id) return; // pre-app history entry — let browser navigate away normally
  _popstateNav = true;
  restoreScreen(id);
  _popstateNav = false;
});

document.addEventListener('DOMContentLoaded', () => {
  const vb = document.getElementById('version-badge');
  if (vb && window.APP_VERSION) vb.textContent = window.APP_VERSION;

  // Wait one frame for the SVG image to size itself before measuring
  requestAnimationFrame(() => {
    syncHeaderHeight();
    history.replaceState({ screen: 'screen-login' }, ''); // seed initial state
    init();
  });
});
