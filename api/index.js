import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';
import cardRoutes from '../routes/cardRoutes.js';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/pokemon-cards', async (req, res) => {
    try {
        const cards = await fetchPokemonCards();
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});

app.use('/api', cardRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/collection', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/collection.html'));
});
 app.listen(3000, () => {
    console.log('Server running on port 3000');
}
);
export default serverless(app);

