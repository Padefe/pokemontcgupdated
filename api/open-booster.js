import fetchBoosterCards from '../utils/fetchBoosterCards.js';

export default async function handler(req, res) {
    if(req.method === 'POST')
    {
        const { boosterID, userID, boosterregion } = req.body;

            try {
            const boostercards = await fetchBoosterCards(boosterID, userID, boosterregion);
            res.status(200).json(boostercards);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch booster pack cards' });
        }
    }
}