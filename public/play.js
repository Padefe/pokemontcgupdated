async function startGame() {
    const urlParams = new URLSearchParams(window.location.search);

    const selectedRegion = urlParams.get('region');
    const selectedTrainer = urlParams.get('trainer');
    const userId = urlParams.get('user_id');
    const selectedCardIds = urlParams.get('cards') ? urlParams.get('cards').split(',') : [];

    console.log("Selected Region:", selectedRegion);
    console.log("Selected Trainer:", selectedTrainer);
    console.log("User ID:", userId);
    console.log("Selected Card IDs:", selectedCardIds);

    const storedUserId = localStorage.getItem('userid');

    let user_id;

    if (storedUserId !== userId) {
        alert("Cheater");
        window.location.href = "/";
    } else {
        user_id = userId;
    }

    console.log("test1");


    const response = await fetch(`/api/pokemon-cards?user_id=${user_id}`);
    const playerCards = await response.json();
    console.log("test2");

    const trainerResponse = await fetch(`/api/trainer-cards?selectedTrainer=${selectedTrainer}`);
    const trainerCards = await trainerResponse.json();
    console.log("test3");
    console.log("Player's Cards:", playerCards);
    console.log("Trainer's Cards:", trainerCards);

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, 1280, 720);

    // Example of a simple card back
    const cardWidth = 150;
    const cardHeight = 190;

    // Load the image for the card back
    const cardBackImage = new Image();
    cardBackImage.src = '';

    // Ensure the image is loaded first before drawing
    cardBackImage.onload = function () {
        console.log("Image loaded successfully");  // Add logging
        // Draw the card backs for player and trainer decks after the image is loaded
        drawCardBack(50, 300);  // Left pile (player's deck)
        drawCardBack(1130, 300);  // Right pile (trainer's deck)
    };

    function drawCardBack(x, y) {
        // Draw the image for the card back once it's loaded
        ctx.drawImage(cardBackImage, x, y, cardWidth, cardHeight);  // Draw the image at (x, y)
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x, y, cardWidth, cardHeight);  // Optional: add a border around the card
    }


    // Draw the left pile (Player's deck)
    drawCardBack(215, 215); // Position the left pile
    // Draw the right pile (Trainer's deck)
    drawCardBack(840, 215); // Position the right pile

    // Create the "Play" button
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.style.position = 'absolute';
    playButton.style.left = '45%';  // Position the button in the center
    playButton.style.bottom = '50%'; // Position it slightly above the bottom
    document.body.appendChild(playButton);

    // Event listener for the "Play" button
    playButton.addEventListener('click', () => {
        alert("Let's start the game!");
        // You can add the logic to start the game here
    });



    let playerDeck = playerCards.filter(card => selectedCardIds.includes(card.card_id));
    let trainerDeck = trainerCards;

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));  // Get a random index
            [deck[i], deck[j]] = [deck[j], deck[i]];        // Swap elements at indices i and j
        }
    }

    shuffleDeck(playerDeck);
    shuffleDeck(trainerDeck);

}
startGame();


const kantoAverages = {
    sell_price: 29.33324503,
    dex_number: 76,
    hp: 61.98675497,
    height: 119.1276821,
    damage: 32.45033113,
    weight: 45.94165563
};

const brockPokemon = {
    Mankey: { dex_number: 56, sell_price: 0.45, card_hp: 30, card_height: 50.8, card_damage: 10, card_weight: 28.12 },
    Diglett: { dex_number: 50, sell_price: 4.21, card_hp: 30, card_height: 20.32, card_damage: 30, card_weight: 0.91 },
    Sandshrew: { dex_number: 27, sell_price: 1.11, card_hp: 40, card_height: 60.96, card_damage: 10, card_weight: 11.79 },
    Geodude: { dex_number: 74, sell_price: 0.46, card_hp: 50, card_height: 40.64, card_damage: 10, card_weight: 19.96 },
    Cubone: { dex_number: 104, sell_price: 0.71, card_hp: 40, card_height: 40.64, card_damage: 10, card_weight: 6.35 },
    Machop: { dex_number: 66, sell_price: 0.6, card_hp: 50, card_height: 78.74, card_damage: 20, card_weight: 19.5 }
};

// Function to calculate the adjusted stat based on the formula
function adjustedStat(pokemonStat, kantoStat, brockStat) {
    const adjustment = (pokemonStat - kantoStat) + (pokemonStat - brockStat);
    return adjustment;
}

// Function to calculate the best stat for a given Pokémon
function bestStatForPokemon(pokemonName) {
    const pokemon = brockPokemon[pokemonName];

    // Calculate adjusted stats for each category
    const adjustedStats = {
        sell_price: adjustedStat(pokemon.sell_price, kantoAverages.sell_price, brockAverages.sell_price),
        dex_number: adjustedStat(pokemon.dex_number, kantoAverages.dex_number, brockAverages.dex_number),
        hp: adjustedStat(pokemon.card_hp, kantoAverages.hp, brockAverages.hp),
        height: adjustedStat(pokemon.card_height, kantoAverages.height, brockAverages.height),
        damage: adjustedStat(pokemon.card_damage, kantoAverages.damage, brockAverages.damage),
        weight: adjustedStat(pokemon.card_weight, kantoAverages.weight, brockAverages.weight)
    };


    // Find the stat with the smallest adjusted value (best stat)
    let bestStat = Object.keys(adjustedStats).reduce((a, b) => adjustedStats[a] < adjustedStats[b] ? a : b);

    return { bestStat, value: adjustedStats[bestStat] };
}

// Calculate Brock's averages for comparison
function calculateBrockAverages() {
    const totalPokemon = Object.values(brockPokemon);
    const numPokemon = totalPokemon.length;

    let total = {
        sell_price: 0,
        dex_number: 0,
        card_hp: 0,
        card_height: 0,
        card_damage: 0,
        card_weight: 0
    };

    totalPokemon.forEach(pokemon => {
        total.sell_price += pokemon.sell_price;
        total.dex_number += pokemon.dex_number;
        total.card_hp += pokemon.card_hp;
        total.card_height += pokemon.card_height;
        total.card_damage += pokemon.card_damage;
        total.card_weight += pokemon.card_weight;
    });

    const averages = {
        sell_price: total.sell_price / numPokemon,
        dex_number: total.dex_number / numPokemon,
        hp: total.card_hp / numPokemon,
        height: total.card_height / numPokemon,
        damage: total.card_damage / numPokemon,
        weight: total.card_weight / numPokemon
    };

    console.log('Brock\'s averages:', averages);
    return averages;
}

// Calculate Brock's averages for comparison
const brockAverages = calculateBrockAverages();

// Calculate best stat for each Pokémon
const bestStats = Object.keys(brockPokemon).map(pokemon => {
    const result = bestStatForPokemon(pokemon);
    return result;
});