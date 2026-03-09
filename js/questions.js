/* eslint-disable */
window.QUESTIONS = [

  // ===== PITCHER (P) — 5 questions =====
  {
    id: "Q01",
    position: "Pitcher (P)",
    type: "ball",
    scenario: "No runners on base. The batter hits a ground ball right back to you.",
    correct: "ball-throw-1b",
    explanation: "You're the closest fielder — field it cleanly and fire to first for the out."
  },
  {
    id: "Q02",
    position: "Pitcher (P)",
    type: "base",
    scenario: "Runner on first. The batter hits a slow roller to first base.",
    correct: "base-stay-mound",
    explanation: "In Little League, the pitcher stays on the mound. The first baseman handles the slow roller — your job is to be available if the ball comes back to you."
  },
  {
    id: "Q03",
    position: "Pitcher (P)",
    type: "backup",
    scenario: "Runners on second and third. A wild throw comes in from the outfield to home plate.",
    correct: "base-cover-home",
    explanation: "When a wild throw gets past the catcher, the catcher chases the ball. The pitcher must cover home plate so the catcher has somewhere to throw — and to tag any runner trying to score."
  },
  {
    id: "Q04",
    position: "Pitcher (P)",
    type: "ball",
    scenario: "No runners on base. The batter hits a sharp comebacker right at your feet.",
    correct: "ball-throw-1b",
    explanation: "React quickly, secure the ball, and make a strong throw to first for the out."
  },
  {
    id: "Q05",
    position: "Pitcher (P)",
    type: "backup",
    scenario: "Runner on first. A deep fly ball is hit to left field.",
    correct: "base-stay-mound",
    explanation: "In Little League, the pitcher stays on the mound unless covering home on an overthrow. Let the outfielders and infielders handle the play."
  },

  // ===== CATCHER (C) — 5 questions =====
  {
    id: "Q06",
    position: "Catcher (C)",
    type: "ball",
    scenario: "No runners on base. The batter hits a weak ground ball in front of home plate.",
    correct: "ball-throw-1b",
    explanation: "The catcher owns weak ground balls in front of the plate — charge hard, secure the ball, and throw to first for the out."
  },
  {
    id: "Q07",
    position: "Catcher (C)",
    type: "base",
    scenario: "Runner on first. The batter hits a long single to right field. The runner is rounding second and heading to third.",
    correct: "base-stay-home",
    explanation: "In Little League, the catcher never leaves home plate while a play is live. The risk of a runner advancing from third to score is too great to leave home unguarded."
  },
  {
    id: "Q08",
    position: "Catcher (C)",
    type: "base",
    scenario: "Bases loaded. A fly ball is hit to center field. The runners tag up.",
    correct: "base-stay-home",
    explanation: "With bases loaded, runners may try to tag up and score. The catcher stays at home to handle the throw."
  },
  {
    id: "Q09",
    position: "Catcher (C)",
    type: "ball",
    scenario: "No runners on base. The batter hits a high pop-up in foul territory behind home plate.",
    correct: "ball-catch",
    explanation: "Foul pop-ups directly behind home plate are the catcher's responsibility. Remove your mask quickly so it doesn't interfere, locate the ball, then catch it."
  },
  {
    id: "Q10",
    position: "Catcher (C)",
    type: "backup",
    scenario: "Runner on third. A ground ball is hit to the infield.",
    correct: "base-stay-home",
    explanation: "With a runner on third, the catcher must stay alert at home on any infield play — the runner could try to score on the throw."
  },

  // ===== FIRST BASE (1B) — 10 questions =====
  {
    id: "Q11",
    position: "First Base (1B)",
    type: "ball",
    scenario: "An errant throw sails wide to first base. You can't catch it with your foot on the bag.",
    correct: "ball-off-bag",
    explanation: "Step off the bag to catch the errant throw, then tag the batter-runner — stopping the ball is more important than keeping your foot on the base."
  },
  {
    id: "Q12",
    position: "First Base (1B)",
    type: "ball",
    scenario: "No runners on base. A slow roller is hit just in front of first base. You charge the ball.",
    correct: "ball-step-1b-self",
    explanation: "If you're charging a ball and can beat the runner yourself, there's no need to throw — step on the bag."
  },
  {
    id: "Q13",
    position: "First Base (1B)",
    type: "base",
    scenario: "Runner on first. A ground ball is hit to second base.",
    correct: "base-hold-1b",
    explanation: "On a possible double play, stay anchored to first to receive the relay throw from second."
  },
  {
    id: "Q14",
    position: "First Base (1B)",
    type: "backup",
    scenario: "Runner on first. The runner attempts to steal second.",
    correct: "base-hold-1b",
    explanation: "On a steal attempt, your job is to hold first base. If the throw is errant and the runner retreats, you need to be there. Don't leave the bag unguarded."
  },
  {
    id: "Q15",
    position: "First Base (1B)",
    type: "ball",
    scenario: "Runner on first and second. A ground ball is hit sharply to you.",
    correct: "ball-step-1b",
    explanation: "Take the sure out at first, then make a smart read on whether you have time for a second out."
  },
  {
    id: "Q16",
    position: "First Base (1B)",
    type: "backup",
    scenario: "Runner on second. A fly ball is hit to left field.",
    correct: "backup-2b",
    explanation: "After a caught fly with a runner on second, drift behind second base in case the throw comes in there."
  },
  {
    id: "Q17",
    position: "First Base (1B)",
    type: "base",
    scenario: "No outs, runner on first. The batter hits a weak ground ball toward third.",
    correct: "base-hold-1b",
    explanation: "Stay at first to receive a possible throw for the force out. Don't leave your bag unguarded."
  },
  {
    id: "Q18",
    position: "First Base (1B)",
    type: "ball",
    scenario: "No runners. A high pop-up is hit in foul territory near first base along the right field line.",
    correct: "ball-catch",
    explanation: "Foul pop-ups near first are your responsibility — communicate loudly, move to the ball, and squeeze it."
  },
  {
    id: "Q19",
    position: "First Base (1B)",
    type: "backup",
    scenario: "Runner on third. A ground ball is hit to second base. A throw comes to you at first for the out.",
    correct: "ball-hold-return",
    explanation: "After getting the out, stare down the runner on third to hold them — then calmly walk the ball back to the pitcher. Stay ready to throw home if they break."
  },
  {
    id: "Q20",
    position: "First Base (1B)",
    type: "ball",
    scenario: "An errant throw pulls you completely off the bag. The batter-runner is heading to first.",
    correct: "ball-off-bag",
    explanation: "When a throw takes you off the bag, prioritize catching the ball first, then quickly tag the runner."
  },

  // ===== SECOND BASE (2B) — 10 questions =====
  {
    id: "Q21",
    position: "Second Base (2B)",
    type: "ball",
    scenario: "No runners on base. A sharp ground ball is hit up the middle toward you.",
    correct: "ball-throw-1b",
    explanation: "Get in front of the ball, field it cleanly, and deliver a strong throw to first for the out."
  },
  {
    id: "Q22",
    position: "Second Base (2B)",
    type: "base",
    scenario: "Runner on first. A ground ball is hit to the left side of the infield. A flip throw comes to you at second.",
    correct: "ball-dp",
    explanation: "You're the pivot man. Catch it, drag second, pivot, and fire to first to turn two."
  },
  {
    id: "Q23",
    position: "Second Base (2B)",
    type: "backup",
    scenario: "Runner on first. The runner attempts to steal second.",
    correct: "base-cover-2b",
    explanation: "On a steal attempt, you and the shortstop must communicate — one of you covers second. With a right-handed batter, that's usually you."
  },
  {
    id: "Q24",
    position: "Second Base (2B)",
    type: "base",
    scenario: "Runner on second. A ground ball is hit to first base.",
    correct: "base-cover-1b",
    explanation: "When the first baseman charges a ball, second base covers first. It's a hustle play that requires quick reads."
  },
  {
    id: "Q25",
    position: "Second Base (2B)",
    type: "ball",
    scenario: "No runners on base. A shallow pop-up is hit behind first base in short right field.",
    correct: "ball-catch",
    explanation: "Second baseman often has the best angle on short pop-ups to right. Call loud and early, and catch it."
  },
  {
    id: "Q26",
    position: "Second Base (2B)",
    type: "backup",
    scenario: "Runner on first. A fly ball is hit to right field.",
    correct: "base-cover-2b",
    explanation: "After a catch in right field, be ready near second — the runner may try to advance on the throw."
  },
  {
    id: "Q27",
    position: "Second Base (2B)",
    type: "ball",
    scenario: "No runners on base. The batter hits a popup straight up over second base.",
    correct: "ball-catch",
    explanation: "Outfielders have priority over infielders, infielders have priority based on angle. Whoever has the best shot calls off the other. The key: communicate!"
  },
  {
    id: "Q28",
    position: "Second Base (2B)",
    type: "base",
    scenario: "Runner on first and third. A fly ball is hit to center field.",
    correct: "backup-relay",
    explanation: "Read the play — with runners on corners, position yourself as relay to hold or put out an advancing runner."
  },
  {
    id: "Q29",
    position: "Second Base (2B)",
    type: "ball",
    scenario: "No runners. A hard grounder is hit to your right, between first and second. You range far to your right to field it.",
    correct: "ball-flip-pitcher",
    explanation: "When you range far right, flip it to the pitcher covering first — you may not have time to set up for a full throw."
  },
  {
    id: "Q30",
    position: "Second Base (2B)",
    type: "backup",
    scenario: "Runner on third, no outs. A fly ball is hit to right field.",
    correct: "backup-relay",
    explanation: "Stay alert for relay duty — you're the link between the outfield throw and the infield on tag-up plays."
  },

  // ===== SHORTSTOP (SS) — 10 questions =====
  {
    id: "Q31",
    position: "Shortstop (SS)",
    type: "ball",
    scenario: "No runners on base. A routine ground ball is hit right to you.",
    correct: "ball-throw-1b",
    explanation: "The standard shortstop play — field it cleanly, set your feet, and make a strong throw to first."
  },
  {
    id: "Q32",
    position: "Shortstop (SS)",
    type: "ball",
    scenario: "Runner on first. A ground ball is hit to the left side of the infield. A throw comes to you at second.",
    correct: "ball-dp",
    explanation: "You're the pivot on plays from third. Catch, step, and throw — quick, clean footwork is the key."
  },
  {
    id: "Q33",
    position: "Shortstop (SS)",
    type: "base",
    scenario: "Runner on second. A ground ball is hit to first base.",
    correct: "base-cover-3b",
    explanation: "When the second baseman covers first, the shortstop shifts to cover third base to hold the runner."
  },
  {
    id: "Q34",
    position: "Shortstop (SS)",
    type: "backup",
    scenario: "Runner on first. The runner attempts to steal second.",
    correct: "base-cover-2b",
    explanation: "With a left-handed batter, the shortstop typically covers second on steal attempts — communicate early with the second baseman."
  },
  {
    id: "Q35",
    position: "Shortstop (SS)",
    type: "ball",
    scenario: "No runners on base. A ball is hit in the hole between third base and shortstop. You range far to your left to field it.",
    correct: "ball-throw-1b",
    explanation: "This is one of the hardest plays in baseball. Backhand it in the hole, plant, and throw off balance if needed."
  },
  {
    id: "Q36",
    position: "Shortstop (SS)",
    type: "base",
    scenario: "Runner on second and third. A ground ball is hit to second base.",
    correct: "base-cover-3b",
    explanation: "Always cover the lead runner's base when possible. The runner on third scores a run — that's the priority."
  },
  {
    id: "Q37",
    position: "Shortstop (SS)",
    type: "backup",
    scenario: "No runners on base. A single is hit to left field.",
    correct: "backup-relay",
    explanation: "On base hits to left, the shortstop moves into relay position in the outfield grass in case a runner rounds first."
  },
  {
    id: "Q38",
    position: "Shortstop (SS)",
    type: "ball",
    scenario: "No runners. A pop-up is hit in shallow left-center field.",
    correct: "ball-catch",
    explanation: "Outfielders have priority on shallow pop-ups because they're moving in and have better vision. Call it if you can catch it, but yield if the outfielder calls you off."
  },
  {
    id: "Q39",
    position: "Shortstop (SS)",
    type: "backup",
    scenario: "Runner on first and second. A fly ball is hit to center field.",
    correct: "base-cover-2b",
    explanation: "With runners on first and second after a caught fly, be at second base to handle a possible throw from center."
  },
  {
    id: "Q40",
    position: "Shortstop (SS)",
    type: "ball",
    scenario: "Runner on second. A ground ball is hit up the middle and you range far to your right to field it.",
    correct: "ball-throw-1b",
    explanation: "When ranged far to your right near second, a quick throw to first is your best option. Footwork and arm strength matter."
  },

  // ===== THIRD BASE (3B) — 10 questions =====
  {
    id: "Q41",
    position: "Third Base (3B)",
    type: "ball",
    scenario: "No runners on base. A sharp ground ball is hit down the third base line.",
    correct: "ball-throw-1b",
    explanation: "Third base is the hot corner — react fast, stay low, and make a long strong throw to first."
  },
  {
    id: "Q42",
    position: "Third Base (3B)",
    type: "base",
    scenario: "Runner on first. A ground ball is hit toward second base.",
    correct: "base-cover-3b",
    explanation: "When the shortstop is making a play at second, you must cover third to prevent the batter-runner or other runners from advancing."
  },
  {
    id: "Q43",
    position: "Third Base (3B)",
    type: "ball",
    scenario: "Runner on first. The batter hits a weak ground ball toward home plate.",
    correct: "ball-throw-1b",
    explanation: "Charge hard toward the ball, field it, then throw to first base for the out — third baseman owns weak ground balls near home plate."
  },
  {
    id: "Q44",
    position: "Third Base (3B)",
    type: "backup",
    scenario: "Runner on second. A single is hit to right field. The runner is heading to third.",
    correct: "ball-tag-runner",
    explanation: "You're the receiving end of a classic right-field-to-third throw. Set up on the infield side of the bag and tag low."
  },
  {
    id: "Q45",
    position: "Third Base (3B)",
    type: "backup",
    scenario: "No runners on base. An errant throw goes past first base and into right field.",
    correct: "base-cover-3b",
    explanation: "When a ball gets away into right field, the batter-runner may try to get to third. You must be there."
  },
  {
    id: "Q46",
    position: "Third Base (3B)",
    type: "ball",
    scenario: "Runner on third, one out. A slow grounder is hit to you. The runner on third has a big lead.",
    correct: "ball-throw-1b",
    explanation: "With a runner on third already in scoring position, take the sure out at first. Don't gamble by trying to pick the runner off third."
  },
  {
    id: "Q47",
    position: "Third Base (3B)",
    type: "base",
    scenario: "Bases loaded. A fly ball is hit to center field. The runners tag up.",
    correct: "base-cover-3b",
    explanation: "With bases loaded and a fly ball caught, the runner on third will almost certainly tag up. Be at the bag."
  },
  {
    id: "Q48",
    position: "Third Base (3B)",
    type: "ball",
    scenario: "No runners on base. A pop-up is hit high in foul territory between home and third.",
    correct: "ball-catch",
    explanation: "Foul pop-ups between home and third are primarily yours — call it off the catcher and catch it."
  },
  {
    id: "Q49",
    position: "Third Base (3B)",
    type: "backup",
    scenario: "Runner on second. A wild pitch bounces toward the backstop.",
    correct: "base-cover-3b",
    explanation: "On wild pitches with a runner on second, your job is to be at third in case the runner breaks for it."
  },
  {
    id: "Q50",
    position: "Third Base (3B)",
    type: "ball",
    scenario: "Runner on second. A hard shot is hit down the third base line. You backhand it but can't throw to first in time.",
    correct: "ball-step-3b",
    explanation: "When you can't get the batter-runner at first, step on third to retire the runner who was on second — that's still an out!"
  },

  // ===== LEFT FIELD (LF) — 5 questions =====
  {
    id: "Q51",
    position: "Left Field (LF)",
    type: "ball",
    scenario: "No runners on base. A line drive is hit into the left-center gap.",
    correct: "ball-cutoff",
    explanation: "Get to the ball quickly, hit the cut-off man (shortstop in relay position), and prevent the runner from taking an extra base."
  },
  {
    id: "Q52",
    position: "Left Field (LF)",
    type: "base",
    scenario: "Runner on first. A single is hit to you in shallow left field. The runner is heading to second.",
    correct: "ball-throw-2b",
    explanation: "With a runner on first rounding second, hit second base quickly to hold the runner and prevent them from advancing to third."
  },
  {
    id: "Q53",
    position: "Left Field (LF)",
    type: "backup",
    scenario: "No runners on base. A ground ball is hit to third base.",
    correct: "backup-3b",
    explanation: "Left fielder backs up third base on all throws from the right side of the infield — your job is to prevent a ball from going into the corner."
  },
  {
    id: "Q54",
    position: "Left Field (LF)",
    type: "ball",
    scenario: "Runner on second. A single is hit to you. The runner is rounding third and heading home.",
    correct: "ball-throw-home",
    explanation: "Runner heading home — throw directly to the catcher! Don't hit the cut-off unless the coach signals or you can't reach home."
  },
  {
    id: "Q55",
    position: "Left Field (LF)",
    type: "backup",
    scenario: "Runner on first. A ground ball is hit to the left side of the infield.",
    correct: "backup-2b",
    explanation: "Outfielders back up all infield throws — left fielder should drift toward second in case of a bad throw that gets into the outfield."
  },

  // ===== CENTER FIELD (CF) — 5 questions =====
  {
    id: "Q56",
    position: "Center Field (CF)",
    type: "ball",
    scenario: "No runners on base. A line drive is hit over second base into center field.",
    correct: "ball-cutoff",
    explanation: "As center fielder, attack the ball — don't let it play you. Get to it quickly and fire to the cut-off to limit the runner."
  },
  {
    id: "Q57",
    position: "Center Field (CF)",
    type: "backup",
    scenario: "No runners on base. A fly ball is hit to right field.",
    correct: "backup-rf",
    explanation: "Center fielder backs up all other outfielders. Move toward right to back up the play."
  },
  {
    id: "Q58",
    position: "Center Field (CF)",
    type: "base",
    scenario: "Runner on second. A fly ball is hit to you. You catch it and the runner tags up at second.",
    correct: "ball-throw-3b",
    explanation: "After the catch, look at the runner on second — if they tag up and advance, quickly throw to third to get them."
  },
  {
    id: "Q59",
    position: "Center Field (CF)",
    type: "ball",
    scenario: "No runners. A deep fly ball is hit over your head toward the warning track.",
    correct: "ball-catch",
    explanation: "Turn your back to the infield and sprint. The center fielder must go get every ball they possibly can."
  },
  {
    id: "Q60",
    position: "Center Field (CF)",
    type: "backup",
    scenario: "Runner on first. A ground ball is hit to the right side of the infield.",
    correct: "backup-2b",
    explanation: "Center fielder should always drift behind second base on ground balls to the right side — be the safety net."
  },

  // ===== RIGHT FIELD (RF) — 5 questions =====
  {
    id: "Q61",
    position: "Right Field (RF)",
    type: "ball",
    scenario: "Runner on second. A single is hit to you in right field. The runner is headed home.",
    correct: "ball-throw-home",
    explanation: "Right fielder has one of the strongest throw lanes in baseball — right to home. Charge it, crow-hop, and fire home."
  },
  {
    id: "Q62",
    position: "Right Field (RF)",
    type: "backup",
    scenario: "No runners on base. A ground ball is hit to first base.",
    correct: "backup-1b",
    explanation: "Right fielder backs up first base on all ground balls — move toward the first base line to stop any errant throw."
  },
  {
    id: "Q63",
    position: "Right Field (RF)",
    type: "ball",
    scenario: "No runners on base. A ball is hit down the right field line. It's curving toward the foul line.",
    correct: "ball-catch",
    explanation: "Go get the ball! If it stays fair, catch it on the fly if possible. If it goes foul, play the carom off the wall quickly."
  },
  {
    id: "Q64",
    position: "Right Field (RF)",
    type: "base",
    scenario: "Runner on first. A fly ball is hit to you. You catch it and the runner tags up.",
    correct: "ball-throw-2b",
    explanation: "If the runner tags from first, your throw goes to second — don't overthrow to third."
  },
  {
    id: "Q65",
    position: "Right Field (RF)",
    type: "backup",
    scenario: "Runner on first. A ground ball is hit to second base.",
    correct: "backup-1b",
    explanation: "Right fielder backs up first base on all infield ground balls — especially important on plays to the right side."
  }

];
