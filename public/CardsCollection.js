async function fetchCards() {
    try
    {
        const user_id = localStorage.getItem('userid');
        if (!user_id) {
            console.error('No user ID found, redirecting to login.');
            window.location.href = '/'; // Redirect to login page
            return;
        }

        const response = await fetch(`/api/pokemon-cards?user_id=${user_id}`);
        const cards = await response.json();

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
        
        // Initialize counts for each region (default to 0)
        const regionCounts = Object.fromEntries(Object.keys(totalCardsByRegion).map(region => [region, 0]));
        
        // Count owned cards per region
        cards.forEach(({ Card }) => {
            if (Card?.region && regionCounts.hasOwnProperty(Card.region)) {
                regionCounts[Card.region]++;
            }
        });
        
        // Display results
        const statContainer = document.querySelector('.cardStatContainer');
        statContainer.innerHTML = ''; // Clear previous entries
        
        Object.keys(totalCardsByRegion).forEach(region => {
            const count = regionCounts[region] || 0;
            const total = totalCardsByRegion[region];
        
            const statElement = document.createElement('h4');
            statElement.textContent = `${region}: ${count}/${total} cards`;
            statContainer.appendChild(statElement);
        });
        
        displayCards(cards);
    }
    catch (error) {
        console.error('Failed to fetch cards', error);
    }
}

function displayCards(cards) {

    cards.sort((a, b) => a.Card.dex_number - b.Card.dex_number);

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${card.Card.img_url}" alt="${card.Card.card_name}" />
            <h3>${card.Card.card_name}</h3>
            <p>#${card.quantity}</p>
            <p>Sell Price: $${card.Card.sell_price}</p>
        `;
        cardsContainer.appendChild(cardElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchCards);
function logoutUser() {
    localStorage.removeItem("jwt_token"); // Remove token
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to login
}