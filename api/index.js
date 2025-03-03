import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';
import cardRoutes from '../routes/cardRoutes.js';
import { config } from 'dotenv';
import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', cardRoutes);

app.get('/api/cards', async (req, res) => {
    try {
        const cards = await fetchPokemonCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/collection', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/collection.html'));
});

export default serverless(app);

