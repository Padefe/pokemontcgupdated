import express from 'express';
import serverless from 'serverless-http';
import cardRoutes from '../routes/cardRoutes.js';
import { config } from 'dotenv';
//import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

config();
console.log("test config");

const app = express();
console.log("test express");

app.set('view engine', 'ejs');
console.log("test view engine");

app.set('views');
console.log("test views");

app.use(express.static('public'));
console.log("test public");

app.use('/api', cardRoutes);
console.log("test cardRoutes");

app.get('/', (req, res) => {
    console.log("test index.js 2");
    res.render('index');
});
console.log("test /");


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
console.log("test serverlisten");

export default serverless(app);
