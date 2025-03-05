import { updateUserCards } from "../utils/updateUserCards.js";

export default async function handler(req, res) {
    const { boosterPackCards, userID } = req.body;
    console.log("From API: " + boosterPackCards);
    try {
        const updatecards = await updateUserCards(boosterPackCards, userID);
        res.status(200).json(updatecards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update users cards' });
    }
}