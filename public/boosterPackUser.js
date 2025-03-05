async function fetchBooster() {
    try {
        const user_id = localStorage.getItem('userid');
        if (!user_id) {
            console.error('No user ID found, redirecting to login.');
            window.location.href = '/'; // Redirect to login page
            return;
        }

        const response = await fetch(`/api/user-booster-pack?user_id=${user_id}`);
        const packs = await response.json();

        displayCards(packs);
    }
    catch (error) {
        console.error('Failed to fetch packs', error);
    }
}
function displayCards(packs) {
    const packsContainer = document.getElementById('pack-container');
    packsContainer.innerHTML = '';
    packs.forEach(pack => {
        const packElement = document.createElement('div');
        packElement.className = 'pack';
        packElement.innerHTML = `
            <img src="${pack.Booster_Pack.boosterimg_url}" alt="${pack.Booster_Pack.booster_name}" />
            <h3>${pack.Booster_Pack.booster_name}</h3>
            <p>Owned: ${pack.booster_quantity}</p>
            <button onclick="openBooster('${pack.booster_id}', '${pack.Booster_Pack.booster_name}')">Open</button>
        `;
        packsContainer.appendChild(packElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchBooster);

async function openBooster(boosterID, boosterName) {

    function extractRegion(booster_Name) {
        const words = booster_Name.split(' ');
        const firstWord = words[0];
        return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
    }

    // Example usage
    const booster_name = boosterName;
    const boosterregion = extractRegion(booster_name);

    const userID = localStorage.getItem('userid');

    try {
        const response = await fetch('/api/open-booster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ boosterID, userID, boosterregion })
        });

        const boosterPackCards = await response.json();
        if (response.status === 200 && Array.isArray(boosterPackCards.cards)) {
            displayBoosterCards(boosterPackCards.cards);  // Pass the cards array to the function
            updateUserCards(boosterPackCards);
        } else {
            console.error('Expected an array of cards, but got:', boosterPackCards);
        }
    }
    catch (error) {
        console.error('Failed to open pack:', error);
    }
}

async function updateUserCards(boosterPackCards, userID) {
    try {
        const response = await fetch('/api/update-usercards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ boosterPackCards, userID })
        });
        const cardsUpdated = await response.json();
        if (response.status === 200) {
            fetchBooster()
        }
    }

    catch (error) {
        console.error('Failed to update user cards:', error);
    }
}

async function displayBoosterCards(boosterPackCards) {
    // Create the canvas element dynamically
    const canvas = document.createElement('canvas');
    canvas.id = 'boosterCanvas';  // Set an ID for future reference
    canvas.width = window.innerWidth;  // Set canvas width to match the viewport
    canvas.height = window.innerHeight;  // Set canvas height to match the viewport

    // Style the canvas to position it as an overlay
    canvas.style.position = 'fixed';  // Fixed position so it stays in place
    canvas.style.top = '0';  // Align to the top of the screen
    canvas.style.left = '0';  // Align to the left of the screen
    canvas.style.zIndex = '9999';  // Ensure the canvas appears on top of other elements
    canvas.style.pointerEvents = 'auto';  // Allow interaction with the canvas

    // Append the canvas to the body (or another element)
    document.body.appendChild(canvas);

    // Get the canvas context
    const ctx = canvas.getContext('2d');

    // Solid gray background
    ctx.fillStyle = '#333333';  // Dark solid gray
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set up some initial variables
    const cardWidth = 150;
    const cardHeight = 220;
    const spacing = 20;  // Space between cards
    const cardsToOpen = boosterPackCards.length;

    let cardIndex = 0;
    const flipProgressArray = new Array(cardsToOpen).fill(0);  // Initialize flip progress for each card

    // Load the images for the cards
    const cardImages = await Promise.all(boosterPackCards.map(card => loadImage(card.img_url)));

    // Function to load card images
    function loadImage(imageSrc) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = imageSrc;
        });
    }

    // Function to draw a card on the canvas with flip animation
    function drawCard(card, cardImg, x, y, flipProgress) {
        ctx.save();
        ctx.translate(x, y);

        // Draw the card background (white or colored)
        ctx.fillStyle = 'white';
        ctx.fillRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);

        // Apply flip animation (draw only part of the card)
        const flipWidth = cardWidth * flipProgress;
        ctx.drawImage(cardImg, -cardWidth / 2, -cardHeight / 2, flipWidth, cardHeight);

        // Add card name and rarity
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(card.card_name, 0, cardHeight / 2 + 20);

        ctx.font = '14px Arial';
        ctx.fillText(`Rarity: ${card.rarity}`, 0, cardHeight / 2 + 40);

        ctx.restore();
    }

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animate the opening of the cards (one at a time)
    const interval = setInterval(() => {
        if (cardIndex < cardsToOpen) {
            // Draw the current card
            const x = (cardIndex * (cardWidth + spacing)) + (canvas.width - (cardsToOpen * (cardWidth + spacing))) / 2;
            const y = canvas.height / 2;

            // Draw the card with flip progress
            drawCard(boosterPackCards[cardIndex], cardImages[cardIndex], x, y, flipProgressArray[cardIndex]);

            // Update flip progress for this card
            flipProgressArray[cardIndex] += 0.1;  // Faster flip progress (can tweak this value for speed)

            // Move to the next card when this card has finished flipping
            if (flipProgressArray[cardIndex] >= 1) {
                cardIndex++;
            }
        } else {
            clearInterval(interval);  // Stop the animation when all cards are displayed
        }
    }, 50);  // Faster animation by reducing interval to 50ms

    // Add a click event to close the canvas when clicked anywhere
    canvas.addEventListener('click', () => {
        document.body.removeChild(canvas);  // Remove the canvas from the DOM
    });
}
