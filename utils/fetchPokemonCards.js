import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards() 
{
    const { data, error } = await supabase.from('User_cards').select('*').join('Card', 'card.id', 'user_cards.card_id').eq('user_cards.user_id', user_id);

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
