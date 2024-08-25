import { createPokemonCard } from "./components/pokemon/Pokemon.js";

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("pokemon-search");
    searchInput.addEventListener("input", (event) => console.log(event.target.value));
    searchButton.addEventListener("click", searchPokemon);
});

function searchPokemon() {
    const searchInput = document.getElementById("pokemon-search").value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
            const pokemonInfo = document.getElementById("pokemon-info");
            pokemonInfo.textContent = `Error: ${error.message}`;
        });
}

function displayPokemonInfo(pokemon) {
    const pokemonInfo = document.getElementById("pokemon-info");
    pokemonInfo.innerHTML = ''; 
    const card = createPokemonCard(pokemon);
    pokemonInfo.appendChild(card);
}


