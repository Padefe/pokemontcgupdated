import express from 'express';
import pokemonRoutes from './routes/cardRoutes.js';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', pokemonRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
