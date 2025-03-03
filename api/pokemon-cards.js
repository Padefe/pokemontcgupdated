// api/pokemon-cards.js
import { fetchPokemonCards } from '../utils/fetchPokemonCards.js';

export default async function handler(req, res) {
   try {
       // Fetch dynamic data (e.g., from Supabase)
       const cards = await fetchPokemonCards();
       res.status(200).json(cards); // Respond with dynamic data as JSON
   } catch (error) {
       res.status(500).json({ error: 'Failed to fetch cards' }); // Error handling
   }
}
