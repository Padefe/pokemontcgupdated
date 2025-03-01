import express from 'express';
import cardRoutes from '../routes/cardRoutes.js';
import { config } from 'dotenv';
import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

config();

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
