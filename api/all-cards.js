import { fetchAllCards } from '../utils/fetchAllCards.js';

export default async function handler(req, res) {
    try {
        const cards = await fetchAllCards();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
}
