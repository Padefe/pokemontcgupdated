import { supabase } from "../config/supabase.js";

export async function updateUserCards(boosterPackCards) {
    console.log("test");

    if (!boosterPackCards || !Array.isArray(boosterPackCards.cards)) {
        console.error("boosterPackCards does not contain a valid cards array.");
        return;
    }

    console.log("Booster Pack Cards:", boosterPackCards);
    console.log("Cards Array:", boosterPackCards.cards);

    for (const card of boosterPackCards) {

        console.log(card.cards.card_id);

        const { data, error: fetchError } = await supabase
            .from('User_Cards')
            .select('quantity')
            .eq('usercards_id', card.card_id)
            .eq('user_id', userID)
            .single();


            
        if (fetchError && fetchError.code !== 'PGRST116') {
            // Handle error fetching row
            return res.status(500).json({ success: false, message: 'Failed to fetch existing data' });
        }
        console.log("test");
        if (data) {
            // Row exists, so increment quantity
            const { error: updateError } = await supabase
                .from('User_Cards')
                .update({
                    quantity: data.quantity + 1
                })
                .eq('usercards_id', card.card_id)
                .eq('user_id', userID);

            if (updateError) {
                return res.status(500).json({ success: false, message: 'Failed to update booster quantity' });
            }
        }
        else {
            // Row does not exist, so insert new one
            const { error: insertError } = await supabase
                .from('User_Cards')
                .insert([{ user_id: userID, usercard_id: card.card_id, quantity: 1 }]);

            if (insertError) {
                return res.status(500).json({ success: false, message: 'Failed to insert new booster pack' });
            }
        }
    }
    return test;
}