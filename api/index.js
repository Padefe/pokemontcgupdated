import express from 'express';
import serverless from 'serverless-http';
import cardRoutes from '../routes/cardRoutes.js';
import { config } from 'dotenv';
import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/api', cardRoutes);

app.get('/collection', async (req, res) =>
{
    try
    {
        const cards = await fetchPokemonCards();
        res.render('cards', { cards });
    }
    catch (error)
    {
        res.status(500).json({ error: 'failed to fetch cards' });
    }
});

export const handler = serverless(app);
