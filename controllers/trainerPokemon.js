export async function trainerPokemon(selectedT) {
    if (selectedT === "Brock") {
        return [
            "35aaa84e-e5b7-4b21-9f0d-81c55bc42a3c",
            "ffb94252-619d-4d18-b1f4-7ed00d776cdd",
            "d7058353-9803-4939-be15-dd2f36b0f8a3",
            "209bf901-a7ef-4977-8df3-63ce5d9bfd00",
            "a8cf200c-a51f-4fcc-9472-df056ad4a75a",
            "f16159cb-823d-4abc-bae2-dab18b475428"
        ];
    }
    else if (selectedT === "Misty") {
        console.log("test");
        return[];
    }
    else {
        console.log("Error, no trainer found");
        return[];
    }

}