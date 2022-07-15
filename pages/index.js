import Head from 'next/head';
import { BarChart, Filter } from 'react-feather';
import CompareCard from '../components/CompareCard';
import FilterDialog from '../components/FilterDialog';
import PokemonCard from '../components/PokemonCard';
import { useAppContext } from '../context/app-context';
import { useNetworkContext } from '../context/network-context';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getAllPokemon } from '../utils/pokemon_fetch';

export default function Home() {
  const [state ,dispatch] = useAppContext();
  const isOnline = useNetworkContext();
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  async function fetchMoreListItems() {
    setIsFetching(true);
    const { nextUrl, pokemonList } = await getAllPokemon(state.nextUrl);
    dispatch({type: 'SET_POKEMON_LIST', payload: { nextUrl, pokemonList}});
    setIsFetching(false);
  }

  return (
    <div className="w-full max-w-xl pb-20 mx-auto space-y-3 bg-white">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Here is pokedex list for public" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 left-0 right-0 z-30 flex flex-wrap items-center justify-end px-2 py-3 space-x-5 bg-white">
        <button className={`${state.compareMode ? 'text-white bg-green-600' : 'bg-white'} py-2 px-3 rounded-2xl leading-none`} onClick={() => dispatch({ type: 'TOGGLE_COMPARE_MODE' })}>Compare</button>
        <button onClick={() => dispatch({type: 'TOGGLE_FILTER_MODE'})}><Filter /></button>
        <span className="text-xs font-extrabold"><BarChart className={`${isOnline ? 'text-green-500' : 'text-red-500'}`}/>{isOnline ? 'Online' : 'Offline'}</span>
      </header>
      <main className="px-2">
        <section>
          <h1 className="text-3xl font-semibold">
            Pokedex
          </h1>
          <ul className="grid grid-cols-2 gap-10 mt-10">
            {state.pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name + pokemon.id} pokemon={pokemon}/>
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
      <FilterDialog />
    </div>
  )
}

const Loading = () => (
  <h5 className="font-semibold"><center>Loading ...</center></h5>
);
