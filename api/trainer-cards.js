import { fetchTrainerCards } from '../utils/fetchTrainerCards.js';

export default async function handler(req, res) {
    const selectedT = req.query.selectedTrainer;
    console.log("test4");
    try {
        const tCards = await fetchTrainerCards(selectedT);
        res.status(200).json(tCards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
}