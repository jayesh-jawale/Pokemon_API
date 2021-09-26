const poke_container = document.getElementById('poke_container');
const pokemons_number = 50;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        createPokemonCard(pokemon);
    }
    catch(err) {
        console.log(err, 'Failed to fetch data');
    }
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
    <div class='box'>
    <div class="info">
      <img src= ${pokemon.sprites.front_default}>

<h2>${pokemon.name}</h2>

    <div class="abilities">
   ${pokemon.abilities
     .map((ability) => {
       return `<p>${ability.ability.name}</p>`;
     })
     .join("")}
    <div>

    <div class="moves">
    ${pokemon.moves
      .map((move) => {
        return `${move.move.name}`;
      })
      .join(", ")}
    <div>
    
  <h4>${pokemon.weight}</h4>
</div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;
	poke_container.appendChild(pokemonEl);
}

fetchPokemons();