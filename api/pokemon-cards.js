import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

export default async function handler(req, res) {
    const user_id = req.query.user_id;
    try {
        const cards = await fetchPokemonCards(user_id);
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
}
