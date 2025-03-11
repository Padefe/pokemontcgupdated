import {supabase} from '../config/supabase.js';
import { trainerPokemon } from '../controllers/trainerPokemon.js';

export async function fetchTrainerCards(selectedT) 
{   
    console.log("test5");
    const trainerP = await trainerPokemon(selectedT);

    if (trainerP.length === 0) {
        console.error('No Pokémon found for the trainer:', selectedT);
        return [];
    }

    const { data, error } = await supabase
    .from('Card')
    .select('*')
    .in('card_id', trainerP);

    if (error) {
        console.error('fetch.js: Error fetching cards:', error);
        return [];
    }
    return data;
}
