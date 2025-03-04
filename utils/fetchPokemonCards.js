import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards(user_id) 
{

    const { data, error } = await supabase
    .from('User_cards')
    .select('*, Card(card_name, dex_number, img_url)')
    .eq('user_id', user_id);

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
