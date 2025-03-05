async function fetchBooster() {
    try
    {
        const user_id = localStorage.getItem('userid');
        if (!user_id) {
            console.error('No user ID found, redirecting to login.');
            window.location.href = '/'; // Redirect to login page
            return;
        }

        const response = await fetch(`/api/user-booster-pack?user_id=${user_id}`);
        const packs = await response.json();

        function extractRegion(boosterName) {
            const words = boosterName.split(' '); // Split by spaces
            const lastWord = words[words.length - 1]; // Get the last word
            return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase(); // Capitalize first letter
        }
        
        // Example usage
        const booster_name = "Booster pack kanto";
        const region = extractRegion(booster_name);
        console.log(region); // Output: "Kanto"

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
            <button onclick="open('${pack.booster_id}, ${pack.Booster_Pack.booster_name})">Open</button>
        `;
        packsContainer.appendChild(packElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchBooster);

async function open(boosterID)
{
    const userID = localStorage.getItem('userid');
    try {
        const response = await fetch('/api/open-pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ packID, userID })
        });
    }
        catch{}
    
}