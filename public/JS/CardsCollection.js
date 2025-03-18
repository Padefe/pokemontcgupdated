let cards = []; // To hold all fetched cards
let ownedCardIds = new Set(); // Track owned cards
let ownedCards = []; // Store owned cards globally
let selectedRegion = 'All'; // Default region filter

async function fetchCards() {
    try {
        const user_id = localStorage.getItem('userid');
        if (!user_id) {
            console.error('No user ID found, redirecting to login.');
            window.location.href = '/'; 
            return;
        }

        const allCardsResponse = await fetch('/api/all-cards');
        cards = await allCardsResponse.json(); 

        console.log(cards);
        const response = await fetch(`/api/pokemon-cards?user_id=${user_id}`);
        ownedCards = await response.json();

        console.log(ownedCards);

        ownedCardIds = new Set(ownedCards.map(card => card.card_id));

        const totalCardsByRegion = {
            Kanto: 151,
            Johto: 100,
            Hoenn: 135,
            Sinnoh: 107,
            Unova: 156,
            Kalos: 72,
            Alola: 88,
            Galar: 96,
            Paldea: 95
        };

        const regionCounts = Object.fromEntries(Object.keys(totalCardsByRegion).map(region => [region, 0]));

        ownedCards.forEach(({ Card }) => {
            if (Card?.region && regionCounts.hasOwnProperty(Card.region)) {
                regionCounts[Card.region]++;
            }
        });

        // Display stats
        const statContainer = document.querySelector('.cardStatContainer');
        statContainer.innerHTML = '';

        Object.keys(totalCardsByRegion).forEach(region => {
            const count = regionCounts[region] || 0;
            const total = totalCardsByRegion[region];

            const statElement = document.createElement('h4');
            statElement.textContent = `${region}: ${count}/${total} cards`;
            statContainer.appendChild(statElement);
        });

        populateRegionFilter();
        displayCards();

    } 
    catch (error) {
        console.error('Failed to fetch cards', error);
    }
}

function populateRegionFilter() {
    const regionOrder = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
    const regions = [...new Set(cards.map(card => card.region))];

    // Sort the regions according to the custom order
    const sortedRegions = regions.sort((a, b) => {
        return regionOrder.indexOf(a) - regionOrder.indexOf(b);
    });

    const filterContainer = document.getElementById('region-filter-container');

    // Clear existing filter if any
    filterContainer.innerHTML = `
        <label for="region-filter">Filter by Region:</label>
        <select id="region-filter">
            <option value="All">All</option>
        </select>
    `;

    const filterSelect = document.getElementById('region-filter');

    sortedRegions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        filterSelect.appendChild(option);
    });

    filterSelect.addEventListener('change', (e) => {
        selectedRegion = e.target.value;
        displayCards();
    });
}


function displayCards() {
    cards.sort((a, b) => a.dex_number - b.dex_number);

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    const filteredCards = selectedRegion === 'All'
        ? cards
        : cards.filter(card => card.region === selectedRegion);

    filteredCards.forEach(card => {
        const isOwned = ownedCardIds.has(card.card_id);

        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        if (!isOwned) {
            cardElement.classList.add('grayed-out');
        }

        const ownedCard = ownedCards.find(c => c.card_id === card.card_id);

        cardElement.innerHTML = `
                    <img src="${card.img_url}" alt="${card.card_name}" />
                    <h3>${card.card_name}</h3>
                    ${isOwned ? `
                    <p>#${ownedCard.quantity}</p>
                    <p>Sell card for: $${card.sell_price}</p>
                    <button onclick="sellCard('${card.card_id}', '${card.sell_price}')">Sell Card</button>
                    ` : `<p style="opacity: 0.5;">Not owned</p>`}
                `;
        cardsContainer.appendChild(cardElement);
    });
}

async function sellCard(card_id, sell_price) {
    const sellprice = sell_price;
    const cardid = card_id;

    const storedUserId = localStorage.getItem('userid');
    const response = await fetch('/api/addMoney', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sellprice, cardid, storedUserId })
    });

    if (!response.ok) {
        console.error("Failed to sell card:", await response.text());
        return;
    }
    fetchCards();
}

async function sellExcess(cards) {
    const sellExcess = true;

    const storedUserId = localStorage.getItem('userid');
    const response = await fetch('/api/addMoney', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cards, sellExcess, storedUserId })
    });

    if (!response.ok) {
        console.error("Failed to sell card:", await response.text());
        return;
    }
    fetchCards();
}

document.addEventListener('DOMContentLoaded', fetchCards);

function logoutUser() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/";
}
