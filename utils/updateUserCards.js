import { supabase } from "../config/supabase.js";

export async function updateUserCards(boosterPackCards) {

    if (!boosterPackCards || !Array.isArray(boosterPackCards.cards)) {
        console.error("boosterPackCards does not contain a valid cards array.");
        return;
    }

    const packID = boosterPackCards.boosterID;
    const userID = boosterPackCards.userID;

    const { data: booster, error: fetchError } = await supabase
    .from('User_Booster')
    .select('booster_quantity')
    .eq('booster_id', packID)
    .eq('user_id', userID)
    .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        // Handle error fetching row
        return res.status(500).json({ success: false, message: 'Failed to fetch existing data' });
    }

    if (booster.booster_quantity > 0) {
        // Row exists, so increment quantity
        const { error: updateError } = await supabase
            .from('User_Booster')
            .update({
                booster_quantity: booster.booster_quantity - 1
            })
            .eq('booster_id', packID)
            .eq('user_id', userID)

            for (const card of boosterPackCards.cards) {

                const { data, error: fetchError } = await supabase
                    .from('User_cards')
                    .select('quantity')
                    .eq('card_id', card.card_id)
                    .eq('user_id', userID)
                    .single();
                    
                if (fetchError && fetchError.code !== 'PGRST116') {
                    // Handle error fetching row
                    return res.status(500).json({ success: false, message: 'Failed to fetch existing data' });
                }
        
                if (data) {
                    // Row exists, so increment quantity
                    const { error: updateError } = await supabase
                        .from('User_cards')
                        .update({
                            quantity: data.quantity + 1
                        })
                        .eq('card_id', card.card_id)
                        .eq('user_id', userID);
        
                    if (updateError) {
                        return res.status(500).json({ success: false, message: 'Failed to update booster quantity' });
                    }
                }
                else {
                    const { error: insertError } = await supabase
                        .from('User_cards')
                        .insert([{ user_id: userID, card_id: card.card_id, quantity: 1 }]);
        
                    if (insertError) {
                        return res.status(500).json({ success: false, message: 'Failed to insert new booster pack' });
                    }

                }
            }

        if (updateError) {
            return res.status(500).json({ success: false, message: 'Failed to update booster quantity' });
        }

    }
    const { data: booster2, error: fetchError2 } = await supabase
    .from('User_Booster')
    .select('booster_quantity')
    .eq('booster_id', packID)
    .eq('user_id', userID)
    .single();

    if (fetchError2 && fetchError2.code !== 'PGRST116') {
        // Handle error fetching row
        return res.status(500).json({ success: false, message: 'Failed to fetch existing data' });
    }

    console.log(booster2.booster_quantity);
    if(booster2.booster_quantity <= 0){
        const { error: deleteError } = await supabase
            .from('User_Booster')
            .delete()
            .eq('booster_id', packID)
            .eq('user_id', userID);

        if (deleteError) {
            console.error("Error deleting booster data:", deleteError);
        } else {
            console.log("Booster data deleted successfully");
        }
    }
    return boosterPackCards;
}