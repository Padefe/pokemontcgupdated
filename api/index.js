import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';
import cardRoutes from '../routes/cardRoutes.js';
import { config } from 'dotenv';
//import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', cardRoutes);

app.get('/', (req, res) => {
    console.log("test index.js 2");
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});



/*app.get('/collection', async (req, res) =>
{
    console.log("test index.js 3");
    try
    {
        console.log('Route /collection hit');
        const cards = await fetchPokemonCards();
        res.render('collection', { cards });
    }
    catch (error)
    {
        res.status(500).json({ error: 'index.js: failed to fetch cards' });
    }
});
*/

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


export default serverless(app);
