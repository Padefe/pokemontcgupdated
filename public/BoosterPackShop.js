async function fetchBooster() {
    try {
        const response = await fetch('/api/booster-packs');
        const boosterPack = await response.json();
        displayBooster(boosterPack);
    }
    catch (error) {
        console.error('fetchBoosterPackShop.js: failed to fetch booster pack:', error);
        return [];
    }
}

function displayBooster(boosterPack) {
    const shopContainer = document.getElementById('shop-container');
    if (!shopContainer) {
        console.error('fetchBoosterPackShop.js: shop-container not found');
        return;
    }
    shopContainer.innerHTML = '';

    boosterPack.forEach(pack => {
        const packElement = document.createElement('div');
        packElement.className = 'booster-pack';
        packElement.innerHTML = `
            <img src="${pack.boosterimg_url}" alt="${pack.booster_name}" />
            <h3>${pack.booster_name}</h3>
            <p>$${pack.price}</p>
            <button onclick="Buy('${pack.booster_id}', '${pack.booster_name}')">Buy</button>
            <button onclick="Buy10('${pack.booster_id}', '${pack.booster_name}')">Buy x10</button>

        `;
        shopContainer.appendChild(packElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchBooster);

async function fetchMoney() {
    try
    {
        const user_id = localStorage.getItem('userid');
        if (!user_id) {
            console.error('No user ID found, redirecting to login.');
            window.location.href = '/'; // Redirect to login page
            return;
        }

        const response = await fetch(`/api/money?user_id=${user_id}`);
        const money = await response.json();

        displayMoney(money);
    }
    catch (error) {
        console.error('Failed to fetch money', error);
    }
}
function displayMoney(money) {
    const moneyContainer = document.getElementById('money-container');
    if (moneyContainer) {
        const moneyValue = money?.balance ?? 0;
        // Format the money value to 2 decimal places
        const formattedMoney = parseFloat(moneyValue).toFixed(2);
        moneyContainer.innerHTML = `<p>Money: $${formattedMoney}</p>`;
    } else {
        console.error('Money container not found in DOM.');
    }
}
document.addEventListener('DOMContentLoaded', fetchMoney);

let buyPackAmount;

async function Buy(packID, boosterName) {
    const userID = localStorage.getItem('userid');
    buyPackAmount = 1;
    try {
        const response = await fetch('/api/buy-pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ packID, userID, buyPackAmount })
        });
        
        const data = await response.json();
        if (response.status === 200) {
            alert(`${boosterName} bought`);
            fetchMoney();
        }
    }
    catch (error)
    {
        console.error('Failed to purchase pack:', error);
    }
}

async function Buy10(packID, boosterName) {
    const userID = localStorage.getItem('userid');
    buyPackAmount = 10;
    try {
        const response = await fetch('/api/buy-pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ packID, userID, buyPackAmount })
        });
        
        const data = await response.json();
        if (response.status === 200) {
            alert(`10x ${boosterName} bought`);
            fetchMoney();
        }
    }
    catch (error)
    {
        console.error('Failed to purchase pack:', error);
    }
}

function logoutUser() {
    localStorage.removeItem("jwt_token"); // Remove token
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to login
}