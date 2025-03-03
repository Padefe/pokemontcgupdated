import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards() 
{
    const { data, error } = await supabase
    .from('User_cards')
    .select('*, Card(card_name, dex_number, img_url)')
    .eq('user_id', "9ec32a6f-a6f5-4b1f-a342-88a6d607ac05");

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
