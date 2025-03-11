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
        if (selectedCards.length >= 6) {
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
    if (!selectedRegion || !selectedLeader) {
        alert("RELOAD SIDEN");
    }
    else {
        const user_id = localStorage.getItem('userid');

        if (selectedCards.length !== 6) {
            alert('You need to select exactly 6 cards.');
            return;
        }

        // Construct the URL with query parameters
        const playPageUrl = `/play.html?region=${selectedRegion}&trainer=${selectedLeader}&user_id=${user_id}&cards=${selectedCards.join(',')}`;

        // Redirect to the play page with the URL parameters
        window.location.href = playPageUrl;
    }
};


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


