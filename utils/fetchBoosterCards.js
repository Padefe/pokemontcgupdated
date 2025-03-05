import {supabase} from '../config/supabase.js';

export default async function fetchBoosterCards(boosterID, userID, boosterregion) {
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

        // Separate common and rare cards
        const commonCards = cards.filter(card => card.rarity === 'Common');
        const rareCards = cards.filter(card => card.rarity === 'Rare');

        if (commonCards.length < 4 || rareCards.length < 1) {
            throw new Error('Not enough cards to create a booster pack');
        }

        // Randomly select 4 commons and 1 rare
        const getRandomCards = (arr, num) => arr.sort(() => 0.5 - Math.random()).slice(0, num);
        const selectedCommons = getRandomCards(commonCards, 4);
        const selectedRare = getRandomCards(rareCards, 1);

        // Construct booster pack
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