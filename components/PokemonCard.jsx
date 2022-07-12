import Image from "next/image";
import Link from "next/link";

function PokemonCard({pokemon, index}) {
  const pokeIndex = ('000' + (index + 1)).slice(-3)

  return (
    <Link href={`/name`}>
      <a>
        <div>
          <span>#{pokeIndex}</span>
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
              alt={pokemon.name}
              width={150}
              height={150}
            />
          <span>{pokemon.name}</span>
        </div>
      </a>
    </Link>
  )
}

export default PokemonCard;
