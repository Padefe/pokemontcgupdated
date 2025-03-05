import { fetchBoosterPacks } from "../utils/fetchBoosterPacks.js";

export default async function handler(req, res) {
    try {
        const boosterPacks = await fetchBoosterPacks();
        res.status(200).json(boosterPacks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch booster packs' });
    }
}
