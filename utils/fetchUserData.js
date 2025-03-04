import { supabase } from '../config/supabase.js';

export async function fetchUserData(username) {

    const { data: user, error } = await supabase
        .from('User')
        .select('user_id, user_name, password')
        .eq('user_name', username)
        .single();

    if (error) {
        console.error('fetch.js: Error fetching user:', error);
        return [];
    }   
    return user;
}