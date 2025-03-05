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
        `;
        packsContainer.appendChild(packElement);
    });
}
document.addEventListener('DOMContentLoaded', fetchBooster);