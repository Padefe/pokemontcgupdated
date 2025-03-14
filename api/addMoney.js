import { fetchUserMoney } from '../utils/fetchUserMoney.js';
import { fetchTrainerReward } from '../utils/fetchTrainerReward.js';
import { supabase } from '../config/supabase.js';

export default async function handler(req, res) {
    const { storedUserId, selectedTrainer, sellprice, cardid } = req.body;

    const sell_price = sellprice;
    const card_id = cardid;
    const user_id = storedUserId;
    const selectedT = selectedTrainer;

    console.log("test1");

    if (sell_price === undefined) {
        console.log("test2");
        try {
            const userMoney = await fetchUserMoney(user_id);
            const reward = await fetchTrainerReward(selectedT, user_id);

            const moneyValue = userMoney?.balance ?? 0;

            if (reward?.reward > 0) {
                const newMoney = moneyValue + reward.reward;
                console.log("New Money:", newMoney);

                const { error: updateBalanceError } = await supabase
                    .from('User')
                    .update({ balance: newMoney })
                    .eq('user_id', user_id)
                    .single();

                if (updateBalanceError) {
                    return res.status(500).json({ success: false, message: "Failed to update balance" });
                }

                return res.status(200).json({ success: true, balance: newMoney });
            } else {
                return res.status(400).json({ success: false, message: "No reward" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch money' });
        }
    } else {
        console.log(sell_price);
        console.log(user_id);
        try {
            const userMoney = await fetchUserMoney(user_id);
            const moneyValue = userMoney?.balance ?? 0;

            console.log(moneyValue);

            if (sell_price > 0) {
                const newMoney = parseFloat(moneyValue) + parseFloat(sell_price);
                console.log("New Money:", newMoney);

                const { error: updateBalanceError } = await supabase
                    .from('User')
                    .update({ balance: newMoney })
                    .eq('user_id', user_id);

                if (updateBalanceError) {
                    return res.status(500).json({ success: false, message: "Failed to update balance" });
                }

                // Fetch card quantity
                const { data: cardData, error: cardFetchError } = await supabase
                    .from('User_cards')
                    .select('quantity')
                    .eq('card_id', card_id)
                    .eq('user_id', user_id)
                    .single();

                if (cardFetchError) {
                    return res.status(500).json({ success: false, message: "Failed to fetch card quantity" });
                }

                const cardQuantity = cardData?.quantity ?? 0;

                if (cardQuantity > 1) {
                    // Reduce quantity by 1
                    const { error: updateCardError } = await supabase
                        .from('User_cards')
                        .update({ quantity: cardQuantity - 1 })
                        .eq('card_id', card_id)
                        .eq('user_id', user_id);

                    if (updateCardError) {
                        return res.status(500).json({ success: false, message: "Failed to update card quantity" });
                    }
                } else {
                    // Delete card if quantity is 1
                    const { error: deleteError } = await supabase
                        .from('User_cards')
                        .delete()
                        .eq('card_id', card_id)
                        .eq('user_id', user_id);

                    if (deleteError) {
                        return res.status(500).json({ success: false, message: "Failed to delete card" });
                    }
                }

                return res.status(200).json({ success: true, balance: newMoney });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to process request' });
        }
    }
}
