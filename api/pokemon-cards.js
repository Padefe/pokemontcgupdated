import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

export default async function handler(req, res) {
    try {
        const cards = await fetchPokemonCards();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
}
