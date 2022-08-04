import Head from 'next/head';
import CompareCard from '../components/CompareCard';
import FilterDialog from '../components/FilterDialog';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import { useAppContext } from '../context/app-context';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePokemonList } from '../utils/pokemon_fetch';

export default function Home() {
  const [state] = useAppContext();
  const {data, error, setSize} = usePokemonList();
  const ref = useIntersectionObserver(() => setSize((size) => size + 1));
  const pokemonList = data ? [].concat(...data) : [];

  return (
    <div className="w-full max-w-xl pb-20 mx-auto space-y-3 bg-white">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Here is pokedex list for public" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="px-2">
        <section>
          <h1 className="text-3xl font-semibold">
            Pokedex
          </h1>
          <ul className="grid grid-cols-2 gap-10 mt-10">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name + pokemon.id} pokemon={pokemon}/>
            ))}
          </ul>
        </section>
        <div className='h-4 opacity-0' ref={ref}></div>

        {!data && !error && <Loading />}
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
