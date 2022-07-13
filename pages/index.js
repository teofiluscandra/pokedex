import Head from 'next/head';
import { useState } from 'react';
import { Filter } from 'react-feather';
import CompareCard from '../components/CompareCard';
import FilterDialog from '../components/FilterDialog';
import PokemonCard from '../components/PokemonCard';
import { useAppContext } from '../context/app-context';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function Home({pokemonCount, nextUrl, pokemonList}) {
  const [state ,dispatch] = useAppContext();
  const [nextPokemonList, setNextPokemonList] = useState(nextUrl);
  const [pokemon, setPokemon] = useState(pokemonList);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [isFilterOpen, setFilterOpen] = useState(false);

  async function fetchMoreListItems() {
    setIsFetching(true);
    const response = await fetch(nextPokemonList)
    const nextPokemon = await response.json()
    const pokemonResults = nextPokemon.results;
    const newPokemonList = await Promise.all(
      pokemonResults.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
      )
    setPokemon([...pokemon, ...newPokemonList])
    setNextPokemonList(nextPokemon.next)
    setIsFetching(false);
  }


  function compareActiveMode() {
    dispatch({ type: 'TOGGLE_COMPARE_MODE' });
  }

  return (
    <div className="w-full max-w-xl pb-20 mx-auto space-y-3 bg-white">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Here is pokedex list for public" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 left-0 right-0 z-30 flex flex-wrap justify-end px-2 py-3 space-x-5 bg-white">
        <button className={`${state.compareMode ? 'bg-green-600' : 'bg-white'} py-1 px-3 rounded-2xl`} onClick={compareActiveMode}>Compare</button>
        <button onClick={() => setFilterOpen(!isFilterOpen)}><Filter /></button>
      </header>
      <main className="px-2">
        <section>
          <h1 className="text-3xl font-semibold">
            Pokedex ({pokemonCount})
          </h1>
          <ul className="grid grid-cols-2 gap-10 mt-10">
            {pokemon.map((pokemon, index) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} index={index}/>
            ))}
          </ul>
        </section>
        {isFetching && <Loading />}

      </main>

      <footer>
        <a
          href="https://teofilus.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          teofilus.dev
        </a>
      </footer>
      { state.compareMode && state.compareList && state.compareList.length >= 1 && <CompareCard />}
      { isFilterOpen && <FilterDialog />}
    </div>
  )
}

const Loading = () => (
  <h5 className="font-semibold"><center>Loading ...</center></h5>
);

export async function getStaticProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const initialPokemon = await response.json();
  const nextUrl = initialPokemon.next;
  const pokemonCount = initialPokemon.count;
  const pokemon = initialPokemon.results;

  const pokemonList = await Promise.all(
    pokemon.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  )

  return {
      props: {
          pokemonCount,
          nextUrl,
          pokemonList
      }
  }
}
