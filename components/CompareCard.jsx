import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { useAppContext } from '../context/app-context';
import { getPokeIndex } from '../utils/helpers';

const CompareCard = () => {
  const [state, dispatch] = useAppContext();

  return (
    <div className="sticky left-0 right-0 z-20 flex flex-wrap items-center px-4 py-2 mx-5 rounded-xl bottom-5 bg-slate-100">
      <ul className="flex flex-1 space-x-5">
        { state.compareList && state.compareList.map((pokemon, index) => (
          <li key={pokemon.name} className="relative w-14 h-14">
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPokeIndex(pokemon.id)}.png`}
              alt={pokemon.name}
              layout="fill"
              objectFit="contain" />
          </li>
        ))}
      </ul>
      {
        state.compareList && state.compareList.length >= 2 ? (
          <Link href={`/pokemon-compare/${state.compareList[0].name}/${state.compareList[1].name}`}>
            <a className="flex px-4 py-2 font-bold text-white bg-green-700 rounded-lg"><span>Compare</span><ArrowRight className="ml-1"/></a>
          </Link>
        ) : <button className="text-md" onClick={() => dispatch({type: 'TOGGLE_COMPARE_MODE'})}>Cancel</button>
      }

    </div>
  )
}

export default CompareCard;
