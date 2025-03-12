
async function trainerTurn(trainerDeckCards, playerDeckCards, ctx) {
const kantoAverages = {
    sell_price: 29.33324503,
    dex_number: 76,
    hp: 61.98675497,
    height: 119.1276821,
    damage: 32.45033113,
    weight: 45.94165563
};

function adjustedStat(pokemonStat, kantoStat, trainerStat) {
    const adjustment = (pokemonStat - kantoStat) + (pokemonStat - trainerStat);
    return adjustment;
}

function bestStatForPokemon(pokemon) {
    const adjustedStats = {
        sell_price: adjustedStat(pokemon.sell_price, kantoAverages.sell_price, trainerAverages.sell_price),
        dex_number: adjustedStat(pokemon.dex_number, kantoAverages.dex_number, trainerAverages.dex_number),
        hp: adjustedStat(pokemon.card_hp, kantoAverages.hp, trainerAverages.hp),
        height: adjustedStat(pokemon.card_height, kantoAverages.height, trainerAverages.height),
        damage: adjustedStat(pokemon.card_damage, kantoAverages.damage, trainerAverages.damage),
        weight: adjustedStat(pokemon.card_weight, kantoAverages.weight, trainerAverages.weight)
    };

    bestStat = Object.keys(adjustedStats).reduce((a, b) => adjustedStats[a] > adjustedStats[b] ? a : b);
    if (bestStat === 'sell_price') {
        value = pokemon.sell_price;
    } else if (bestStat === 'dex_number') {
        value = pokemon.dex_number;
    } else {
        value = pokemon[`card_${bestStat}`];
    }

    console.log(pokemon);

    return { bestStat, value };
}

// Calculate Brock's averages for comparison
function calculateTrainerAverages() {
    const totalPokemon = trainerDeck;  // trainerDeck is an array of Pokémon.
    const numPokemon = totalPokemon.length;

    let total = {
        sell_price: 0,
        dex_number: 0,
        card_hp: 0,
        card_height: 0,
        card_damage: 0,
        card_weight: 0
    };

    totalPokemon.forEach(pokemon => {
        total.sell_price += pokemon.sell_price;
        total.dex_number += pokemon.dex_number;
        total.card_hp += pokemon.card_hp;
        total.card_height += pokemon.card_height;
        total.card_damage += pokemon.card_damage;
        total.card_weight += pokemon.card_weight;
    });

    const averages = {
        sell_price: total.sell_price / numPokemon,
        dex_number: total.dex_number / numPokemon,
        hp: total.card_hp / numPokemon,
        height: total.card_height / numPokemon,
        damage: total.card_damage / numPokemon,
        weight: total.card_weight / numPokemon
    };

    console.log('trainer averages:', averages);
    return averages;
}

// Calculate Brock's averages for comparison
const trainerAverages = calculateTrainerAverages();

// Calculate best stat for each Pokémon
trainerDeck.forEach(pokemon => {
    const result = bestStatForPokemon(pokemon);
    console.log('Best stat for', pokemon.card_name, result);
});
const result = bestStatForPokemon(trainerDeckCards);
bestStat = result.bestStat;
value = result.value;

// Now draw the stats and highlight the best stat in red
ctx.fillStyle = 'black';  // Reset fillStyle to black

// Highlight the best stat in red
ctx.fillStyle = 'red';
switch (bestStat) {
    case 'sell_price':
        ctx.fillText('Sell value: ' + trainerDeckCards.sell_price, statsX, statsY + 219.6);
        break;
    case 'dex_number':
        ctx.fillText('Dex number: ' + trainerDeckCards.dex_number, statsX, statsY + 36.5);
        break;
    case 'hp':
        ctx.fillText('HP: ' + trainerDeckCards.card_hp, statsX, statsY + 73.2);
        break;
    case 'height':
        ctx.fillText('Height: ' + trainerDeckCards.card_height, statsX, statsY + 146.4);
        break;
    case 'damage':
        ctx.fillText('Damage: ' + trainerDeckCards.card_damage, statsX, statsY + 183);
        break;
    case 'weight':
        ctx.fillText('Weight: ' + trainerDeckCards.card_weight, statsX, statsY + 109.8);
        break;
}
const cardimg2 = new Image();
cardimg2.src = playerDeckCards.img_url;

// Ensure the image is loaded first before drawing
cardimg2.onload = function () {
    ctx.drawImage(cardimg2, 215, 215, cardWidth, cardHeight);

    const statsX = 255 - cardWidth - 20; // Position for stats to the right of the card
    const statsY = 215 + 20;  // Start drawing stats a bit below the top edge of the card

    // Display the card name
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Name: ' + playerDeckCards.card_name, statsX, statsY);

    // Display other stats (attack, defense, etc.)
    ctx.fillText('Dex number: ' + playerDeckCards.dex_number, statsX, statsY + 36.5);
    ctx.fillText('HP: ' + playerDeckCards.card_hp, statsX, statsY + 73.2);
    ctx.fillText('Weight: ' + playerDeckCards.card_weight, statsX, statsY + 109.8);
    ctx.fillText('Height: ' + playerDeckCards.card_height, statsX, statsY + 146.4);
    ctx.fillText('Damage: ' + playerDeckCards.card_damage, statsX, statsY + 183);
    ctx.fillText('Sell value: ' + playerDeckCards.sell_price, statsX, statsY + 219.6);
}
playerStatValue = playerDeckCards[
    bestStat === "hp" ? "card_hp" :
        bestStat === "height" ? "card_height" :
            bestStat === "damage" ? "card_damage" :
                bestStat === "weight" ? "card_weight" :
                    bestStat === "dex_number" ? "dex_number" :
                        bestStat === "sell_value" ? "sell_value" :
                            bestStat];
console.log(`Trainer's ${bestStat}: ${value}`);
console.log(`Player's ${bestStat}: ${playerStatValue}`);
}