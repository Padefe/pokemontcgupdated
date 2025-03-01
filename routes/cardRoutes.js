import express from 'express';
import { getPokemonCards } from '../controllers/cardController.js';

const router = express.Router();

router.get('/pokemon-cards', getPokemonCards);

console.log("Test");

export default router;