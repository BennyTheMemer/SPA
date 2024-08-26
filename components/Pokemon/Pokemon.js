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

  export function createDetailedPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    const typeColors = {
        normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030', grass: '#78C850',
        ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068', flying: '#A890F0',
        psychic: '#F85888', bug: '#A8B820', rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
        dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC'
    };

    const mainType = pokemon.types[0].type.name;
    const cardColor = typeColors[mainType] || '#A8A878';  // default to normal type color

    card.innerHTML = `
        <style>
            .pokemon-card {
                border: 2px solid ${cardColor};
                border-radius: 10px;
                padding: 15px;
                margin: 10px;
                background-color: ${cardColor}22;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                max-width: 300px;
            }
            .pokemon-card h2 {
                color: ${cardColor};
                text-transform: capitalize;
                margin-bottom: 10px;
            }
            .pokemon-card img {
                width: 120px;
                height: 120px;
                display: block;
                margin: 0 auto;
            }
            .pokemon-card p {
                margin: 5px 0;
            }
            .pokemon-card ul {
                list-style-type: none;
                padding: 0;
            }
            .pokemon-card li {
                background-color: ${cardColor}55;
                margin: 2px;
                padding: 2px 5px;
                border-radius: 3px;
                display: inline-block;
            }
            .stat-bar {
                background-color: #ddd;
                height: 10px;
                border-radius: 5px;
                margin-top: 2px;
            }
            .stat-fill {
                background-color: ${cardColor};
                height: 100%;
                border-radius: 5px;
                max-width: 100%;
            }
        </style>
        <h2>${pokemon.name} #${pokemon.id.toString().padStart(3, '0')}</h2>
        <a href="/${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </a>
        <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <h3>Types:</h3>
        <ul>
            ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
        <h3>Abilities:</h3>
        <ul>
            ${pokemon.abilities.map(ability => `
                <li>${ability.ability.name}${ability.is_hidden ? ' (Hidden)' : ''}</li>
            `).join('')}
        </ul>
        <h3>Base Stats:</h3>
        ${pokemon.stats.map(stat => `
            <p>
                <strong>${stat.stat.name}:</strong> ${stat.base_stat}
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${(stat.base_stat / 255) * 100}%"></div>
                </div>
            </p>
        `).join('')}
        <h3>Moves:</h3>
        <p>${pokemon.moves.length} total moves</p>
        <p>First move: ${pokemon.moves[0].move.name}</p>
    `;
    
    return card;
}