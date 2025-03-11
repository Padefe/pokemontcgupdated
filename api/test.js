import { supabase } from '../config/supabase.js';

export default async function handler(req, res) {

    if (req.method === "GET") {
        try {
            console.log("Incoming request:", req.query);
            const { dex } = req.query;
            const currentDexNumber = parseInt(dex) || 1;
        
            console.log("Parsed currentDexNumber:", currentDexNumber);
            // Fetch first card
            const { data: card, error } = await supabase
                .from("Card")
                .select("*")
                .eq("dex_number", currentDexNumber)
                .single(); // Fetch a single card

            if (error) {
                console.error("Error fetching card:", error);
                return res.status(500).json({ success: false, message: "Failed to fetch card" });
            } else {
                console.log("Fetched card:", card);
                // Proceed with your logic
            }

            let cardId;

            if (card.cardIdentification === null) {
                const imgUrl = card.img_url; // Original img_url from the database
            
                // Generate cardId from imgUrl
                cardId = imgUrl.split('/').slice(-2).join('-').replace('.png', '');
                console.log("In if: " + cardId);
            } else {
                cardId = card.cardIdentification;
                console.log("In else: " + cardId);
            }
            
            console.log("Final cardId:", cardId);

            const apiKey = "94adb329-5d7d-4a2a-954a-5700b40c37ef"; // Replace with your actual API key
            const url = `https://api.pokemontcg.io/v2/cards/${cardId}`;

            console.log("test3");

            const response = await fetch(url, {
                headers: { "X-Api-Key": apiKey }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const apiData = await response.json();
            const apiCard = apiData.data;

            console.log(apiCard);

            if (!apiCard) return res.status(404).json({ success: false, message: "Card not found in API" });

            // Update missing values in Supabase
            const { data, error: updateError } = await supabase
                .from("Card")
                .update({
                    card_hp: apiCard.hp ?? card.card_hp,
                    card_type: apiCard.types?.[0] ?? card.card_type,
                    card_weak: apiCard.weaknesses?.[0]?.type ?? card.card_weak,
                    img_url: apiCard.images.large,
                    sell_price: apiCard.cardmarket.prices.avg30,
                    cardIdentification: apiCard.id,
                    card_level: apiCard.level
                })
                .eq("card_id", card.card_id);

            if (updateError) {
                console.error("Error updating card:", updateError);
                return res.status(500).json({ success: false, message: "Failed to update card" });
            }
            console.log("test1")
            const { data: updatedCard } = await supabase
                .from("Card")
                .select("*")
                .eq("card_id", card.card_id)
                .single(); // Assuming 'card_id' is unique



            return res.status(200).json({
                success: true,
                card: updatedCard // Return the updated card data
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error from API" });
        }
    }

    if (req.method === "POST") {
        try {
            const { card_id, height, weight, damage } = req.body;

            if (!card_id || !height || !weight) {
                return res.status(200).json({ success: true, message: "Card height/weight no updated needed" });
            }
            else{
                console.log(weight);
            console.log(height);

            const [feet, inches] = height.split(",").map(Number);
            const [lbs, decimal] = weight.split(",").map(Number);
            const weight2 = lbs + (decimal / 10);
            const height_cm = ((feet * 12) + inches) * 2.54; // Convert inches to cm
            const weight_kg = weight2 * 0.453592; // Convert lbs to kg

            console.log(height_cm);
            console.log(weight_kg);

            // Update card in Supabase
            const { error: updateError } = await supabase
                .from("Card")
                .update({
                    card_height: height_cm.toFixed(2),
                    card_weight: weight_kg.toFixed(2),
                    card_damage: damage
                })
                .eq("card_id", card_id);

            if (updateError) {

                return res.status(500).json({ success: false, message: "Failed to update card height/weight" });
            }
            return res.status(200).json({ success: true, message: "Card height/weight updated successfully" });

            }

            
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error from API" });
        }

    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });

}

