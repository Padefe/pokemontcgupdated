import express from 'express';
import serverless from 'serverless-http';
//import cardRoutes from '../routes/cardRoutes.js';
//import { config } from 'dotenv';
//import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

//config();

const app = express();

//app.set('view engine', 'ejs');
//app.set('views', __dirname + '/../views');
//app.use(express.static(__dirname + '/../public'));

//app.use('/api', cardRoutes);
/*
app.get('/', (req, res) => {
    res.render('index');
});
*/
app.get('/', (req, res) => {
    console.log("Root route hit"); // Log that the route was accessed
    try {
        res.send('Hello, world!');
        console.log("Response sent successfully");
    } catch (error) {
        console.error("Error sending response:", error);
    }
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

export default serverless(app);
