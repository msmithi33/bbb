/* ===== DEV SEED — only runs when URL contains ?seed=1 or ?seed=reset ===== */
(function seedPlayers() {
  const seedParam = new URLSearchParams(window.location.search).get('seed');
  if (seedParam !== '1' && seedParam !== 'reset') return;

  const SEED_KEYS = ['jake','maya','tyler','sam','joe','joey','brianna','carlos','emma','liam','coachdan'];

  if (seedParam === 'reset') {
    Promise.all(SEED_KEYS.map(function(key) {
      return fetch('/api/players/' + key, { method: 'DELETE' })
        .then(function(r) { return r.ok ? key : null; })
        .catch(function() { return null; });
    })).then(function(results) {
      const deleted = results.filter(Boolean);
      // Clear localStorage entries for seeded players
      SEED_KEYS.forEach(function(key) {
        localStorage.removeItem('bbb_round_' + key);
      });
      // Remove seeded players from bbb_localPlayers (keep any real entries)
      try {
        const local = JSON.parse(localStorage.getItem('bbb_localPlayers') || '[]');
        const cleaned = local.filter(function(p) { return !SEED_KEYS.includes(p.key); });
        localStorage.setItem('bbb_localPlayers', JSON.stringify(cleaned));
      } catch(e) {}
      console.log('[seed] Reset complete. Deleted from DB:', deleted);
      console.log('[seed] Real players are untouched.');
    });
    return;
  }

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
    },
    coachdan: {
      displayName: 'Coach Dan',
      bestScore: 10,
      gamesPlayed: 20,
      perfectGames: 5,
      history: [
        { date: daysAgo(1),  score: 10 },
        { date: daysAgo(2),  score: 9 },
        { date: daysAgo(4),  score: 10 },
        { date: daysAgo(6),  score: 8 },
        { date: daysAgo(8),  score: 10 }
      ]
    }
  };

  fetch('/api/players/seed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seedData)
  })
    .then(function() {
      // Set bbb_localPlayers — all players EXCEPT carlos (he's on server but not on
      // this device, so typing "Carlos" will trigger the "Is this you?" claim flow)
      const localPlayers = [
        { key: 'jake',     displayName: 'Jake' },
        { key: 'maya',     displayName: 'Maya' },
        { key: 'tyler',    displayName: 'Tyler' },
        { key: 'sam',      displayName: 'Sam' },
        { key: 'joe',      displayName: 'Joe' },
        { key: 'joey',     displayName: 'Joey' },
        { key: 'brianna',  displayName: 'Brianna' },
        { key: 'emma',     displayName: 'Emma' },
        { key: 'liam',     displayName: 'Liam' },
        { key: 'coachdan', displayName: 'Coach Dan' }
      ];
      localStorage.setItem('bbb_localPlayers', JSON.stringify(localPlayers));

      // Set up an in-progress round for Jake (Q1–Q10, stopped at Q6, score 4)
      // This makes the resume banner appear when logged in as Jake
      const roundState = {
        questionIds: ['Q01','Q02','Q03','Q04','Q05','Q06','Q07','Q08','Q09','Q10'],
        currentIndex: 5,
        score: 4
      };
      localStorage.setItem('bbb_round_jake', JSON.stringify(roundState));

      console.log('[seed] DB + localStorage ready. Test scenarios:');
      console.log('  Login dropdown → shows 10 players (Jake through Coach Dan)');
      console.log('  Log in as Jake → resume banner: "Question 6 of 10, Score: 4"');
      console.log('  Log in as Coach Dan → Coaches Corner tab visible');
      console.log('  Type "Carlos" in Add Player → claim flow: "Is this you?"');
      console.log('  Reload without ?seed=1 → normal app, localStorage persists');
    })
    .catch(function(e) { console.warn('[seed] Could not seed players:', e); });
})();
