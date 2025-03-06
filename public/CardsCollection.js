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