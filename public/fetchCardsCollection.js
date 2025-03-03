async function fetchCards() {
    try {
        const response = await fetch('/api/pokemon-cards');
        const cards = await response.json();
        displayCards(cards);
    }
    catch (error) {
        console.error('Failed to fetch cards', error);
    }
}

function displayCards(cards) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${card.Card.img_url}" alt="${card.Card.card_name}" />
            <h3>${card.Card.card_name}</h3>
            <p>${card.Card.dex_number}</p>
        `;
        cardsContainer.appendChild(cardElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchCards);