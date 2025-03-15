let playerFirstCard;
let trainerFirstCard;

const urlParams = new URLSearchParams(window.location.search);
const storedUserId = localStorage.getItem('userid');
const selectedRegion = urlParams.get('region');
const selectedTrainer = urlParams.get('trainer');
const userId = urlParams.get('user_id');
const selectedCardIds = urlParams.get('cards') ? urlParams.get('cards').split(',') : [];

let user_id;

let playerDeck;
let trainerDeck;

async function startGame() {
    if (storedUserId !== userId) {
        alert("Cheater");
        window.location.href = "/";
    } else {
        user_id = userId;
    }

    const response = await fetch(`/api/pokemon-cards?user_id=${user_id}`);
    const playerCards = await response.json();

    const trainerResponse = await fetch(`/api/trainer-cards?selectedTrainer=${selectedTrainer}`);
    const trainerCards = await trainerResponse.json();


    document.getElementById("playerCardImage").src = "https://raw.githubusercontent.com/Padefe/pokemontcgupdated/refs/heads/main/public/images/backface.webp";
    document.getElementById("trainerCardImage").src = "https://raw.githubusercontent.com/Padefe/pokemontcgupdated/refs/heads/main/public/images/backface.webp";

    playerDeck = playerCards.filter(card => selectedCardIds.includes(card.card_id));
    trainerDeck = trainerCards;

    playerDeck = playerDeck.map(card => ({
        card_id: card.Card.card_id,
        card_name: card.Card.card_name,
        dex_number: card.Card.dex_number,
        sell_price: card.Card.sell_price,
        card_damage: card.Card.card_damage,
        card_height: card.Card.card_height,
        card_weight: card.Card.card_weight,
        card_hp: card.Card.card_hp,
        img_url: card.Card.img_url,
        card_type: card.Card.card_type,
        card_weak: card.Card.card_weak,
        region: card.Card.region
    }));

    trainerDeck = trainerDeck.map(card => ({
        card_id: card.card_id,
        card_name: card.card_name,
        dex_number: card.dex_number,
        sell_price: card.sell_price,
        card_damage: card.card_damage,
        card_height: card.card_height,
        card_weight: card.card_weight,
        card_hp: card.card_hp,
        img_url: card.img_url,
        card_type: card.card_type,
        card_weak: card.card_weak,
        region: card.region
    }));



    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));  // Get a random index
            [deck[i], deck[j]] = [deck[j], deck[i]];        // Swap elements at indices i and j
        }
    }
    shuffleDeck(playerDeck);
    shuffleDeck(trainerDeck);

    playerFirstCard = playerDeck[0];
    trainerFirstCard = trainerDeck[0];
}
startGame();
let bestStat;
let value;
let playerStatValue;

let gameStarted = false;

let isPlayerTurn = false;

let winnerInfoDiv = document.getElementById("winnerInfo");

let buttonFunction = false;


function startRound() {
    let playerDeckUpdate;
    let trainerDeckUpdate;

    if (isPlayerTurn === true) {
        document.querySelectorAll(".statButton").forEach(button => {
            button.style.display = "flex";
        });
    }

    if (playerDeck.length === 0) {
        loser();
    }
    else if (trainerDeck.length === 0) {
        winner();
    }

    if (playerDeckUpdate && playerDeckUpdate.length > 0) {
        playerDeck = playerDeckUpdate;
        trainerDeck = trainerDeckUpdate;
    }
    if (winnerInfoDiv) {
        winnerInfoDiv.textContent = "";
    } else {
        console.error("Element with ID 'winnerInfo' not found.");
    }
    document.getElementById("RamainingCardsPlayer").textContent = "You have: " + playerDeck.length + " in your deck";
    document.getElementById("RamainingCardsTrainer").textContent = "They have: " + trainerDeck.length + " in their deck";

    document.getElementById("playerCardName").textContent = "";
    document.getElementById("playerCardHP").textContent = "";
    document.getElementById("playerCardDex").textContent = "";
    document.getElementById("playerCardWeight").textContent = "";
    document.getElementById("playerCardHeight").textContent = "";
    document.getElementById("playerCardDamage").textContent = "";
    document.getElementById("playerCardSell").textContent = "";

    document.getElementById("trainerCardName").textContent = "";
    document.getElementById("trainerCardHP").textContent = "";
    document.getElementById("trainerCardDex").textContent = "";
    document.getElementById("trainerCardWeight").textContent = "";
    document.getElementById("trainerCardHeight").textContent = "";
    document.getElementById("trainerCardDamage").textContent = "";
    document.getElementById("trainerCardSell").textContent = "";

    document.getElementById("tstats").style.backgroundColor = "#3F8854";
    document.getElementById("tstathp").style.backgroundColor = "#3F8854";
    document.getElementById("tstath").style.backgroundColor = "#3F8854";
    document.getElementById("tstatd").style.backgroundColor = "#3F8854";
    document.getElementById("tstatw").style.backgroundColor = "#3F8854";

    document.getElementById("pstats").style.backgroundColor = "#3F8854";
    document.getElementById("pstathp").style.backgroundColor = "#3F8854";
    document.getElementById("pstath").style.backgroundColor = "#3F8854";
    document.getElementById("pstatd").style.backgroundColor = "#3F8854";
    document.getElementById("pstatw").style.backgroundColor = "#3F8854";

    document.getElementById("trainerTurn").style.color = "#333";
    document.getElementById("playerTurn").style.color = "#333";
    document.getElementById("trainerTurn").textContent = "Trainer's turn"
    document.getElementById("playerTurn").textContent = "Player's turn"

    document.getElementById("playerCardImage").src = "https://raw.githubusercontent.com/Padefe/pokemontcgupdated/refs/heads/main/public/images/backface.webp";
    document.getElementById("trainerCardImage").src = "https://raw.githubusercontent.com/Padefe/pokemontcgupdated/refs/heads/main/public/images/backface.webp";

    return new Promise(resolve => {

        if (isPlayerTurn) {
            document.getElementById("playerTurn").style.color = "white";
            document.getElementById("playerCardImage").src = playerFirstCard.img_url;
            document.getElementById("playerCardName").textContent = "Name: " + playerFirstCard.card_name;
            document.getElementById("playerCardDex").textContent = "Dex number: " + playerFirstCard.dex_number;
            document.getElementById("playerCardHP").textContent = "HP: " + playerFirstCard.card_hp;
            document.getElementById("playerCardHeight").textContent = "Height: " + playerFirstCard.card_height + "cm";
            document.getElementById("playerCardWeight").textContent = "Weight: " + playerFirstCard.card_weight + "kg";
            document.getElementById("playerCardDamage").textContent = "Damage: " + playerFirstCard.card_damage;
            document.getElementById("playerCardSell").textContent = "Sell Value: $" + playerFirstCard.sell_price;
        } else {
            document.getElementById("trainerTurn").style.color = "white";
            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
        }
        setTimeout(resolve, 1000);
        setBest();
    });
}

function setBest() {
    return new Promise(resolve => {
        let regionAverages;

        if (selectedRegion == "Kanto") {
            const kantoAverages = {
                sell_price: 29.33324503,
                hp: 61.98675497,
                height: 119.1276821,
                damage: 32.45033113,
                weight: 45.94165563
            };
            regionAverages = kantoAverages;
        }
        else if (selectedRegion == "Johto") {
            const johtoAverages = {
                sell_price: 16.5426	,
                hp: 61.3,
                height: 116.4082,
                damage: 30.5,
                weight: 49.0927
            };
            regionAverages = johtoAverages;
        }
        else if (selectedRegion == "Hoenn") {
            const hoennAverages = {
                sell_price: 4.163333333,
                hp: 68.51851852,
                height: 123.0677037,
                damage: 29.62962963,
                weight: 67.07792593
            };
            regionAverages = hoennAverages;
        }
        else if (selectedRegion == "Sinnoh") {
            const sinnohAverages = {
                sell_price: 2.048598131,
                hp: 81.12149533,
                height: 113.3504673,
                damage: 39.1588785,
                weight: 74.76579439
            };
            regionAverages = sinnohAverages;
        }
        else if (selectedRegion == "Unova") {
            const unovaAverages = {
                sell_price: 0.709487179,
                hp: 86.47435897,
                height: 103.2607692,
                damage: 50.70512821,
                weight: 52.40301282
            };
            regionAverages = unovaAverages;
        }
        else if (selectedRegion == "Kalar") {
            const kalarAverages = {
                sell_price: 1.042638889,
                hp: 88.88888889,
                height: 115.1466667	,
                damage: 49.44444444,
                weight: 58.07791667
            };
            regionAverages = kalarAverages;
        }
        else if (selectedRegion == "Alola") {
            const alolaAverages = {
                sell_price: 0.596818182,
                hp: 99.31818182,
                height: 135.7168182,
                damage: 66.59090909,
                weight: 109.2077273
            };
            regionAverages = alolaAverages;
        }
        else if (selectedRegion == "Galar") {
            const galarAverages = {
                sell_price: 0.313645833,
                hp: 106.4583333,
                height: 151.1829167,
                damage: 77.8125,
                weight: 86.91072917
            };
            regionAverages = galarAverages;
        }
        else if (selectedRegion == "Paldea") {
            const paldeaAverages = {
                sell_price: 1.915916667,
                hp: 108.0833333,
                height: 144.9705,
                damage: 82.75,
                weight: 87.97491667
            };
            regionAverages = paldeaAverages;
        }
        function adjustedStat(pokemonStat, regionStat, trainerStat) {
            const adjustment = (pokemonStat - regionStat) + (pokemonStat - trainerStat);
            return adjustment;
        }

        function bestStatForPokemon(pokemon) {
            const adjustedStats = {
                sell_price: adjustedStat(pokemon.sell_price, regionAverages.sell_price, trainerAverages.sell_price),
                hp: adjustedStat(pokemon.card_hp, regionAverages.hp, trainerAverages.hp),
                height: adjustedStat(pokemon.card_height, regionAverages.height, trainerAverages.height),
                damage: adjustedStat(pokemon.card_damage, regionAverages.damage, trainerAverages.damage),
                weight: adjustedStat(pokemon.card_weight, regionAverages.weight, trainerAverages.weight)
            };

            bestStat = Object.keys(adjustedStats).reduce((a, b) => adjustedStats[a] > adjustedStats[b] ? a : b);
            if (bestStat === 'sell_price') {
                value = pokemon.sell_price;
            } else {
                value = pokemon[`card_${bestStat}`];
            }

            return { bestStat, value };
        }

        // Calculate Brock's averages for comparison
        function calculateTrainerAverages() {
            const totalPokemon = trainerDeck;  // trainerDeck is an array of Pokémon.
            const numPokemon = totalPokemon.length;

            let total = {
                sell_price: 0,
                card_hp: 0,
                card_height: 0,
                card_damage: 0,
                card_weight: 0
            };

            totalPokemon.forEach(pokemon => {
                total.sell_price += pokemon.sell_price;
                total.card_hp += pokemon.card_hp;
                total.card_height += pokemon.card_height;
                total.card_damage += pokemon.card_damage;
                total.card_weight += pokemon.card_weight;
            });

            const averages = {
                sell_price: total.sell_price / numPokemon,
                hp: total.card_hp / numPokemon,
                height: total.card_height / numPokemon,
                damage: total.card_damage / numPokemon,
                weight: total.card_weight / numPokemon
            };
            return averages;
        }
        // Calculate Brock's averages for comparison
        const trainerAverages = calculateTrainerAverages();

        // Calculate best stat for each Pokémon
        const result = bestStatForPokemon(trainerFirstCard);
        bestStat = result.bestStat;
        value = result.value;
        if (isPlayerTurn === true) {
            buttonFunction = true;
        }
        setTimeout(() => {
            if (!isPlayerTurn) {
                displayStatsTrainer();
            }
            resolve();
        }, 2000);
    });
}
function displayStatsTrainer() {
    return new Promise(resolve => {
        if (!isPlayerTurn) {

            switch (bestStat) {
                case 'sell_price':
                    document.getElementById("tstats").style.backgroundColor = "#B33636";
                    break;
                case 'hp':
                    document.getElementById("tstathp").style.backgroundColor = "#B33636";
                    break;
                case 'height':
                    document.getElementById("tstath").style.backgroundColor = "#B33636";
                    break;
                case 'damage':
                    document.getElementById("tstatd").style.backgroundColor = "#B33636";
                    break;
                case 'weight':
                    document.getElementById("tstatw").style.backgroundColor = "#B33636";
                    break;
            }

            document.getElementById("playerCardImage").src = playerFirstCard.img_url;
            document.getElementById("playerCardName").textContent = "Name: " + playerFirstCard.card_name;
            document.getElementById("playerCardDex").textContent = "Dex number: " + playerFirstCard.dex_number;
            document.getElementById("playerCardHP").textContent = "HP: " + playerFirstCard.card_hp;
            document.getElementById("playerCardHeight").textContent = "Height: " + playerFirstCard.card_height + "cm";
            document.getElementById("playerCardWeight").textContent = "Weight: " + playerFirstCard.card_weight + "kg";
            document.getElementById("playerCardDamage").textContent = "Damage: " + playerFirstCard.card_damage;
            document.getElementById("playerCardSell").textContent = "Sell Value: $" + playerFirstCard.sell_price;

            setTimeout(() => {
            }, 2000);

            switch (bestStat) {
                case 'sell_price':
                    document.getElementById("pstats").style.backgroundColor = "#B33636";
                    break;
                case 'hp':
                    document.getElementById("pstathp").style.backgroundColor = "#B33636";
                    break;
                case 'height':
                    document.getElementById("pstath").style.backgroundColor = "#B33636";
                    break;
                case 'damage':
                    document.getElementById("pstatd").style.backgroundColor = "#B33636";
                    break;
                case 'weight':
                    document.getElementById("pstatw").style.backgroundColor = "#B33636";
                    break;
            }

            playerStatValue = playerFirstCard[
                bestStat === "hp" ? "card_hp" :
                    bestStat === "height" ? "card_height" :
                        bestStat === "damage" ? "card_damage" :
                            bestStat === "weight" ? "card_weight" :
                                bestStat === "dex_number" ? "dex_number" :
                                    bestStat === "sell_value" ? "sell_value" :
                                        bestStat];
        }
        setTimeout(() => {
            displayWinner();
            resolve();
        }, 0);
    });
}
function selectHP() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("pstathp").style.backgroundColor = "#B33636";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("tstathp").style.backgroundColor = "#B33636";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_hp;
                playerStatValue = playerFirstCard.card_hp;
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectHeight() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("pstath").style.backgroundColor = "#B33636";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("tstath").style.backgroundColor = "#B33636";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_height;
                playerStatValue = playerFirstCard.card_height;

                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectWeight() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("pstatw").style.backgroundColor = "#B33636";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("tstatw").style.backgroundColor = "#B33636";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_weight;
                playerStatValue = playerFirstCard.card_weight;

                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectDamage() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("pstatd").style.backgroundColor = "#B33636";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("tstatd").style.backgroundColor = "#B33636";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_damage;
                playerStatValue = playerFirstCard.card_damage;
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectSell() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("pstats").style.backgroundColor = "#B33636";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("tstats").style.backgroundColor = "#B33636";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.sell_price;
                playerStatValue = playerFirstCard.sell_price;
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}

function displayWinner() {
    return new Promise(resolve => {
        if (value > playerStatValue) {
            displayBattleResult("Trainer Wins!");
            moveCardsToWinner(trainerDeck);
        } else if (value < playerStatValue) {
            displayBattleResult("Player Wins!");
            moveCardsToWinner(playerDeck);
        } else {
            displayBattleResult("Tie!");
            cardsTie();
        }
        function cardsTie() {
            if (trainerFirstCard.card_weak === playerFirstCard.card_type) {
                displayBattleResult("Player Wins!");
                moveCardsToWinner(playerDeck);
            }
            else if (playerFirstCard.card_weak === trainerFirstCard.card_type) {
                displayBattleResult("Trainer Wins!");
                moveCardsToWinner(trainerDeck);
            }
            else {
                if (isPlayerTurn === true) {
                    displayBattleResult("Trainer Wins!");
                    moveCardsToWinner(trainerDeck);
                }
                else {
                    displayBattleResult("Player Wins!");
                    moveCardsToWinner(playerDeck);
                }
            }
        }
        function displayBattleResult(message) {
            // Select the winnerInfo div
            winnerInfoDiv = document.getElementById("winnerInfo");

            // Set the message inside the div
            winnerInfoDiv.textContent = message;

            winnerInfoDiv.style.color = "white";

            // You can also use innerHTML if you need to add HTML content, like styling:
            // winnerInfoDiv.innerHTML = `<span style="color: #E1CC01;">${message}</span>`;
        }
        function moveCardsToWinner(winningDeck) {

            playerFirstCard = playerDeck.shift();
            trainerFirstCard = trainerDeck.shift();

            // Shuffle the two cards
            let shuffledCards = [playerFirstCard, trainerFirstCard];
            shuffledCards.sort(() => Math.random() - 0.5); // Simple shuffle

            // Place shuffled cards at the bottom of the winning deck
            winningDeck.push(...shuffledCards);

            playerFirstCard = playerDeck[0];
            trainerFirstCard = trainerDeck[0];

            document.getElementById("nextRound").textContent = "Next Round";

            if (winningDeck === playerDeck) {
                isPlayerTurn = true;
            }
            else {
                isPlayerTurn = false;
            }
        }
        setTimeout(resolve, 0);
    });
}

async function winner() {
    try {
        // Send a request to add money
        const response_user = await fetch('/api/addMoney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ storedUserId, selectedTrainer })
        });

        // Check if the response is successful
        if (!response_user.ok) {
            throw new Error('Failed to update money');
        }

        // Parse the response
        const data = await response_user.json();

        // If the response is successful, show the alert
        alert("You WON!");

        // Proceed with redirection only if everything is successful
        window.location.href = "/play-start.html";

    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error in winner function:", error);
    }
}

function loser() {
    alert("GAME OVER! No prize");
    window.location.href = "/play-start.html";
}



function toggleRules() {
    const rulesOverlay = document.getElementById("rulesOverlay");
    if (rulesOverlay.style.display === "flex") {
        rulesOverlay.style.display = "none"; // Hide if it's visible
    } else {
        rulesOverlay.style.display = "flex"; // Show if it's hidden
    }
}