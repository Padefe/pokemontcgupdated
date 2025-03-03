import express from 'express';
import { getPokemonCards } from '../controllers/cardController.js';
import { getBoosterPacks } from '../controllers/boosterpackController.js';

const router = express.Router();

router.get('/pokemon-cards', getPokemonCards);

router.get('/booster-packs', getBoosterPacks);

export default router;