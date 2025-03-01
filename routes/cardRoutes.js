import express from 'express';
import { getPokemonCards } from '../controllers/cardController.js';

const router = express.Router();

console.log('cardRoutes.js: router loaded');

router.get('/pokemon-cards', getPokemonCards);

export default router;