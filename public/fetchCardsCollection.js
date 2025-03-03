async function fetchCards() {
    try
    {
    const response = await fetch('/api/cards');
    const cards = await response.json();
    displayCards(cards);
    }
    catch (error)
    {
        console.error('Failed to fetch cards', error);
    }
}

function displayCards(cards)
{
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}" />
            <h3>${card.name}</h3>
            <p>${card.description}</p>
        `;
        cardsContainer.appendChild(cardElement);
    });
}
