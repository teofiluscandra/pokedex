const baseURL = "https://pokeapi.co";

export const getAllPokemon = async (url) => {
  const urlFetch = url ? url : `${baseURL}/api/v2/pokemon`;
  const response = await fetch(urlFetch);
  const result = await response.json();
  const pokemon = result.results;

  const pokemonList = await Promise.all(
    pokemon.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  )

  return {
    nextUrl: result.next,
    pokemonList
  };
}

export const getPokemonByTypes = async (types) => {
  const initialPokemonList = await Promise.all(
    types.map(async (type) => {
      const response = await fetch(`${baseURL}/api/v2/type/${type}`);
      return response.json();
    })
  )

  const pokemonListName = initialPokemonList.flatMap(pokemon => pokemon.pokemon.map(pokemon => pokemon.pokemon));

  // remove duplicates from pokemonListName by name but keep other attribute
  const pokemonUnique = pokemonListName.reduce((acc, curr) => {
    const index = acc.findIndex(pokemon => pokemon.name === curr.name);
    if (index === -1) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const pokemonList = await Promise.all(
    pokemonUnique.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  )


  return pokemonList
}
