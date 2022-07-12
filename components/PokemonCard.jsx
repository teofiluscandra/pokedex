import Image from "next/image";
import Link from "next/link";

const PokemonCard = ({pokemon, index}) => {
  const pokeIndex = ('000' + (index + 1)).slice(-3)

  return (
    <Link href={`/${pokemon.name}`}>
      <a className="bg-green-100 p-2 rounded-lg hover:bg-green-500">
        <div className="flex flex-col justify-center items-center">
          <span className="text-md font-semibold">#{pokeIndex}</span>
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
              alt={pokemon.name}
              width={150}
              height={150}
            />
          <span className="text-lg font-bold uppercase">{pokemon.name}</span>
        </div>
      </a>
    </Link>
  )
}

export default PokemonCard;
