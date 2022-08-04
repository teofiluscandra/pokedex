const baseURL = "https://pokeapi.co";
import useSWRInfinite from "swr/infinite";

const fetcher = (url) => fetch(url).then(async (res) => {
  const result = await res.json();
  const pokemon = result.results;
  const pokemonList = await Promise.all(
    pokemon.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  )
  return pokemonList;
});

export const usePokemonList = () => {
  const { data, error, setSize } = useSWRInfinite(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return `${baseURL}/api/v2/pokemon?offset=${index * 20}&limit=20`;
    },
    fetcher,
    {
      revalidateFirstPage: false
    }
  );

  return { data, error, setSize };
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
