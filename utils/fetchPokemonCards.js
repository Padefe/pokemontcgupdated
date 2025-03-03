import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards() 
{
    const { data, error } = await supabase.from('User_cards').select('*').join('Cards', 'Cards.id', 'User_cards.card_id');

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
