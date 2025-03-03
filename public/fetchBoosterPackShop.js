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
            <button>Buy</button>
        `;
        shopContainer.appendChild(packElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchBooster);