import Image from 'next/image';
import Header from '../../components/Header';
import { getColorByType, getPokeIndex } from '../../utils/helpers';

const PokemonCompare = ({ pokemonList }) => {
  console.log(pokemonList)
  return (
    <main className="w-full max-w-xl mx-auto">
      <Header isHome={false}/>
      <div className="flex flex-wrap justify-center">
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
      <CompareTable title="Basic" categories={[{
        name: 'Height',
        value1: pokemonList[0].height,
        value2: pokemonList[1].height
      }, {
        name: 'Weight',
        value1: pokemonList[0].weight,
        value2: pokemonList[1].weight
      }]}/>
    </main>
  )
}

const CompareTable = ({title, categories = []}) => {
  return (
    <section className="px-4 py-3 rounded-lg shadow-lg">
      <h2 className="font-semibold">{title}</h2>
      <table className="w-full table-auto">
        <tbody>
          { categories.map(category => (
            <tr key={category.name}>
              <td width="75">{category.name}</td>
              <td>{category.value1}</td>
              <td>{category.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
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
