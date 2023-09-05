// search.js

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível encontrar o Pokémon.');
                }
                return response.json();
            })
            .then(data => {
                displayPokemon(data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }
});

function displayPokemon(data) {
    resultsDiv.innerHTML = '';

    const pokemonName = data.name;
    const pokemonImageURL = data.sprites.front_default;

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const nameElement = document.createElement('h2');
    nameElement.textContent = pokemonName;

    const imageElement = document.createElement('img');
    imageElement.src = pokemonImageURL;
    imageElement.alt = pokemonName;

    pokemonElement.appendChild(nameElement);
    pokemonElement.appendChild(imageElement);

    resultsDiv.appendChild(pokemonElement);
}
