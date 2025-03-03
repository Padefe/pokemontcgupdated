import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards() 
{
    const { data, error } = await supabase
    .from('User_cards')
    .select('*')
    .join('Card', 'card.id', 'User_cards.card_id')
    .eq('User_cards.user_id', "9ec32a6f-a6f5-4b1f-a342-88a6d607ac05");

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
