let selectedCards = [];
let selectedRegion;
let selectedLeader;

async function singleplayer() {
    const singleplayer = document.getElementById('singleplayer');
    singleplayer.innerHTML = `
        <label for="region">Choose region:</label>
        <select id="region" name="region">
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">hoenn</option>
        </select>
        <button id="submit-region">Choose region</button>
    `;

    // Add event listener to the button
    document.getElementById('submit-region').addEventListener('click', () => {
        selectedRegion = document.getElementById('region').value;
        console.log("Selected Region:", selectedRegion);
        if (selectedRegion === "Kanto")
            singleplayer.innerHTML = `
                <label for="gymLeader">Choose gym leader:</label>
                <select id="gymLeader" name="gymLeader">
                    <option value="Brock">Brock</option>
                    <option value="Misty">Misty</option>
                    <option value="LtSurge">Lt. Surge</option>
                </select>
                <button id="submit-gymLeader">Choose gym leader</button>
            `;
        document.getElementById('submit-gymLeader').addEventListener('click', () => {
            selectedLeader = document.getElementById('gymLeader').value;
            console.log("Selected gym leader:", selectedLeader);

            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                console.error('No user ID found, redirecting to login.');
                window.location.href = '/'; // Redirect to login page
                return;
            }

            // Fetch cards from the backend API
            fetch(`/api/pokemon-cards?user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched Cards:", data);
                    displayCards(data);
                })
                .catch(error => {
                    console.error("Error fetching cards:", error);
                });
        });
    });
}

// Function to display cards
function displayCards(cards) {
    cards.sort((a, b) => a.Card.dex_number - b.Card.dex_number);
    const cardDisplay = document.getElementById('cardDisplay');
    cardDisplay.innerHTML = '';  // Clear any previous content

    const filteredCards = cards.filter(card => card.Card.region === selectedRegion);

    filteredCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <p>Name: You have ${card.quantity} ${card.Card.card_name} cards</p>
            <img src="${card.Card.img_url}" alt="${card.Card.card_name}" class="card-image" data-id="${card.Card.card_id}" />
            <p>Dex Number: ${card.Card.dex_number}</p>
            <p>Price: $${card.Card.sell_price}</p>
            <p>HP: ${card.Card.card_hp}</p>
            <p>Height: ${card.Card.card_height} cm</p>
            <p>Damage: ${card.Card.card_damage}</p>
            <p>Weight: ${card.Card.card_weight} kg</p>
        `;
        cardDisplay.appendChild(cardElement);
    });

    // Add event listeners to image for selection
    const images = document.querySelectorAll('.card-image');
    images.forEach(image => {
        image.addEventListener('click', (event) => {
            const cardId = event.target.dataset.id;
            toggleCardSelection(cardId, event.target);
        });
    });
}

// Function to toggle card selection
function toggleCardSelection(cardId, image) {
    const cardElement = image.closest('.card');
    const isSelected = cardElement.classList.contains('selected');

    if (isSelected) {
        // Deselect the card
        cardElement.classList.remove('selected');
        image.style.border = '';  // Reset border style
        console.log("Card deselected:", cardId);
        selectedCards = selectedCards.filter(id => id !== cardId);  // Remove card from selection
    } else {
        // Check if the maximum number of selected cards (5) has been reached
        if (selectedCards.length >= 5) {
            alert('You can only select up to 5 cards.');
            return;
        }
        // Select the card
        cardElement.classList.add('selected');
        image.style.border = '2px solid green';  // Add border to indicate selection
        console.log("Card selected:", cardId);
        selectedCards.push(cardId);  // Add card to selection
    }

    // Update the selected cards display
    updateSelectedCardsDisplay();
}

// Function to update the display of selected cards
function updateSelectedCardsDisplay() {
    const displayContainer = document.getElementById('displaySelectedCards');
    displayContainer.innerHTML = '';  // Clear the previous content

    if (selectedCards.length === 0) {
        displayContainer.innerHTML = '<p>No cards selected.</p>';
        return;
    }

    // Display selected cards
    selectedCards.forEach(cardId => {
        const selectedCardElement = document.createElement('div');
        selectedCardElement.classList.add('selected-card');
        selectedCardElement.innerHTML = `
            <p>Card ID: ${cardId}</p>
        `;
        displayContainer.appendChild(selectedCardElement);
    });
}

function startPlay() {
    document.getElementById('submit-gymLeader').addEventListener('click', () => {
        const selectedRegion = document.getElementById('region').value;
        const selectedLeader = document.getElementById('gymLeader').value;
        const user_id = localStorage.getItem('userid');

        // Get the 6 selected card IDs (you can get these IDs from your card selection logic)
        const selectedCardIds = ["card1", "card2", "card3", "card4", "card5", "card6"];  // Replace with actual IDs

        // Construct the URL with query parameters
        const playPageUrl = `/play.html?region=${selectedRegion}&trainer=${selectedLeader}&user_id=${user_id}&cards=${selectedCardIds.join(',')}`;

        // Redirect to the play page with the URL parameters
        window.location.href = playPageUrl;
    });
}

async function multiplayer() {
    const multiplayer = document.getElementById('multiplayer');
    multiplayer.innerHTML = `
        <label for="region">Choose region:</label>
        <select id="region" name="region">
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">hoenn</option>
        </select>
        <button id="submit-region">Choose region</button>
    `;

}


/*const brockPokemon = {
    Diglett: { sell_price: 4.21, card_hp: 30, card_height: 20.32, card_damage: 30, card_weight: 0.91 },
    Mankey: { sell_price: 0.45, card_hp: 30, card_height: 50.8, card_damage: 10, card_weight: 28.12 },
    Sandshrew: { sell_price: 1.11, card_hp: 40, card_height: 60.96, card_damage: 10, card_weight: 11.79 },
    Geodude: { sell_price: 0.46, card_hp: 50, card_height: 40.64, card_damage: 10, card_weight: 19.96 },
    Cubone: { sell_price: 0.71, card_hp: 40, card_height: 40.64, card_damage: 10, card_weight: 6.35 },
    Machop: { sell_price: 0.6, card_hp: 50, card_height: 78.74, card_damage: 20, card_weight: 19.5 }
};

function brockEasyAI(pokemonName) {
    const pokemon = brockPokemon[pokemonName];

    // Find the best stat
    let bestStat = Object.keys(pokemon).reduce((a, b) => pokemon[a] > pokemon[b] ? a : b);

    console.log(`Brock chooses ${bestStat} with a value of ${pokemon[bestStat]}`);
    return bestStat;
}

// Example: Brock plays Diglett
brockEasyAI("Cubone");
*/
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

