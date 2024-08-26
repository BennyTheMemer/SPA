import { sessionStorageCache } from "../../components/other/cache.js";
import { createDetailedPokemonCard } from "../../components/pokemon/Pokemon.js";


function getCachedPokemonData(pokemonName){

   
    let pokemonCachedData = {}
    if (pokemonName) {
        const cache = new sessionStorageCache()
        pokemonCachedData = cache.getData(pokemonName)

    

    } else {

        console.error("Could not find pokemonInfo div");

    }

    return pokemonCachedData

}


function injectDetailedPokemonCard(pokemonData){
    let pokemonDetailedInfo = document.getElementById("pokemon-detailed-info")
    pokemonDetailedInfo.innerHTML = ''; 
    const card = createDetailedPokemonCard(pokemonData);
    pokemonDetailedInfo.appendChild(card);

}

function initializePokemonPage() {

    const pathnameParts = window.location.pathname.split("/")
    const pokemonName = pathnameParts[pathnameParts.length-1]    
    const pokemonData = getCachedPokemonData(pokemonName)

    if(pokemonData){
        injectDetailedPokemonCard(pokemonData)
    }else{

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then(data => {
            injectDetailedPokemonCard(data)
            const cache = new sessionStorageCache()
            cache.insertData(pokemonName, data)

        })
        .catch(error => {
            console.error('Error:', error);
            const pokemonInfo = document.getElementById("pokemon-detailed-info");
            pokemonInfo.textContent = `Error: ${error.message}`;
        });


    }



}


initializePokemonPage()