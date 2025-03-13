import {supabase} from '../config/supabase.js';

export async function fetchUserBooster(user_id) 
{
    const { data, error } = await supabase
    .from('User_Booster')
    .select('*, Booster_Pack(booster_name, boosterimg_url)')
    .eq('user_id', user_id);

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }

    return data;
}
