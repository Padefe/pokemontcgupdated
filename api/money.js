import {fetchUserMoney} from '../utils/fetchUserMoney.js';

export default async function handler(req, res) {
    const user_id = req.query.user_id;
    try {
        const money = await fetchUserMoney(user_id);
        res.status(200).json(money);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch money' });
    }
}