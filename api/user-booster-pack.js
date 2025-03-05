import { fetchUserBooster } from "../utils/fetchUserBooster.js";

export default async function handler(req, res) {
    const user_id = req.query.user_id;
    try {
        const packs = await fetchUserBooster(user_id);
        console.log(packs);
        res.status(200).json(packs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch packs' });
    }
}
