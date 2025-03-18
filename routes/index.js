import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';
import cardRoutes from './cardRoutes.js';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', cardRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/collection', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/collection.html'));
});

app.get('/shop', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/shop.html'));
});

app.get('/booster-pack', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/boosterPack.html'));
});

app.get('/play', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sPlay.html'));
});

app.get('/play-start', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/play-start.html'));
});

export default serverless(app);