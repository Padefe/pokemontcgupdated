let selectedCards = [];
let selectedRegion;
let selectedLeader;

let check;
let gymLeadersWithAsterisk;

async function singleplayer() {
    try {
        const user_id = localStorage.getItem('userid');
        if (!user_id) {
            console.error('No user ID found, redirecting to login.');
            window.location.href = '/'; // Redirect to login page
            return;
        }

        const response = await fetch(`/api/trainer-cards?user_id=${user_id}`);
        check = await response.json();
        console.log();
    }
    catch (error) {
        console.error('Failed to fetch cards', error);
    }

    const singleplayerR = document.getElementById('singleplayerR');
    singleplayerR.innerHTML = `
        <label for="region">Choose region:</label>
        <select id="region" name="region">
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">Hoenn</option>
            <option value="Sinnoh">Sinnoh</option>
            <option value="Unova">Unova</option>
            <option value="Kalos">Kalos</option>
            <option value="Alola">Alola</option>
            <option value="Galar">Galar</option>
            <option value="Paldea">Paldea</option>
        </select>
        <button id="submit-region">Choose region</button>
    `;

    // Add event listener to the button
    document.getElementById('submit-region').addEventListener('click', () => {
        selectedRegion = document.getElementById('region').value;
        console.log("Selected Region:", selectedRegion);
        const singleplayerL = document.getElementById('singleplayerL');
        if (selectedRegion === "Kanto") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
                <label for="gymLeader">Choose gym leader:</label>
                <p>* means you have beaten them before</p>
                <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Brock", "Misty", "LtSurge", "Erika", "Koga",
                "Sabrina", "Blaine", "Giovanni", "Lorelei",
                "Bruno", "Agatha", "Lance", "Gary"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
                </select>
                <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;

            // Add event listener to gym leader selection button
            document.getElementById('submit-gymLeader').addEventListener('click', () => {
                const selectedGymLeader = document.getElementById('gymLeader').value;
                console.log("Selected Gym Leader:", selectedGymLeader);
            });
        }
        else if (selectedRegion === "Johto") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Falkner", "Bugsy", "whitney", "Morty", "Chuck",
                "Jasmine", "Pryce", "Clair", "Will", "KogaE4",
                "BrunoE4", "Karen", "LanceChampion", "LtSurgeJ",
                "SabrinaJ", "ErikaJ", "Janine", "MistyJ", "BrockJ",
                "BlaineJ", "BlueJ", "Red"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        else if (selectedRegion === "Hoenn") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Roxanne", "Brawly", "Wattson", "Flannery", "Norman",
                "Winona", "TateAndLiza", "Wallace", "Sidney", "Pheobe",
                "Glacia", "Drake", "Steven"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        else if (selectedRegion === "Sinnoh") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Roark", "Gardenia", "Maylene", "CrasherWake", "Fantina",
                "Byron", "Candice", "Volkner", "Aaron", "Bertha",
                "Flint", "Lucian", "Cynthia"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        else if (selectedRegion === "Unova") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "CilanChiliCress", "Lenora", "Burgh", "Elesa", "Clay",
                "Skyla", "Brycen", "Drayden", "Shauntal", "Grimsley",
                "Caitlin", "Marshal", "Shauntal2", "Grimsley2", "Caitlin2",
                "Marshal2", "Alder"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        else if (selectedRegion === "Kalos") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Viola", "Grant", "Korrina", "Ramos", "Clemont",
                "Valerie", "Olympia", "Wulfric", "Malva", "Wikstrom",
                "Drasna", "Siebold", "Dianthe"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }       
        else if (selectedRegion === "Alola") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Hala", "Olivia", "Nanu", "Hapu", "HalaE4", "OliviaE4",
                "Acerola", "Kahili", "Kukui", "Hau", "Sophocles",
                "Ryuki", "Gladion", "Molayne", "Plumeria", "HapuChallenger",
                "Faba", "Tristan"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        else if (selectedRegion === "Galar") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Milo", "Nessa", "Kabu", "Bea", "Allister", "Opal",
                "Gordie", "Melony", "Piers", "Raihan", "Marnie", "Hop",
                "Bede", "NessaOpponent", "BeaOpponent", "AllisterOpponent",
                "AllisterOpponent", "Leon"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        else if (selectedRegion === "Paldea") {
            gymLeadersWithAsterisk = check.map(item => item.leader); // Gym leaders that should have an asterisk
            let optionsHTML = `
            <label for="gymLeader">Choose gym leader:</label>
            <p>* means you have beaten them before</p>
            <select id="gymLeader" name="gymLeader">
            `;

            const gymLeaders = [
                "Katy", "Brassius", "Iono", "Kofu", "Larry", "Ryme", "Tulip",
                "Grusha", "Rika", "Poppy", "LarryE4", "Hassel", "Geeta"
            ];

            // Loop through the gym leaders and check if they should have an asterisk

            gymLeaders.forEach(leader => {
                const asterisk = gymLeadersWithAsterisk.includes(leader) ? '*' : '';
                optionsHTML += `<option value="${leader}">${leader} ${asterisk}</option>`;
            });

            optionsHTML += `
            </select>
            <button id="submit-gymLeader">Choose gym leader</button>
            `;
            singleplayerL.innerHTML = optionsHTML;
        }
        // Add event listener to gym leader selection button
        document.getElementById('submit-gymLeader').addEventListener('click', () => {
            const selectedGymLeader = document.getElementById('gymLeader').value;
            console.log("Selected Gym Leader:", selectedGymLeader);
        });
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

function toggleCardSelection(cardId, image) {
    const cardElement = image.closest('.card');
    const isSelected = selectedCards.some(card => card.id === cardId); // Check if the card is already selected

    if (isSelected) {
        // Deselect the card
        selectedCards = selectedCards.filter(card => card.id !== cardId); // Remove card from selection
        cardElement.classList.remove('selected');
        image.style.border = '';  // Reset border style
        console.log("Card deselected:", cardId);
    } else {
        // Check if the maximum number of selected cards (6) has been reached
        if (selectedCards.length >= 6) {
            alert('You can only select up to 6 cards.');
            return;
        }
        // Select the card
        selectedCards.push({ id: cardId, src: image.src }); // Store both ID and image src
        cardElement.classList.add('selected');
        image.style.border = '2px solid green';  // Add border to indicate selection
        console.log("Card selected:", cardId);
    }

    // Update the selected cards display
    updateSelectedCardsDisplay();
}

// Function to update the display of selected cards
function updateSelectedCardsDisplay() {
    const displayContainer = document.getElementById('showSelectedCards');
    displayContainer.innerHTML = '';  // Clear the previous content
    if (selectedCards.length === 0) {
        displayContainer.innerHTML = '<p>No cards selected.</p>';
        return;
    }

    // Display selected cards
    selectedCards.forEach(card => {
        const selectedCardElement = document.createElement('div');
        selectedCardElement.classList.add('selected-card');
        selectedCardElement.innerHTML = `
            <img src="${card.src}" alt="Card ${card.id}" class="card-image" data-id="${card.id}" />
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

        console.log(selectedCards);
        const selectedCardIds = selectedCards.map(card => card.id);
        console.log(selectedCardIds);
        // Construct the URL with query parameters
        const playPageUrl = `/sPlay.html?region=${selectedRegion}&trainer=${selectedLeader}&user_id=${user_id}&cards=${selectedCardIds.join(',')}`;

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

function logoutUser() {
    localStorage.removeItem("jwt_token"); // Remove token
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to login
}


