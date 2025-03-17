// module.js (entry point for your app)
import { trainerTurn } from './trainerMechanics.js';
import { startRound } from './sPlay.js';  // This is if you have a play.js file for other game mechanics

// Now you can call startRound or any function from the imported modules
startRound();