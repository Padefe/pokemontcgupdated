import {supabase} from '../config/supabase.js';

export async function fetchBoosterPacks()
{
    const { data, error } = await supabase
    .from('Booster_Pack')
    .select('*');

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}