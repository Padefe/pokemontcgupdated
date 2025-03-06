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
    canvas.id = 'boosterCanvas';
    document.body.appendChild(canvas);

    // Set canvas to take up the entire viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'auto';

    const ctx = canvas.getContext('2d');

    // Card constants
    const cardWidth = 150;
    const cardHeight = 220;
    const cardsToOpen = boosterPackCards.length;

    let cardIndex = 0;
    const flipProgressArray = new Array(cardsToOpen).fill(0);  // Flip progress array

    // Load images for each card
    const cardImages = await Promise.all(boosterPackCards.map(card => loadImage(card.img_url)));

    // Function to load card images
    function loadImage(imageSrc) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = imageSrc;
        });
    }

    // Function to draw each card with a flip animation
    function drawCard(card, cardImg, x, y, flipProgress) {
        ctx.save();
        ctx.translate(x, y);

        // Draw card background
        ctx.fillStyle = 'white';
        ctx.fillRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);

        // Draw the card image
        const flipWidth = cardWidth * flipProgress;
        const flipHeight = cardHeight * flipProgress;

        // Ensure the image is scaled correctly to avoid clipping
        ctx.drawImage(cardImg, -cardWidth / 2, -cardHeight / 2, flipWidth, flipHeight);

        // Add card name and rarity text
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

    // Positioning logic
    const isMobile = window.innerWidth <= 600;  // Mobile check
    const initialX = (canvas.width - cardWidth) / 2;
    const initialY = canvas.height / 2 - cardHeight / 2;  // Start from the center

    // Mobile version: Stack cards on top of each other
    const mobileCardYPosition = (cardIndex) => {
        return initialY + cardIndex * 50;  // Stack cards vertically with space between them
    };

    // Desktop version: Arrange cards in a 4x2 grid
    const desktopCardPosition = (cardIndex) => {
        const row = Math.floor(cardIndex / 4);
        const col = cardIndex % 4;
        const x = initialX + col * (cardWidth + 20);  // Horizontal spacing between cards
        const y = initialY + row * (cardHeight + 20);  // Vertical spacing between rows
        return { x, y };
    };

    // Function to animate the card flips
    function animateCards() {
        const interval = setInterval(() => {
            if (cardIndex < cardsToOpen) {
                let x, y;

                if (isMobile) {
                    y = mobileCardYPosition(cardIndex);
                    x = initialX;  // Center cards horizontally
                } else {
                    const position = desktopCardPosition(cardIndex);
                    x = position.x;
                    y = position.y;
                }

                // Draw the card with current flip progress
                drawCard(boosterPackCards[cardIndex], cardImages[cardIndex], x, y, flipProgressArray[cardIndex]);

                // Update the flip progress (flip quicker, 0.3 per frame for faster flip)
                flipProgressArray[cardIndex] += 0.3;  // Flip quicker (adjust speed here)

                // Move to the next card after the current one has fully flipped
                if (flipProgressArray[cardIndex] >= 1) {
                    cardIndex++;
                    // Reset flip for the next card
                    flipProgressArray[cardIndex] = 0;
                }
            } else {
                clearInterval(interval);  // Stop the animation when all cards are revealed
            }
        }, isMobile ? 300 : 150);  // Faster flip speed (300ms delay for mobile, 150ms for desktop)
    }

    // Start the card animation
    animateCards();

    // Resize event listener to adjust canvas and card positions dynamically
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initialX = (canvas.width - cardWidth) / 2;
        initialY = canvas.height / 2 - cardHeight / 2;
    });

    // Click event to remove the canvas when clicked
    canvas.addEventListener('click', () => {
        document.body.removeChild(canvas);  // Remove the canvas from DOM
    });
}




function logoutUser() {
    localStorage.removeItem("jwt_token"); // Remove token
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to login
}
