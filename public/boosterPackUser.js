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

    const container = document.createElement('div');
    container.id = 'canvasContainer';
    document.body.appendChild(container);
    // Create the canvas dynamically
    const canvas = document.createElement('canvas');
    canvas.id = 'boosterCanvas';
    document.body.appendChild(canvas);

    // Set canvas to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999';
    container.style.overflow = 'auto'; 
    canvas.style.pointerEvents = 'auto';

    const ctx = canvas.getContext('2d');

    // Card properties
    const cardWidth = 200;
    const cardHeight = 270;
    const spacing = 20;
    const cardImages = await Promise.all(boosterPackCards.map(card => loadImage(card.img_url)));

    let flippedCards = [];
    let currentCardIndex = 0;
    let flipProgress = 0;

    function loadImage(imageSrc) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = imageSrc;
        });
    }

    function drawCard(card, cardImg, x, y, flip) {
        ctx.save();
        ctx.translate(x + cardWidth / 2, y + cardHeight / 2); // Move to center
        ctx.scale(flip < 0.5 ? 1 - flip * 2 : flip * 2 - 1, 1); // Flip effect

        if (flip < 0.5) {
            // Front side (pack design or placeholder)
            ctx.fillStyle = '#333';
            ctx.fillRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('???', -15, 10);
        } else {
            // Back side (actual card)
            ctx.drawImage(cardImg, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText(card.card_name, -cardWidth / 2 + 10, cardHeight / 2 + 15);
            ctx.fillText(`Rarity: ${card.rarity}`, -cardWidth / 2 + 10, cardHeight / 2 + 35);
        }

        ctx.restore();
    }

    function getCardPosition(index) {
        const isMobile = window.innerWidth <= 600;
        if (isMobile) {
            return { x: canvas.width / 2 - cardWidth / 2, y: 100 + index * (cardHeight + spacing) };
        }
        return { 
            x: (canvas.width - (Math.min(5, boosterPackCards.length) * (cardWidth + spacing))) / 2 + (index % 5) * (cardWidth + spacing), 
            y: 150 + Math.floor(index / 5) * (cardHeight + spacing) 
        };
    }

    function animateCards() {
        const interval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw all already flipped cards
            flippedCards.forEach(({ card, img, x, y }) => drawCard(card, img, x, y, 1));

            if (currentCardIndex < boosterPackCards.length) {
                let { x, y } = getCardPosition(currentCardIndex);
                drawCard(boosterPackCards[currentCardIndex], cardImages[currentCardIndex], x, y, flipProgress);

                flipProgress += 0.05; // Smooth flip speed
                if (flipProgress >= 1) {
                    flippedCards.push({
                        card: boosterPackCards[currentCardIndex],
                        img: cardImages[currentCardIndex],
                        x,
                        y
                    });

                    flipProgress = 0;
                    currentCardIndex++;
                }
            } else {
                clearInterval(interval);
            }
        }, 50);
    }

    animateCards();

    canvas.addEventListener('click', () => document.body.removeChild(canvas)); // Close on click
}






function logoutUser() {
    localStorage.removeItem("jwt_token"); // Remove token
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to login
}
