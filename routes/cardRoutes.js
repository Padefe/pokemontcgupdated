import express from 'express';
import { getPokemonCards } from '../controllers/cardController.js';
import { getBoosterPacks } from '../controllers/boosterpackController.js';
import { getUserData } from '../controllers/userController.js';

const router = express.Router();

router.get('/pokemon-cards', getPokemonCards);

router.get('/booster-packs', getBoosterPacks);

router.post('/login', getUserData);

export default router;