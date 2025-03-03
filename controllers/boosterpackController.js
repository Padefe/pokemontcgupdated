import { fetchBoosterPacks } from "../utils/fetchBoosterPacks.js";

export const getBoosterPacks = async (req, res) =>
{
    try
    {
        const boosterPacks = await fetchBoosterPacks();
        res.json(boosterPacks);
    }
    catch (error)
    {
        res.status(500).json({ error: 'boosterpackController.js: failed to fetch booster pack' });
    }
}