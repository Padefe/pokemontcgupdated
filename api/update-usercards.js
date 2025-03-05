import { updateUserCards } from "../utils/updateUserCards.js";

export default async function handler(req, res) {
    const { boosterPackCards } = req.body;
    try {
        const updateCards = await updateUserCards(boosterPackCards);
        res.status(200).json(updateCards);
    } catch (error) {
        console.error("Error in API:", error);
        res.status(500).json({ error: 'Failed to update users cards', details: error.message });
    }
}