import { supabase } from '../config/supabase.js';

export async function fetchTrainerReward(selectedT, user_id) {
    const trainerRewards = {
        // **KantoOK**
        Brock: 1, Misty: 1, LtSurge: 1, Erika: 1, Koga: 1, Sabrina: 1, Blaine: 1, Giovanni: 1,
        Lorelei: 1, Bruno: 1, Agatha: 1, Lance: 1, Gary: 1,

        // **JohtoOK**
        Falkner: 1, Bugsy: 1, Whitney: 1, Morty: 1, Chuck: 1, Jasmine: 1, Pryce: 1, Clair: 1,
        Will: 1, KogaE4: 1, BrunoE4: 1, Karen: 1, LanceChampion: 1, LtSurgeJ: 1, SabrinaJ: 1,
        ErikaJ: 1, Janine: 1, MistyJ: 1, BrockJ: 1, BlaineJ: 1, Blue: 1, Red: 1, 

        // **HoennOK**
        Roxanne: 1, Brawly: 1, Wattson: 1, Flannery: 1, Norman: 1, Winona: 1, TateAndLiza: 1, Wallace: 1,
        Sidney: 1, Phoebe: 1, Glacia: 1, Drake: 1, Steven: 1,

        // **SinnohOK**
        Roark: 1, Gardenia: 1, Maylene: 1, CrasherWake: 1, Fantina: 1, Byron: 1, Candice: 1, Volkner: 1,
        Aaron: 1, Bertha: 1, Flint: 1, Lucian: 1, Cynthia: 1,

        // **UnovaOK**
        CilanChiliCress: 1, Lenora: 1, Burgh: 1, Elesa: 1, Clay: 1, Skyla: 1, Brycen: 1, Drayden: 1,
        Shauntal: 1, Grimsley: 1, Caitlin: 1, Marshal: 1, Shauntal2: 1, Grimsley2: 1, Caitlin2: 1,
        Marshal2: 1, Alder: 1,

        // **Kalos**
        Viola: 1, Grant: 2, Korrina: 3, Ramos: 4, Clemont: 5, Valerie: 6, Olympia: 7, Wulfric: 8,
        Malva: 9, Siebold: 10, Wikstrom: 11, Drasna: 12, Diantha: 13,

        // **Alola (Trial Captains & Kahunas)**
        Ilima: 1, Lana: 2, Kiawe: 3, Mallow: 4, Sophocles: 5, Acerola: 6, Nanu: 7, Hapu: 8,
        Olivia: 9, Kahili: 10, Molayne: 11, Hala: 12, Kukui: 13,

        // **Galar**
        Milo: 1, Nessa: 2, Kabu: 3, BeaAllister: 4, Opal: 5, GordieMelony: 6, Piers: 7, Raihan: 8,
        Marnie: 9, Bede: 10, Hop: 11, Leon: 12,

        // **Paldea**
        Katy: 1, Brassius: 2, Iono: 3, Kofu: 4, Larry: 5, Ryme: 6, Tulip: 7, Grusha: 8,
        Rika: 9, Poppy: 10, LarryE4: 11, Hassel: 12, Geeta: 13,
    };

    const { data: leaderData } = await supabase
        .from("Gymleader_Check")
        .select("leader")
        .eq("user_id", user_id)
        .eq("leader", selectedT)
        .single();

    if (!leaderData) {
        console.log("Test");
        const { error: insertError } = await supabase
            .from("Gymleader_Check")
            .insert([{ user_id: user_id, leader: selectedT }]);
        if (insertError) {
            console.log("Insert Error:", insertError); // Log the error to debug
            return res.status(500).json({ success: false, message: 'Failed to insert leader' });
        }
    }
    return { reward: trainerRewards[selectedT] ?? 0 };
}