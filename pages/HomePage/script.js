import { createPokemonCard } from "../../components/pokemon/Pokemon.js";
import { sessionStorageCache } from "../../components/other/cache.js";


function initializeHomePage() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("pokemon-search");
    
    if (searchInput && searchButton) {
        searchInput.addEventListener("input", (event) => console.log(event.target.value));
        searchButton.addEventListener("click", searchPokemon);
        console.log("HomePage initialized successfully");
    } else {
        console.error("Could not find search input or button");
    }
}

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
            const cache = new sessionStorageCache()
            cache.insertData(searchInput.toLowerCase(), data)

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

initializeHomePage();