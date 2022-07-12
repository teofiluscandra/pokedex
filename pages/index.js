import Head from 'next/head';
import { useState } from 'react';
import useInfiniteScroll from '../components/hooks/useInfiniteScroll';
import PokemonCard from '../components/PokemonCard';

export default function Home({initialPokemon}) {
  const [nextPokemonList, setNextPokemonList] = useState(initialPokemon.next);
  const [pokemon, setPokemon] = useState(initialPokemon.results);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  async function fetchMoreListItems() {
    setIsFetching(true);
    const response = await fetch(nextPokemonList)
    const nextPokemon = await response.json()
    setPokemon([...pokemon, ...nextPokemon.results])
    setNextPokemonList(nextPokemon.next)
    setIsFetching(false);
  }

  return (
    <div className="w-full sm:max-w-xl mx-auto space-y-3 bg-white pb-20">
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Here is pokedex list for public" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-end">
        <div>
          <button>Compare</button>
        </div>
        <div>
          <button>Filter</button>
        </div>
      </header>
      <main>
        <section>
          <h1 className="text-3xl font-semibold">
            Pokedex ({initialPokemon.count})
          </h1>
          <div className="grid grid-cols-2 gap-10 mt-10">
            {pokemon.map((pokemon, index) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} index={index}/>
            ))}
          </div>
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
    </div>
  )
}

const Loading = () => (
  <h5 className="font-semibold"><center>Loading ...</center></h5>
);

export async function getStaticProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon")
  const initialPokemon = await response.json()

  return {
      props: {
          initialPokemon
      }
  }
}
