import { fetchTrainerCards } from '../utils/fetchTrainerCards.js';
import { supabase } from '../config/supabase.js';


export default async function handler(req, res) {
    const selectedT = req.query.selectedTrainer;
    const userID = req.query.user_id;

    if (!selectedT) {
        try {
            const { data, error } = await supabase
                .from('Gymleader_Check')
                .select('leader')
                .eq('user_id', userID);

            if (error) {
                throw error;
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch leader', details: error.message });
        }
    } 
    else {
        try {
            const tCards = await fetchTrainerCards(selectedT);
            return res.status(200).json(tCards);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch cards', details: error.message });
        }
    }
}