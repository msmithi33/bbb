/* ===== BBB — Shared Answer Pool ===== */
/* Each answer has:
     id     — unique key referenced by questions
     text   — displayed to the player
     cat    — 'ball' | 'base' | 'backup' | 'joke'
     pos    — array of position codes where this answer applies, or 'all'
   Position codes: P C 1B 2B SS 3B LF CF RF
*/
'use strict';

window.ANSWERS = [

  // ===== BALL — fielding and throwing actions =====
  { id: 'ball-throw-1b',     text: 'Field the ball and throw to first base',                   cat: 'ball',   pos: ['P','C','1B','2B','SS','3B','LF','CF','RF'] },
  { id: 'ball-throw-2b',     text: 'Field the ball and throw to second base',                  cat: 'ball',   pos: ['P','C','1B','2B','SS','3B','LF','CF','RF'] },
  { id: 'ball-throw-3b',     text: 'Field the ball and throw to third base',                   cat: 'ball',   pos: ['P','C','1B','2B','SS','LF','CF','RF'] },
  { id: 'ball-throw-home',   text: 'Field the ball and throw home',                            cat: 'ball',   pos: ['P','1B','2B','SS','3B','LF','CF','RF'] },
  { id: 'ball-tag-runner',   text: 'Field the ball and tag the runner',                        cat: 'ball',   pos: ['P','C','1B','2B','SS','3B'] },
  { id: 'ball-step-1b',      text: 'Field the ball and step on first base for the force out',  cat: 'ball',   pos: ['1B','2B'] },
  { id: 'ball-step-2b',      text: 'Field the ball and step on second base for the force out', cat: 'ball',   pos: ['2B','SS'] },
  { id: 'ball-step-3b',      text: 'Field the ball and step on third base for the force out',  cat: 'ball',   pos: ['3B','SS'] },
  { id: 'ball-catch',        text: 'Catch the ball and return it to the pitcher',            cat: 'ball',   pos: 'all' },
  { id: 'ball-flip-pitcher', text: 'Field the ball and flip to the pitcher',                   cat: 'ball',   pos: ['1B','2B','SS'] },
  { id: 'ball-cutoff',       text: 'Field the ball and throw to the cut-off man',              cat: 'ball',   pos: ['LF','CF','RF'] },
  { id: 'ball-step-1b-self', text: 'Field the ball and step on first base yourself',           cat: 'ball',   pos: ['1B'] },
  { id: 'ball-dp',           text: 'Field the ball, step on the bag, then throw to first',     cat: 'ball',   pos: ['2B','SS'] },
  { id: 'ball-off-bag',      text: 'Step off the bag to catch the throw, then tag the runner', cat: 'ball',  pos: ['1B','2B','SS','3B'] },
  { id: 'ball-hold-return',  text: 'Field the ball, then hold the runner and get the ball to the pitcher',     cat: 'ball',  pos: ['1B','3B'] },

  // ===== BASE — positional coverage =====
  { id: 'base-cover-1b',    text: 'Cover first base',                                         cat: 'base',   pos: ['1B','2B'] },
  { id: 'base-cover-2b',    text: 'Cover second base',                                        cat: 'base',   pos: ['2B','SS'] },
  { id: 'base-cover-3b',    text: 'Cover third base',                                         cat: 'base',   pos: ['SS','3B'] },
  { id: 'base-cover-home',  text: 'Cover home plate',                                         cat: 'base',   pos: ['P','C'] },
  { id: 'base-stay-mound',  text: 'Stay on the mound',                                        cat: 'base',   pos: ['P'] },
  { id: 'base-stay-home',   text: 'Stay at home plate',                                        cat: 'base',   pos: ['C'] },
  { id: 'base-dp',          text: 'Cover second base, step on the bag, catch the throw, then throw to first',     cat: 'base',   pos: ['2B','SS'] },
 
  // ===== BACKUP — backing up plays =====
  { id: 'backup-1b',        text: 'Back up first base',                                       cat: 'backup', pos: ['RF','1B'] },
  { id: 'backup-2b',        text: 'Back up second base',                                      cat: 'backup', pos: ['LF','CF','1B'] },
  { id: 'backup-3b',        text: 'Back up third base',                                       cat: 'backup', pos: ['LF'] },
  { id: 'backup-pitcher',   text: 'Back up the pitcher',                                      cat: 'backup', pos: ['2B','SS'] },
  { id: 'backup-relay',     text: 'Be the cutoff/relay',                                      cat: 'backup', pos: ['2B','SS'] },
  { id: 'backup-rf',        text: 'Back up the right fielder',                                cat: 'backup', pos: ['CF'] },
  { id: 'backup-lf',        text: 'Back up the left fielder',                                 cat: 'backup', pos: ['CF'] },
  { id: 'backup-cf',        text: 'Back up the center fielder',                               cat: 'backup', pos: ['LF','RF'] },
  { id: 'backup-play',      text: 'Back up the infielder making the play',                    cat: 'backup', pos: ['CF','LF','RF'] },

  // ===== JOKE — wrong every time =====
  { id: 'joke-daisies',     text: 'It\'s too hard to get it. Let someone else do it.',        cat: 'joke',   pos: 'all' },
  { id: 'joke-butterfly',   text: 'Chase a butterfly',                                        cat: 'joke',   pos: 'all' },
  { id: 'joke-wave',        text: 'Wave to your parents in the stands',                       cat: 'joke',   pos: 'all' },
  { id: 'joke-umpire',      text: 'Ask the umpire what to do',                                cat: 'joke',   pos: 'all' },
  { id: 'joke-dugout',      text: 'Wave to the ball as it passes by you',                     cat: 'joke',   pos: 'all' },
  { id: 'joke-shoelaces',   text: 'Call time out to tie your shoelaces',                      cat: 'joke',   pos: 'all' },
  { id: 'joke-ground',      text: 'Throw your glove on the ground',                           cat: 'joke',   pos: 'all' },
  { id: 'joke-break',       text: 'Sit down and take a break',                                cat: 'joke',   pos: 'all' },
  { id: 'joke-glove',       text: 'Throw your glove at the ball',                             cat: 'joke',   pos: 'all' },
  { id: 'joke-highfive',    text: 'High five the first base coach',                           cat: 'joke',   pos: 'all' },
  { id: 'joke-sky',         text: 'Stare at the clouds',                                      cat: 'joke',   pos: 'all' },
  { id: 'joke-pretend',     text: 'Pretend you didn\'t see it',                               cat: 'joke',   pos: 'all' },
  { id: 'joke-mountaindew', text: 'Get coach a Mountain Dew',                                 cat: 'joke',   pos: 'all' },

];
