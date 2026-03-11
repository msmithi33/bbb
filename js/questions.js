/* eslint-disable */
window.QUESTIONS = [

  // ===== PITCHER (P) — 5 questions =====
  {
    id: "Q01",
    position: "Pitcher (P)",
    type: "ball",
    runners: "No runners on base",
    ball: "The batter hits a ground ball right back to you.",
    correct: "ball-throw-1b",
    explanation: "You're the closest fielder — field it cleanly and fire to first for the out."
  },
  {
    id: "Q02",
    position: "Pitcher (P)",
    type: "base",
    runners: "Runner on first",
    ball: "The batter hits a slow roller to first base.",
    correct: "base-stay-mound",
    explanation: "In Little League, the pitcher stays on the mound. The first baseman handles the slow roller — your job is to be available if the ball comes back to you."
  },
  {
    id: "Q03",
    position: "Pitcher (P)",
    type: "backup",
    runners: "Runners on second and third",
    ball: "A wild throw comes in from the outfield to home plate.",
    correct: "base-cover-home",
    explanation: "When a wild throw gets past the catcher, the catcher chases the ball. The pitcher must cover home plate so the catcher has somewhere to throw — and to tag any runner trying to score."
  },
  {
    id: "Q04",
    position: "Pitcher (P)",
    type: "ball",
    runners: "No runners on base",
    ball: "The batter hits a sharp comebacker right at your feet.",
    correct: "ball-throw-1b",
    explanation: "React quickly, secure the ball, and make a strong throw to first for the out."
  },
  {
    id: "Q05",
    position: "Pitcher (P)",
    type: "backup",
    runners: "Runner on first",
    ball: "A deep fly ball is hit to left field.",
    correct: "base-stay-mound",
    explanation: "In Little League, the pitcher stays on the mound unless covering home on an overthrow. Let the outfielders and infielders handle the play."
  },

  // ===== CATCHER (C) — 5 questions =====
  {
    id: "Q06",
    position: "Catcher (C)",
    type: "ball",
    runners: "No runners on base",
    ball: "The batter hits a weak ground ball in front of home plate.",
    correct: "ball-throw-1b",
    explanation: "The catcher owns weak ground balls in front of the plate — charge hard, secure the ball, and throw to first for the out."
  },
  {
    id: "Q07",
    position: "Catcher (C)",
    type: "base",
    runners: "Runner on first, rounding second heading to third",
    ball: "The batter hits a long single to right field.",
    correct: "base-stay-home",
    explanation: "In Little League, the catcher never leaves home plate while a play is live. The risk of a runner advancing from third to score is too great to leave home unguarded."
  },
  {
    id: "Q08",
    position: "Catcher (C)",
    type: "base",
    runners: "Bases loaded — runners tagging up",
    ball: "A fly ball is hit to center field.",
    correct: "base-stay-home",
    explanation: "With bases loaded, runners may try to tag up and score. The catcher stays at home to handle the throw."
  },
  {
    id: "Q09",
    position: "Catcher (C)",
    type: "ball",
    runners: "No runners on base",
    ball: "The batter hits a high pop-up in foul territory behind home plate.",
    correct: "ball-catch",
    explanation: "Foul pop-ups directly behind home plate are the catcher's responsibility. Remove your mask quickly so it doesn't interfere, locate the ball, then catch it."
  },
  {
    id: "Q10",
    position: "Catcher (C)",
    type: "backup",
    runners: "Runner on third",
    ball: "A ground ball is hit to the infield.",
    correct: "base-stay-home",
    explanation: "With a runner on third, the catcher must stay alert at home on any infield play — the runner could try to score on the throw."
  },

  // ===== FIRST BASE (1B) — 10 questions =====
  {
    id: "Q11",
    position: "First Base (1B)",
    type: "ball",
    runners: "Batter running to first",
    ball: "An errant throw sails wide — you can't catch it with your foot on the bag.",
    correct: "ball-off-bag",
    explanation: "Step off the bag to catch the errant throw, then tag the batter-runner — stopping the ball is more important than keeping your foot on the base."
  },
  {
    id: "Q12",
    position: "First Base (1B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A slow roller is hit just in front of first base.",
    correct: "ball-step-1b-self",
    explanation: "If you're charging a ball and can beat the runner yourself, there's no need to throw — step on the bag."
  },
  {
    id: "Q13",
    position: "First Base (1B)",
    type: "base",
    runners: "Runner on first",
    ball: "A ground ball is hit to second base.",
    correct: "base-cover-1b",
    explanation: "On a possible double play, stay anchored to first to receive the relay throw from second."
  },
  {
    id: "Q14",
    position: "First Base (1B)",
    type: "backup",
    runners: "Runner on first — attempting to steal second",
    ball: "Catcher fires a throw to second.",
    correct: "base-cover-1b",
    explanation: "On a steal attempt, your job is to hold first base. If the throw is errant and the runner retreats, you need to be there. Don't leave the bag unguarded."
  },
  {
    id: "Q15",
    position: "First Base (1B)",
    type: "ball",
    runners: "Runners on first and second",
    ball: "A ground ball is hit sharply to you.",
    correct: "ball-step-1b",
    explanation: "Take the sure out at first, then make a smart read on whether you have time for a second out."
  },
  {
    id: "Q16",
    position: "First Base (1B)",
    type: "backup",
    runners: "Runner on second",
    ball: "A fly ball is hit to left field.",
    correct: "backup-2b",
    explanation: "The batter-runner may try to stretch to second if the left fielder doesn't field it cleanly. Drift behind second base so you're ready for a throw."
  },
  {
    id: "Q17",
    position: "First Base (1B)",
    type: "base",
    runners: "Runner on first, no outs",
    ball: "The batter hits a weak ground ball toward third.",
    correct: "base-cover-1b",
    explanation: "Stay at first to receive a possible throw for the force out. Don't leave your bag unguarded."
  },
  {
    id: "Q18",
    position: "First Base (1B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A high pop-up is hit in foul territory near first base.",
    correct: "ball-catch",
    explanation: "Foul pop-ups near first are your responsibility — communicate loudly, move to the ball, and squeeze it."
  },
  {
    id: "Q19",
    position: "First Base (1B)",
    type: "backup",
    runners: "Runner on third",
    ball: "A ground ball is hit to second base — throw comes to you at first for the out.",
    correct: "ball-hold-return",
    explanation: "After getting the out, stare down the runner on third to hold them — then calmly walk the ball back to the pitcher. Stay ready to throw home if they break."
  },
  {
    id: "Q20",
    position: "First Base (1B)",
    type: "ball",
    runners: "Batter running to first",
    ball: "An errant throw pulls you completely off the bag.",
    correct: "ball-off-bag",
    explanation: "When a throw takes you off the bag, prioritize catching the ball first, then quickly tag the runner."
  },

  // ===== SECOND BASE (2B) — 10 questions =====
  {
    id: "Q21",
    position: "Second Base (2B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A sharp ground ball is hit up the middle toward you.",
    correct: "ball-throw-1b",
    explanation: "Get in front of the ball, field it cleanly, and deliver a strong throw to first for the out."
  },
  {
    id: "Q22",
    position: "Second Base (2B)",
    type: "base",
    runners: "Runner on first",
    ball: "A ground ball is hit between 2nd and 3rd base.",
    correct: "base-dp",
    explanation: "You're the pivot man. Catch it, drag second, pivot, and fire to first to turn two."
  },
  {
    id: "Q23",
    position: "Second Base (2B)",
    type: "backup",
    runners: "Runner on first — attempting to steal second",
    ball: "Catcher fires a throw to second.",
    correct: "base-cover-2b",
    explanation: "On a steal attempt, you and the shortstop must communicate — one of you covers second. With a right-handed batter, that's usually you."
  },
  {
    id: "Q24",
    position: "Second Base (2B)",
    type: "base",
    runners: "Runner on second",
    ball: "A ground ball is hit to first base.",
    correct: "base-cover-1b",
    explanation: "When the first baseman charges a ball, second base covers first. It's a hustle play that requires quick reads."
  },
  {
    id: "Q25",
    position: "Second Base (2B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A shallow pop-up is hit behind first base in short right field.",
    correct: "ball-catch",
    explanation: "Second baseman often has the best angle on short pop-ups to right. Call loud and early, and catch it."
  },
  {
    id: "Q26",
    position: "Second Base (2B)",
    type: "backup",
    runners: "Runner on first",
    ball: "A fly ball is hit to right field.",
    correct: "backup-relay",
    explanation: "After a catch in right field, be ready near second — the runner may try to advance on the throw."
  },
  {
    id: "Q27",
    position: "Second Base (2B)",
    type: "ball",
    runners: "No runners on base",
    ball: "The batter hits a popup straight up over second base.",
    correct: "ball-catch",
    explanation: "Outfielders have priority over infielders, infielders have priority based on angle. Whoever has the best shot calls off the other. The key: communicate!"
  },
  {
    id: "Q28",
    position: "Second Base (2B)",
    type: "base",
    runners: "Runners on first and third",
    ball: "A fly ball is hit to center field.",
    correct: "base-cover-2b",
    explanation: "On fly balls to center field, the second baseman covers second base — the shortstop takes the relay. Stay anchored at second to handle any throw."
  },
  {
    id: "Q29",
    position: "Second Base (2B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A hard grounder is hit up the middle",
    correct: "ball-throw-1b",
    explanation: "Dive! Stop that ball from getting through! It's okay if you can't make the throw to first base in time."
  },
  {
    id: "Q30",
    position: "Second Base (2B)",
    type: "backup",
    runners: "Runner on third, no outs",
    ball: "A fly ball is hit to right field.",
    correct: "backup-relay",
    explanation: "Stay alert for relay duty — you're the link between the outfield throw and the infield on tag-up plays."
  },

  // ===== SHORTSTOP (SS) — 10 questions =====
  {
    id: "Q31",
    position: "Shortstop (SS)",
    type: "ball",
    runners: "No runners on base",
    ball: "A routine ground ball is hit right to you.",
    correct: "ball-throw-1b",
    explanation: "The standard shortstop play — field it cleanly, set your feet, and make a strong throw to first."
  },
  {
    id: "Q32",
    position: "Shortstop (SS)",
    type: "ball",
    runners: "Runner on first",
    ball: "A ground ball is hit to the third baseman.",
    correct: "base-cover-3b",
    explanation: "The second baseman covers second base in this case. You, as the shortstop, cover third in case the runner advances past second. Middle infielders always run towards the ball!"
  },
  {
    id: "Q33",
    position: "Shortstop (SS)",
    type: "base",
    runners: "Runner on second",
    ball: "A ground ball is hit to first base.",
    correct: "base-cover-2b",
    explanation: "When the ball is hit to first base, the shortstop covers second — second base needs to be covered in case the first baseman charges the ball and the runner on second tries to advance."
  },
  {
    id: "Q34",
    position: "Shortstop (SS)",
    type: "backup",
    runners: "Runner on first — attempting to steal second",
    ball: "Catcher fires a throw to second.",
    correct: "base-cover-2b",
    explanation: "With a left-handed batter, the shortstop typically covers second on steal attempts — communicate early with the second baseman."
  },
  {
    id: "Q35",
    position: "Shortstop (SS)",
    type: "ball",
    runners: "No runners on base",
    ball: "A ball is hit in the hole between third base and shortstop.",
    correct: "ball-throw-1b",
    explanation: "This is one of the hardest plays in baseball. Backhand it in the hole, plant, and throw a rope!"
  },
  {
    id: "Q36",
    position: "Shortstop (SS)",
    type: "base",
    runners: "Runners on second and third",
    ball: "A ground ball is hit to second base.",
    correct: "base-cover-2b",
    explanation: "Middle infielders always move towards the ball."
  },
  {
    id: "Q37",
    position: "Shortstop (SS)",
    type: "backup",
    runners: "No runners on base",
    ball: "A single is hit to left field.",
    correct: "backup-relay",
    explanation: "On base hits to left, the shortstop moves into relay position in the outfield grass in case a runner rounds first."
  },
  {
    id: "Q38",
    position: "Shortstop (SS)",
    type: "ball",
    runners: "No runners on base",
    ball: "A pop-up is hit in shallow left-center field.",
    correct: "ball-catch",
    explanation: "Outfielders have priority on shallow pop-ups because they're moving in and have better vision. Call it if you can catch it, but yield if the outfielder calls you off."
  },
  {
    id: "Q39",
    position: "Shortstop (SS)",
    type: "backup",
    runners: "Runners on first and second",
    ball: "A fly ball is hit to center field.",
    correct: "backup-relay",
    explanation: "On fly balls to center field, the shortstop is the cutoff/relay man — move into the outfield grass between the centerfielder and second base so any throw comes through you."
  },
  {
    id: "Q40",
    position: "Shortstop (SS)",
    type: "ball",
    runners: "Runner on second",
    ball: "A ground ball is hit up the middle — you range far to your right.",
    correct: "ball-throw-1b",
    explanation: "When ranged far to your right near second, a quick throw to first is your best option. Footwork and arm strength matter."
  },

  // ===== THIRD BASE (3B) — 10 questions =====
  {
    id: "Q41",
    position: "Third Base (3B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A sharp ground ball is hit down the third base line.",
    correct: "ball-throw-1b",
    explanation: "Third base is the hot corner — react fast, stay low, and make a long strong throw to first."
  },
  {
    id: "Q42",
    position: "Third Base (3B)",
    type: "base",
    runners: "Runner on first",
    ball: "A ground ball is hit toward second base.",
    correct: "base-cover-3b",
    explanation: "When the shortstop is making a play at second, you must cover third to prevent the batter-runner or other runners from advancing."
  },
  {
    id: "Q43",
    position: "Third Base (3B)",
    type: "ball",
    runners: "Runner on first",
    ball: "The batter hits a weak ground ball toward home plate.",
    correct: "ball-throw-1b",
    explanation: "Charge hard toward the ball, field it, then throw to first base for the out — third baseman owns weak ground balls near home plate."
  },
  {
    id: "Q44",
    position: "Third Base (3B)",
    type: "backup",
    runners: "Runner on second — heading to third",
    ball: "A single is hit to right field.",
    correct: "base-cover-3b",
    explanation: "There's a good chance the runner on second is scoring, but the hitter might still try to stretch it to 3, be ready to make the play!"
  },
  {
    id: "Q45",
    position: "Third Base (3B)",
    type: "backup",
    runners: "No runners on base",
    ball: "An errant throw goes past first base into right field.",
    correct: "base-cover-3b",
    explanation: "When a ball gets away into right field, the batter-runner may try to get to third. You must be there."
  },
  {
    id: "Q46",
    position: "Third Base (3B)",
    type: "ball",
    runners: "Runner on third, one out",
    ball: "A slow grounder is hit to you.",
    correct: "ball-throw-1b",
    explanation: "With a runner on third already in scoring position, take the sure out at first. Don't gamble by trying to pick the runner off third."
  },
  {
    id: "Q47",
    position: "Third Base (3B)",
    type: "base",
    runners: "Bases loaded — runners tagging up",
    ball: "A fly ball is hit to center field.",
    correct: "base-cover-3b",
    explanation: "With bases loaded and a fly ball caught, the runner on 2nd will almost certainly tag up. Be at the bag."
  },
  {
    id: "Q48",
    position: "Third Base (3B)",
    type: "ball",
    runners: "No runners on base",
    ball: "A pop-up is hit high in foul territory between home and third.",
    correct: "ball-catch",
    explanation: "Foul pop-ups between home and third are primarily yours — call it off the catcher and catch it."
  },
  {
    id: "Q49",
    position: "Third Base (3B)",
    type: "backup",
    runners: "Runner on second",
    ball: "A wild pitch bounces toward the backstop.",
    correct: "base-cover-3b",
    explanation: "On wild pitches with a runner on second, your job is to be at third in case the runner breaks for it."
  },
  {
    id: "Q50",
    position: "Third Base (3B)",
    type: "ball",
    runners: "Runner on second",
    ball: "A hard shot is hit down the third base line.",
    correct: "ball-hold-return",
    explanation: "When you can't get the batter-runner at first, hold the runner at second. That's a tough play at first -- it's better to keep the runner from advancing."
  },

  // ===== LEFT FIELD (LF) — 5 questions =====
  {
    id: "Q51",
    position: "Left Field (LF)",
    type: "ball",
    runners: "No runners on base",
    ball: "A line drive is hit into the left-center gap.",
    correct: "ball-cutoff",
    explanation: "Get to the ball quickly, hit the cut-off (shortstop in relay position), and prevent the runner from taking an extra base."
  },
  {
    id: "Q52",
    position: "Left Field (LF)",
    type: "base",
    runners: "Runner on first — rounding second, heading to third",
    ball: "A single is hit to you in shallow left field.",
    correct: "ball-throw-3b",
    explanation: "The runner is rounding second aggressively — hit third base quickly to hold them and prevent a score."
  },
  {
    id: "Q53",
    position: "Left Field (LF)",
    type: "backup",
    runners: "No runners on base",
    ball: "A ground ball is hit to third base.",
    correct: "backup-3b",
    explanation: "Left fielder always backs up third base on ground balls hit there — if the third baseman misses it, you're the last line of defense to stop the ball from rolling into the corner."
  },
  {
    id: "Q54",
    position: "Left Field (LF)",
    type: "ball",
    runners: "Runner on second — rounding third heading home",
    ball: "A single is hit to you in left field.",
    correct: "ball-cutoff",
    explanation: "The runner is heading home — you probably can't get the ball to home in time.  Get it to the cutoff/pitcher as fast as you can."
  },
  {
    id: "Q55",
    position: "Left Field (LF)",
    type: "backup",
    runners: "Runner on first",
    ball: "A ground ball is hit between 2nd and 3rd.",
    correct: "backup-play",
    explanation: "Outfielders back up all infield plays — The left fielder should be ready to get the ball if gets past the the shortstop and third baseman."
  },

  // ===== CENTER FIELD (CF) — 5 questions =====
  {
    id: "Q56",
    position: "Center Field (CF)",
    type: "ball",
    runners: "No runners on base",
    ball: "A line drive is hit over second base into center field.",
    correct: "ball-cutoff",
    explanation: "As center fielder, attack the ball — don't let it play you. Get to it quickly and fire to the cut-off to limit the runner."
  },
  {
    id: "Q57",
    position: "Center Field (CF)",
    type: "backup",
    runners: "No runners on base",
    ball: "A fly ball is hit to right field.",
    correct: "backup-rf",
    explanation: "Center fielder backs up all other outfielders. Move toward right to back up the play."
  },
  {
    id: "Q58",
    position: "Center Field (CF)",
    type: "base",
    runners: "Runner on second — tagging up",
    ball: "A fly ball is hit to you. You catch it.",
    correct: "ball-throw-3b",
    explanation: "After the catch, look at the runner on second — if they tag up and advance, quickly throw to third to get them."
  },
  {
    id: "Q59",
    position: "Center Field (CF)",
    type: "ball",
    runners: "No runners on base",
    ball: "A deep fly ball is hit over your head toward the warning track.",
    correct: "ball-catch",
    explanation: "Turn your back to the infield and sprint. The center fielder must go get every ball they possibly can."
  },
  {
    id: "Q60",
    position: "Center Field (CF)",
    type: "backup",
    runners: "Runner on first",
    ball: "A ground ball is hit between 1st and 2nd.",
    correct: "backup-play",
    explanation: "Center fielder should back up plays up the middle — be the safety net if the infielders can't get the ball."
  },

  // ===== RIGHT FIELD (RF) — 5 questions =====
  {
    id: "Q61",
    position: "Right Field (RF)",
    type: "ball",
    runners: "Runner on second — heading home",
    ball: "A single is hit to you in right field.",
    correct: "ball-cutoff",
    explanation: "As right fielder, attack the ball — don't let it play you. Get to it quickly and fire to the cut-off to limit the runner."
  },
  {
    id: "Q62",
    position: "Right Field (RF)",
    type: "backup",
    runners: "No runners on base",
    ball: "A ground ball is hit to first base.",
    correct: "backup-play",
    explanation: "Right fielder backs up first base on ground balls up the line — move toward the first base line to stop what the first baseman misses."
  },
  {
    id: "Q63",
    position: "Right Field (RF)",
    type: "ball",
    runners: "No runners on base",
    ball: "A ball is hit down the right field line, curving toward foul.",
    correct: "ball-catch",
    explanation: "Go get the ball! If it stays fair, catch it on the fly if possible. If it goes foul, play the carom off the wall quickly."
  },
  {
    id: "Q64",
    position: "Right Field (RF)",
    type: "base",
    runners: "Runner on first — tagging up",
    ball: "A fly ball is hit to you. You catch it.",
    correct: "ball-throw-2b",
    explanation: "If the runner tags from first, your throw goes to second.  Hit the cutoff if you can't reach 2nd accurately."
  },
  {
    id: "Q65",
    position: "Right Field (RF)",
    type: "backup",
    runners: "Runner on first",
    ball: "A ground ball is hit to the second baseman.",
    correct: "backup-play",
    explanation: "Right fielder backs up all infield ground balls to the right side."
  }

];
