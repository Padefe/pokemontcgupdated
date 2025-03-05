import { fetchBoosterPacks } from "../utils/fetchBoosterPacks.js";
import { fetchUserMoney } from "../utils/fetchUserMoney.js";
import { supabase } from '../config/supabase.js';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { userID } = req.body;
        const { packID } = req.body;

        try {
            const userMoney = await fetchUserMoney(userID);
            const boosterPacks = await fetchBoosterPacks();

            const selectedPack = boosterPacks.find(pack => pack.booster_id === packID);

            const { price } = selectedPack;

            const moneyValue = userMoney?.balance ?? 0;

            if (moneyValue >= price) {
                const newMoney = moneyValue - price;
                const { error: updateBalanceError } = await supabase
                    .from('User')
                    .update({ balance: newMoney })
                    .eq('user_id', userID);

                if (updateBalanceError) {
                    return res.status(500).json({ success: false, message: "Failed to update balance" });
                }

            }
            else {
                return res.status(400).json({ success: false, message: "Not enough money" });
            }

            const { data, error: fetchError } = await supabase
                .from('User_Booster')
                .select('booster_quantity')
                .eq('user_id', userID)
                .eq('booster_id', packID)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                // Handle error fetching row
                return res.status(500).json({ success: false, message: 'Failed to fetch existing data' });
            }

            if (data) {
                // Row exists, so increment quantity
                const { error: updateError } = await supabase
                    .from('User_Booster')
                    .update({
                        booster_quantity: data.booster_quantity + 1
                    })
                    .eq('user_id', userID)
                    .eq('booster_id', packID);

                if (updateError) {
                    return res.status(500).json({ success: false, message: 'Failed to update booster quantity' });
                }
            } else {
                // Row does not exist, so insert new one
                const { error: insertError } = await supabase
                    .from('User_Booster')
                    .insert([{ user_id: userID, booster_id: packID, booster_quantity: 1 }]);

                if (insertError) {
                    return res.status(500).json({ success: false, message: 'Failed to insert new booster pack' });
                }
            }

            res.status(200).json({ success: true, message: "Successfully bought booster pack" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error from API" });
        }
    }
}