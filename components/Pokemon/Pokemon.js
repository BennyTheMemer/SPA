export function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
  
    card.innerHTML = `
      <h2>${pokemon.name}</h2>
      <a href="/${pokemon.name}" >
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      </a>
      <p>Height: ${pokemon.height / 10} m</p>
      <p>Weight: ${pokemon.weight / 10} kg</p>
      <h3>Abilities:</h3>
      <ul>
        ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
      </ul>
      <h3>Types:</h3>
      <ul>
        ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
      </ul>
    `;
  
    return card;
  }