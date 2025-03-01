import {supabase} from '../config/supabase.js';

export async function fetchPokemonCards() 
{
    const { data, error } = await supabase.from('Card').select('*');

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
