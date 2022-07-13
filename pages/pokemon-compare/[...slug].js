import Image from 'next/image';
import { getColorByType, getPokeIndex } from '../../utils/helpers';

const PokemonCompare = ({ pokemonList }) => {
  return (
    <main className="w-full max-w-xl mx-auto">
      <div className="flex">
        {
          pokemonList.map((pokemon, index) => {
            const pokeIndex = getPokeIndex(pokemon.id)
            return (
              <div key={pokemon.name} className="flex flex-col items-center justify-center">
                <span className="font-semibold">#{pokeIndex}</span>
                <h1 className="font-bold uppercase">{pokemon.name}</h1>
                <Image
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
                  alt={pokemon.name}
                  height="250"
                  width="250"
                />
                <div className="flex items-center justify-center">
                  {pokemon.types.map((type, index) => (
                    <span key={index} className={`inline-block text-white p-2 rounded-xl m-1 text-xs`} style={{backgroundColor: getColorByType(type.type.name)}}>{type.type.name}</span>
                  ))}
                </div>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default PokemonCompare;

export async function getServerSideProps({query}) {
  const pokemonList = await Promise.all(
    query.slug.map(async (pokemon) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      return response.json();
    })
  )

  return {
      props: {
        pokemonList,
      }
  }
}
