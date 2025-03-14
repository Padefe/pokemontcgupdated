import { supabase } from '../config/supabase.js';

export async function fetchTrainerReward(selectedT, user_id) {
    const trainerRewards = {
        // **KantoOK**
        Brock: 1, Misty: 2, LtSurge: 3, Erika: 4, Koga: 5, Sabrina: 6, Blaine: 7, Giovanni: 8,
        Lorelei: 15, Bruno: 15, Agatha: 15, Lance: 15, Gary: 40,

        // **JohtoOK**
        Falkner: 1, Bugsy: 1.5, Whitney: 2, Morty: 2.5, Chuck: 3, Jasmine: 3.5, Pryce: 4, Clair: 5,
        Will: 8, KogaE4: 8, BrunoE4: 8, Karen: 8, LanceChampion: 12, LtSurgeJ: 5.5, SabrinaJ: 6,
        ErikaJ: 6.5, Janine: 7, MistyJ: 7.5, BrockJ: 8, BlaineJ: 9, Blue: 10, Red: 16, 

        // **HoennOK**
        Roxanne: 1, Brawly: 1.5, Wattson: 2, Flannery: 2.5, Norman: 3, Winona: 3.5, TateAndLiza: 4, Wallace: 5,
        Sidney: 11, Phoebe: 11, Glacia: 11, Drake: 11, Steven: 25,

        // **SinnohOK**
        Roark: 1, Gardenia: 1.25, Maylene: 1.5, CrasherWake: 1.75, Fantina: 2, Byron: 2.33, Candice: 2.66, Volkner: 3,
        Aaron: 9, Bertha: 9, Flint: 9, Lucian: 9, Cynthia: 18,

        // **UnovaOK**
        CilanChiliCress: 1.12, Lenora: 1.25, Burgh: 1.37, Elesa: 1.5, Clay: 1.62, Skyla: 1.75, Brycen: 1.87, Drayden: 3,
        Shauntal: 3, Grimsley: 3, Caitlin: 3, Marshal: 3, Shauntal2: 7, Grimsley2: 7, Caitlin2: 7,
        Marshal2: 7, Alder: 16,

        // **KalosOK**
        Viola: 1, Grant: 1.12, Korrina: 1.25, Ramos: 1.37, Clemont: 1.5, Valerie: 1.62, Olympia: 1.75, Wulfric: 1.87,
        Malva: 5, Siebold: 5, Wikstrom: 5, Drasna: 5, Diantha: 18,

        // **Alola (Trial Captains & Kahunas)OK**
        Hala: 1, Olivia: 1.25, Nanu: 1.5, Hapu: 1.65, HalaE4: 4, OliviaE4: 4, Acerola: 4, Kahili: 4,
        Kukui: 10, Hau: 5, Sophocles: 5, Ryuki: 5, Gladion: 5, Gladion: 5, Molayne: 5, Plumeria: 5,
        HapuChallenger: 5, Faba: 5, Tristan: 5, 

        // **GalarOK**
        Milo: 1, Nessa: 1.12, Kabu: 1.25, Bea: 1.37, Allister: 1.5, Opal: 1.62, Gordie: 1.75, Melony: 1.87, Piers: 2.5, 
        Raihan: 2.5, Marnie: 2.5, Hop: 2, Bede: 2, NessaOpponent: 4, BeaOpponent: 4, AllisterOpponent: 4,
        RaihanOpponent: 4, Leon: 9,

        // **PaldeaOK**
        Katy: 1, Brassius: 1.12, Iono: 1.25, Kofu: 1.37, Larry: 1.5, Ryme: 1.62, Tulip: 1.75, Grusha: 1.87,
        Rika: 4, Poppy: 4, LarryE4: 4, Hassel: 4, Geeta: 8,
    };

    const { data: leaderData } = await supabase
        .from("Gymleader_Check")
        .select("leader")
        .eq("user_id", user_id)
        .eq("leader", selectedT)
        .single();

    if (!leaderData) {
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