import { supabase } from '../config/supabase.js';

export async function fetchTrainerReward(selectedT, user_id) {
    const trainerRewards = {
        // **Kanto**
        Brock: 1, Misty: 2, LtSurge: 3, Erika: 4, Koga: 5, Sabrina: 6, Blaine: 7, Giovanni: 8,
        Lorelei: 9, Bruno: 10, Agatha: 11, Lance: 12, Gary: 13,

        // **Johto**
        Falkner: 1, Bugsy: 2, Whitney: 3, Morty: 4, Chuck: 5, Jasmine: 6, Pryce: 7, Clair: 8,
        Will: 9, KogaE4: 10, BrunoE4: 11, Karen: 12, LanceChampion: 13,

        // **Hoenn**
        Roxanne: 1, Brawly: 2, Wattson: 3, Flannery: 4, Norman: 5, Winona: 6, TateLiza: 7, Wallace: 8,
        Sidney: 9, Phoebe: 10, Glacia: 11, Drake: 12, Steven: 13,

        // **Sinnoh**
        Roark: 1, Gardenia: 2, Maylene: 3, CrasherWake: 4, Fantina: 5, Byron: 6, Candice: 7, Volkner: 8,
        Aaron: 9, Bertha: 10, Flint: 11, Lucian: 12, Cynthia: 13,

        // **Unova**
        CilanChiliCress: 1, Lenora: 2, Burgh: 3, Elesa: 4, Clay: 5, Skyla: 6, Brycen: 7, DraydenIris: 8,
        Shauntal: 9, Grimsley: 10, Caitlin: 11, Marshal: 12, Alder: 13,

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