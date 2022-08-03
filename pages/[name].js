import { Tab } from '@headlessui/react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import { capitalizeWord, getColorByType } from '../utils/helpers';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const categories = [
  'About', 'Base Stats'
]

const Pokemon = ({pokemon}) => {
  const pokeIndex = ('000' + (pokemon.id)).slice(-3)

  return (
    <div className="w-full min-h-screen p-5 py-12 pb-20 mx-auto space-y-3 bg-white sm:max-w-xl">
      <Head>
        <title>{capitalizeWord(pokemon.name)}</title>
        <meta name="description" content={`Detail of ${pokemon.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isHome={false}/>
      <div className="flex flex-col items-center justify-center">
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
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-1 text-sm font-medium leading-5 text-green-600',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            key={0}
            className={
              'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            }
          >
            <h3 className="text-sm font-medium leading-5">
              Abilities : {pokemon.abilities.map((ability, index) => (<span key={ability+index} className="text-sm leading-5">{ability.ability.name}{pokemon.abilities.length - 1 == index ? ' ' : ', '}</span>))}
            </h3>
            <p className="text-sm text-semibold">Height: {pokemon.height} mm.</p>
            <p className="text-sm text-semibold">Weight: {pokemon.weight} gr.</p>
          </Tab.Panel>
          <Tab.Panel
            key={1}
            className={
              'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            }
          >
            {pokemon.stats.map((stat, index) => (
              <div key={stat.stat.name} className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium leading-5">{capitalizeWord(stat.stat.name)}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${stat.base_stat}%`}}></div>
                </div>
              </div>
            ))}
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Pokemon;

export async function getServerSideProps({query}) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.name}`)
  const pokemon = await response.json()

  return {
      props: {
          pokemon
      }
  }
}
