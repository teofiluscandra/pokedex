import { Tab } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const categories = [
  'About', 'Base Stats'
]

const Pokemon = ({pokemon}) => {
  console.log(pokemon)
  const pokeIndex = ('000' + (pokemon.id)).slice(-3)

  return (
    <div className="w-full sm:max-w-xl mx-auto space-y-3 bg-white pb-20 min-h-screen py-12">
      <div className="flex justify-center items-center flex-col">
          <span className="font-semibold">#{pokeIndex}</span>
          <h1 className="font-bold">{pokemon.name}</h1>
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
            alt={pokemon.name}
            height="250"
            width="250"
          />
          <div className="flex justify-center items-center">
            {pokemon.types.map((type, index) => (
              <span key={index} className={`inline-block bg-green-500 text-white p-2 rounded-full m-1`}>{type.type.name}</span>
            ))}
          </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
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
                <div key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium leading-5">{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                </div>
              ))}
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <Link href="/">
        <a type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back to Home</a>
      </Link>
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
