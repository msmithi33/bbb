/* ===== DEV SEED — only runs when URL contains ?seed=1 ===== */
(function seedPlayers() {
  if (new URLSearchParams(window.location.search).get('seed') !== '1') return;
  const today = new Date();

  function daysAgo(n) {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d.toLocaleDateString();
  }

  const seedData = {
    jake: {
      displayName: 'Jake',
      bestScore: 9,
      gamesPlayed: 7,
      perfectGames: 0,
      history: [
        { date: daysAgo(1),  score: 9 },
        { date: daysAgo(3),  score: 7 },
        { date: daysAgo(6),  score: 8 },
        { date: daysAgo(10), score: 6 },
        { date: daysAgo(14), score: 5 }
      ]
    },
    maya: {
      displayName: 'Maya',
      bestScore: 10,
      gamesPlayed: 12,
      perfectGames: 2,
      history: [
        { date: daysAgo(2),  score: 10 },
        { date: daysAgo(5),  score: 9 },
        { date: daysAgo(8),  score: 10 },
        { date: daysAgo(11), score: 8 },
        { date: daysAgo(15), score: 7 }
      ]
    },
    tyler: {
      displayName: 'Tyler',
      bestScore: 6,
      gamesPlayed: 4,
      perfectGames: 0,
      history: [
        { date: daysAgo(4),  score: 6 },
        { date: daysAgo(9),  score: 4 },
        { date: daysAgo(13), score: 5 },
        { date: daysAgo(20), score: 3 }
      ]
    },
    sam: {
      displayName: 'Sam',
      bestScore: 8,
      gamesPlayed: 9,
      perfectGames: 0,
      history: [
        { date: daysAgo(1),  score: 8 },
        { date: daysAgo(4),  score: 7 },
        { date: daysAgo(7),  score: 6 },
        { date: daysAgo(12), score: 8 },
        { date: daysAgo(16), score: 5 }
      ]
    },
    joe: {
      displayName: 'Joe',
      bestScore: 7,
      gamesPlayed: 5,
      perfectGames: 0,
      history: [
        { date: daysAgo(2),  score: 7 },
        { date: daysAgo(6),  score: 5 },
        { date: daysAgo(11), score: 6 }
      ]
    },
    joey: {
      displayName: 'Joey',
      bestScore: 7,
      gamesPlayed: 3,
      perfectGames: 0,
      history: [
        { date: daysAgo(3),  score: 7 },
        { date: daysAgo(8),  score: 4 },
        { date: daysAgo(14), score: 6 }
      ]
    },
    brianna: {
      displayName: 'Brianna',
      bestScore: 10,
      gamesPlayed: 15,
      perfectGames: 3,
      history: [
        { date: daysAgo(1),  score: 10 },
        { date: daysAgo(3),  score: 10 },
        { date: daysAgo(5),  score: 9 },
        { date: daysAgo(7),  score: 10 },
        { date: daysAgo(9),  score: 8 }
      ]
    },
    carlos: {
      displayName: 'Carlos',
      bestScore: 5,
      gamesPlayed: 2,
      perfectGames: 0,
      history: [
        { date: daysAgo(7),  score: 5 },
        { date: daysAgo(21), score: 3 }
      ]
    },
    emma: {
      displayName: 'Emma',
      bestScore: 8,
      gamesPlayed: 6,
      perfectGames: 0,
      history: [
        { date: daysAgo(2),  score: 8 },
        { date: daysAgo(5),  score: 7 },
        { date: daysAgo(9),  score: 6 },
        { date: daysAgo(13), score: 5 }
      ]
    },
    liam: {
      displayName: 'Liam',
      bestScore: 3,
      gamesPlayed: 1,
      perfectGames: 0,
      history: [
        { date: daysAgo(30), score: 3 }
      ]
    }
  };

  fetch('/api/players/seed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seedData)
  })
    .then(function() { console.log('[seed] 10 players seeded into shared DB.'); })
    .catch(function(e) { console.warn('[seed] Could not seed players:', e); });
})();
