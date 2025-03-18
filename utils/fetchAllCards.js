import { supabase } from '../config/supabase.js';

export async function fetchAllCards() {
    let allCards = [];
    let currentOffset = 0;
    const limit = 1000;  // You can adjust this as needed, depending on your use case

    try {
        while (true) {
            // Fetch a page of cards based on the current offset
            const { data, error } = await supabase
                .from('Card')
                .select('*')
                .range(currentOffset, currentOffset + limit - 1);  // Fetching 1000 cards at a time

            if (error) {
                console.error('Error fetching all cards:', error);
                break;
            }

            if (data.length === 0) {
                break;  // Exit the loop if no more cards are available
            }

            allCards = [...allCards, ...data];  // Add the fetched cards to the result array
            currentOffset += limit;  // Move the offset forward to fetch the next set of cards
        }

        return allCards;  // Return the combined array of all cards

    } catch (error) {
        console.error('Unexpected error fetching all cards:', error);
        return [];
    }
}
