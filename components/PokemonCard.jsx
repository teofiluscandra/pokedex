import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { CheckSquare, Square } from 'react-feather';
import colors from '../constants/color';
import { useAppContext } from '../context/app-context';
import { getColorByType } from '../utils/helpers';


const PokemonCard = ({ pokemon }) => {
  const pokeIndex = ('000' + (parseInt(pokemon.id))).slice(-3)
  const primaryType = pokemon.types.length > 0 ? pokemon.types[0].type.name : null
  const color = colors[primaryType]
  const [state, dispatch] = useAppContext();
  const [compareActive, setCompareActive] = useState(false)

  useEffect(() => {
    if (compareActive) {
      dispatch({ type: 'ADD_POKEMON_TO_COMPARE', payload: pokemon })
    } else {
      dispatch({ type: 'REMOVE_POKEMON_TO_COMPARE', payload: pokemon })
    }
  }, [compareActive])

  useEffect(() => {
    if (state.compareMode) {
      setCompareActive(false)
    }
  }, [state.compareMode])

  const handleCompareButton = () => {
    setCompareActive(prev => {
      return state.compareList && state.compareList.length < 2 ? !prev : false
    })
  }

  return (
      <li className={`relative p-2 rounded-lg`} style={{backgroundColor: color}}>
        {state.compareMode && (
          <button className="absolute z-10 h-8 top-1 right-2" onClick={() => handleCompareButton()}>
            {compareActive ? <CheckSquare /> : <Square />}
          </button>
        )}
        <Link href={`/${pokemon.name}`}>
          <a>
            <article className="flex flex-col items-center justify-center hover:animate-pulse">
              <span className="font-semibold text-md">#{pokeIndex}</span>
                <Image
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                />
              <span className="text-lg font-bold uppercase">{pokemon.name}</span>
              <div className="flex items-center justify-center">
                {pokemon.types.map((type, index) => (
                  <span key={index} className={`inline-block p-2 rounded-xl m-1 text-xs shadow-md border-2 border-gray-600`} style={{backgroundColor: getColorByType(type.type.name)}}>{type.type.name}</span>
                ))}
              </div>
            </article>
          </a>
        </Link>
      </li>
  )
}

export default PokemonCard;
