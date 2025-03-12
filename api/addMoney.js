import { fetchUserMoney } from '../utils/fetchUserMoney.js';
import { fetchTrainerReward } from '../utils/fetchTrainerReward.js';
import { supabase } from '../config/supabase.js';

export default async function handler(req, res) {
    const { storedUserId } = req.body;
    const { selectedTrainer } = req.body;

    const user_id = storedUserId;
    const selectedT = selectedTrainer;

    try {
        const userMoney = await fetchUserMoney(user_id);
        const reward = await fetchTrainerReward(selectedT);

        console.log(userMoney);
        console.log(reward);

        const moneyValue = userMoney?.balance ?? 0;

        if (reward > 0) {  // Fixes the incorrect assignment
            const newMoney = moneyValue + reward;
            console.log(newMoney);
            const { error: updateBalanceError } = await supabase
                .from('User')
                .update({ balance: newMoney })
                .eq('user_id', user_id);  // Fixes incorrect variable name

            if (updateBalanceError) {
                return res.status(500).json({ success: false, message: "Failed to update balance" });
            }

            return res.status(200).json({ success: true, balance: newMoney });
        } else {
            return res.status(400).json({ success: false, message: "No reward" });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch money' });
    }
}
