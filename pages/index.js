import Head from 'next/head';
import PokemonCard from '../components/PokemonCard';

export default function Home({initialPokemon}) {
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
            {initialPokemon.results.map((pokemon, index) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} index={index}/>
            ))}
          </div>
        </section>
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

export async function getStaticProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon")
  const initialPokemon = await response.json()

  return {
      props: {
          initialPokemon
      }
  }
}
