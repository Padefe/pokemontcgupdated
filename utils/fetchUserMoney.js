import { supabase } from "../config/supabase.js";

export async function fetchUserMoney(user_id) {
    const { data: money, error } = await supabase
        .from("User")
        .select("balance")
        .eq("user_id", user_id)
        .single();
    
    if (error) {
        console.error("fetch.js: Error fetching money:", error);
        return [];
    }
    return money;
    }