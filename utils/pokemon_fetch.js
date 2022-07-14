const baseURL = "https://pokeapi.co";

export const getAllPokemon = async (url) => {
  const urlFetch = url ?? `${baseURL}/api/v2/pokemon`;
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
