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

        // **KalosOK**
        Viola: 1, Grant: 1, Korrina: 1, Ramos: 1, Clemont: 1, Valerie: 1, Olympia: 1, Wulfric: 1,
        Malva: 1, Siebold: 1, Wikstrom: 1, Drasna: 1, Diantha: 1,

        // **Alola (Trial Captains & Kahunas)OK**
        Hala: 1, Olivia: 1, Nanu: 1, Hapu: 1, HalaE4: 1, OliviaE4: 1, Acerola: 1, Kahili: 1,
        Kukui: 1, Hau: 1, Sophocles: 1, Ryuki: 1, Gladion: 1, Gladion: 1, Molayne: 1, Plumeria: 1,
        HapuChallenger: 1, Faba: 1, Tristan: 1, 

        // **Galar**
        Milo: 1, Nessa: 1, Kabu: 1, Bea: 1, Allister: 1, Opal: 1, Gordie: 1, Melony: 1,Piers: 1, 
        Raihan: 1, Marnie: 1, Hop: 1, Bede: 1, NessaOpponent: 1, BeaOpponent: 1, AllisterOpponent: 1,
        RaihanOpponent: 1, Leon: 1,

        // **Paldea**
        Katy: 1, Brassius: 1, Iono: 1, Kofu: 1, Larry: 1, Ryme: 1, Tulip: 1, Grusha: 1,
        Rika: 1, Poppy: 1, LarryE4: 1, Hassel: 1, Geeta: 1,
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