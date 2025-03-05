import { supabase } from '../config/supabase.js';

export default async function fetchBoosterCards(boosterID, userID, boosterregion) {

    const { data: booster, error } = await supabase
        .from('User_Booster')
        .select('booster_quantity')
        .eq('booster_id', boosterID)
        .eq('user_id', userID)
        .single();

    if (error) {
        console.error("Error fetching booster data:", error);
        return;
    }

    if (booster.booster_quantity > 0) {
        try {
            let { data: cards, error } = await supabase
                .from('Card')
                .select('*')
                .eq('region', boosterregion);

            if (error) {
                throw error;
            }

            if (!cards || cards.length === 0) {
                throw new Error('No cards found for this region');
            }

            const commonCards = cards.filter(card => card.rarity === 'Common');
            const rareCards = cards.filter(card => card.rarity === 'Rare');

            if (commonCards.length < 4 || rareCards.length < 1) {
                throw new Error('Not enough cards to create a booster pack');
            }

            const getRandomCards = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);
            const selectedCommons = getRandomCards(commonCards, 4);
            const selectedRare = getRandomCards(rareCards, 1);

            const boosterPack = {
                boosterID,
                userID,
                region: boosterregion,
                cards: [...selectedCommons, ...selectedRare],
            };

            return boosterPack;
        } catch (error) {
            console.error('Error fetching booster cards:', error);
            throw error;
        }
    }
    else if(booster.booster_quantity <= 0){
        const { error: deleteError } = await supabase
            .from('User_Booster')
            .delete()
            .eq('booster_id', boosterID)
            .eq('user_id', userID);

        if (deleteError) {
            console.error("Error deleting booster data:", deleteError);
        } else {
            console.log("Booster data deleted successfully");
            return boosterPack;
        }
    }
}