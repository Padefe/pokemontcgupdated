import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards(user_id) 
{

    const { data, error } = await supabase
    .from('User_cards')
    .select('*, Card(*)')
    .eq('user_id', user_id);

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
