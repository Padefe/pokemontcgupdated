let playerFirstCard;
let trainerFirstCard;

const urlParams = new URLSearchParams(window.location.search);
const storedUserId = localStorage.getItem('userid');
const selectedRegion = urlParams.get('region');
const selectedTrainer = urlParams.get('trainer');
const userId = urlParams.get('user_id');
const selectedCardIds = urlParams.get('cards') ? urlParams.get('cards').split(',') : [];


let playerDeck;
let trainerDeck;

async function startGame() {
    console.log("Selected Region:", selectedRegion);
    console.log("Selected Trainer:", selectedTrainer);
    console.log("User ID:", userId);
    console.log("Selected Card IDs:", selectedCardIds);

    let user_id;

    if (storedUserId !== userId) {
        alert("Cheater");
        window.location.href = "/";
    } else {
        user_id = userId;
    }

    console.log("test1");


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

    console.log("Player's Cards:", playerDeck);
    console.log("Trainer's Cards:", trainerDeck);

    console.log(playerFirstCard);
    console.log(trainerFirstCard);



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

    if (trainerDeck.length === 0) {
        displayWinner();
    }
    else if (playerDeck.length === 0) {
        displayWinner();
    }

    if (isPlayerTurn === true) {
        document.querySelectorAll(".statButton").forEach(button => {
            button.style.display = "flex";
        });
    }

    if (playerDeckUpdate && playerDeckUpdate.length > 0) {
        playerDeck = playerDeckUpdate;
        console.log("test");
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
    document.getElementById("playerCardDex").textContent = "";
    document.getElementById("playerCardHP").textContent = "";
    document.getElementById("playerCardWeight").textContent = "";
    document.getElementById("playerCardHeight").textContent = "";
    document.getElementById("playerCardDamage").textContent = "";
    document.getElementById("playerCardSell").textContent = "";

    document.getElementById("trainerCardName").textContent = "";
    document.getElementById("trainerCardDex").textContent = "";
    document.getElementById("trainerCardHP").textContent = "";
    document.getElementById("trainerCardWeight").textContent = "";
    document.getElementById("trainerCardHeight").textContent = "";
    document.getElementById("trainerCardDamage").textContent = "";
    document.getElementById("trainerCardSell").textContent = "";

    document.getElementById("trainerCardSell").style.color = "white";
    document.getElementById("trainerCardDex").style.color = "white";
    document.getElementById("trainerCardHP").style.color = "white";
    document.getElementById("trainerCardHeight").style.color = "white";
    document.getElementById("trainerCardDamage").style.color = "white";
    document.getElementById("trainerCardWeight").style.color = "white";

    document.getElementById("playerCardSell").style.color = "white";
    document.getElementById("playerCardDex").style.color = "white";
    document.getElementById("playerCardHP").style.color = "white";
    document.getElementById("playerCardHeight").style.color = "white";
    document.getElementById("playerCardDamage").style.color = "white";
    document.getElementById("playerCardWeight").style.color = "white";

    document.getElementById("playerCardImage").src = "https://raw.githubusercontent.com/Padefe/pokemontcgupdated/refs/heads/main/public/images/backface.webp";
    document.getElementById("trainerCardImage").src = "https://raw.githubusercontent.com/Padefe/pokemontcgupdated/refs/heads/main/public/images/backface.webp";

    return new Promise(resolve => {

        if (isPlayerTurn) {
            document.getElementById("playerTurn").textContent = "Player's turn"
            document.getElementById("trainerTurn").textContent = ""
            document.getElementById("playerCardImage").src = playerFirstCard.img_url;
            document.getElementById("playerCardName").textContent = "Name: " + playerFirstCard.card_name;
            document.getElementById("playerCardDex").textContent = "Dex number: " + playerFirstCard.dex_number;
            document.getElementById("playerCardHP").textContent = "HP: " + playerFirstCard.card_hp;
            document.getElementById("playerCardHeight").textContent = "Height: " + playerFirstCard.card_height + "cm";
            document.getElementById("playerCardWeight").textContent = "Weight: " + playerFirstCard.card_weight + "kg";
            document.getElementById("playerCardDamage").textContent = "Damage: " + playerFirstCard.card_damage;
            document.getElementById("playerCardSell").textContent = "Sell Value: $" + playerFirstCard.sell_price;
        } else {
            document.getElementById("trainerTurn").textContent = "Trainer's turn"
            document.getElementById("playerTurn").textContent = ""
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
        const kantoAverages = {
            sell_price: 29.33324503,
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
                hp: adjustedStat(pokemon.card_hp, kantoAverages.hp, trainerAverages.hp),
                height: adjustedStat(pokemon.card_height, kantoAverages.height, trainerAverages.height),
                damage: adjustedStat(pokemon.card_damage, kantoAverages.damage, trainerAverages.damage),
                weight: adjustedStat(pokemon.card_weight, kantoAverages.weight, trainerAverages.weight)
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
                    document.getElementById("trainerCardSell").style.color = "#E1CC01";
                    break;
                case 'dex_number':
                    document.getElementById("trainerCardDex").style.color = "#E1CC01";
                    break;
                case 'hp':
                    document.getElementById("trainerCardHP").style.color = "#E1CC01";
                    break;
                case 'height':
                    document.getElementById("trainerCardHeight").style.color = "#E1CC01";
                    break;
                case 'damage':
                    document.getElementById("trainerCardDamage").style.color = "#E1CC01";
                    break;
                case 'weight':
                    document.getElementById("trainerCardWeight").style.color = "#E1CC01";
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
                    document.getElementById("playerCardSell").style.color = "#E1CC01";
                    break;
                case 'dex_number':
                    document.getElementById("playerCardDex").style.color = "#E1CC01";
                    break;
                case 'hp':
                    document.getElementById("playerCardHP").style.color = "#E1CC01";
                    break;
                case 'height':
                    document.getElementById("playerCardHeight").style.color = "#E1CC01";
                    break;
                case 'damage':
                    document.getElementById("playerCardDamage").style.color = "#E1CC01";
                    break;
                case 'weight':
                    document.getElementById("playerCardWeight").style.color = "#E1CC01";
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
            console.log(`Trainer's ${bestStat}: ${value}`);
            console.log(`Player's ${bestStat}: ${playerStatValue}`);


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
            document.getElementById("playerCardHP").style.color = "#E1CC01";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("trainerCardHP").style.color = "#E1CC01";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_hp;
                playerStatValue = playerFirstCard.card_hp;

                console.log(value);
                console.log(playerStatValue);
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectHeight() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("playerCardHeight").style.color = "#E1CC01";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("trainerCardHeight").style.color = "#E1CC01";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_height;
                playerStatValue = playerFirstCard.card_height;

                console.log(value);
                console.log(playerStatValue);
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectWeight() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("playerCardWeight").style.color = "#E1CC01";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("trainerCardWeight").style.color = "#E1CC01";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_weight;
                playerStatValue = playerFirstCard.card_weight;

                console.log(value);
                console.log(playerStatValue);
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectDamage() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("playerCardDamage").style.color = "#E1CC01";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("trainerCardDamage").style.color = "#E1CC01";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.card_damage;
                playerStatValue = playerFirstCard.card_damage;

                console.log(value);
                console.log(playerStatValue);
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}
function selectSell() {
    return new Promise(resolve => {
        if (buttonFunction) {
            document.getElementById("playerCardSell").style.color = "#E1CC01";

            document.getElementById("trainerCardImage").src = trainerFirstCard.img_url;
            document.getElementById("trainerCardName").textContent = "Name: " + trainerFirstCard.card_name;
            document.getElementById("trainerCardDex").textContent = "Dex number: " + trainerFirstCard.dex_number;
            document.getElementById("trainerCardHP").textContent = "HP: " + trainerFirstCard.card_hp;
            document.getElementById("trainerCardHeight").textContent = "Height: " + trainerFirstCard.card_height + "cm";
            document.getElementById("trainerCardWeight").textContent = "Weight: " + trainerFirstCard.card_weight + "kg";
            document.getElementById("trainerCardDamage").textContent = "Damage: " + trainerFirstCard.card_damage;
            document.getElementById("trainerCardSell").textContent = "Sell Value: $" + trainerFirstCard.sell_price;
            document.getElementById("trainerCardSell").style.color = "#E1CC01";

            buttonFunction = false;
            setTimeout(() => {
                value = trainerFirstCard.sell_price;
                playerStatValue = playerFirstCard.sell_price;

                console.log(value);
                console.log(playerStatValue);
                displayWinner();
                resolve();
            }, 1000);
        }
    });
}

function displayWinner() {
    return new Promise(resolve => {
        console.log(playerDeck);
        console.log(trainerDeck);

        if (value > playerStatValue) {
            console.log(`Trainer wins with ${bestStat}!`);
            displayBattleResult("Trainer Wins!");
            moveCardsToWinner(trainerDeck);
        } else if (value < playerStatValue) {
            console.log(`Player wins with ${bestStat}!`);
            displayBattleResult("Player Wins!");
            moveCardsToWinner(playerDeck);
        } else {
            console.log(`It's a tie on ${bestStat}!`);
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

            console.log(playerDeck.length);
            console.log(trainerDeck.length);

            if (winningDeck === playerDeck) {
                isPlayerTurn = true;
                console.log("YAY");
            }
            else {
                isPlayerTurn = false;
                console.log("NAY");
            }
            if (playerDeck.length === 0) {
                loser();
            }
            else if (trainerDeck.length === 0) {
                winner();
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