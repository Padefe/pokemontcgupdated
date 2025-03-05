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
            <p>${pack.price}</p>
            <button onclick="Buy('${pack.booster_id}')">Buy</button>
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

        console.log('Money: from fetch', money);
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
        console.log('Money value:', moneyValue);
        moneyContainer.innerHTML = `<p>Money: $${moneyValue}</p>`;
    } else {
        console.error('Money container not found in DOM.');
    }
}
document.addEventListener('DOMContentLoaded', fetchMoney);

async function Buy(packID) {
    const userID = localStorage.getItem('userid');
    try {
        const response = await fetch('/api/buy-pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ packID, userID })
        });
        
        const data = await response.json();
        if (response.status === 200) {
            console.log('Pack purchased:', packID);
            alert
            fetchMoney();
        }
    }
}