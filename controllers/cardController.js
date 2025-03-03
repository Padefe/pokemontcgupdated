import { fetchPokemonCards } from "../utils/fetchPokemonCards.js";

export const getPokemonCards = async (req, res) =>
{
    try
    {
        const cards = await fetchPokemonCards();
        res.json(cards);
    }
    catch (error)
    {
        res.status(500).json({ error: 'cardController.js: failed to fetch cards' });
    }
}