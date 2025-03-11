const urlParams = new URLSearchParams(window.location.search);

// Extract the values from the URL
const selectedRegion = urlParams.get('region');
const selectedTrainer = urlParams.get('trainer');
const userId = urlParams.get('user_id');
const selectedCardIds = urlParams.get('cards').split(',');

// Now you can use the extracted data
console.log("Selected Region:", selectedRegion);
console.log("Selected Trainer:", selectedTrainer);
console.log("User ID:", userId);
console.log("Selected Card IDs:", selectedCardIds);