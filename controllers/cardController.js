import { fetchPokemonCards } from "../utils/fetchPokemonCards";

export const getPokemonCards = async (req, res) =>
{
    try
    {
        const cards = await fetchPokemonCards();
        res.json(cards);
    }
    catch (error)
    {
        res.status(500).json({ error: 'failed to fetch cards' });
    }
}