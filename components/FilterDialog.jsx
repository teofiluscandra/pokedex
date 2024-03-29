import { useEffect, useState } from 'react';
import { useAppContext } from '../context/app-context';
import { getPokemonByTypes } from '../utils/pokemon_fetch';

const FilterDialog = () => {
  const [types, setTypes] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [state, dispatch] = useAppContext()

  useEffect(() => {
    async function fetchData() {
      const fetching = await fetch('https://pokeapi.co/api/v2/type');
      const response = await fetching.json();
      const types = response.results;
      setTypes(types);
    }

    fetchData()
  }, [])

  function handleTypeCheckboxClick(e) {
    const type = e.target.value;
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  async function handleFilterButtonClick() {
    if (selectedTypes.length > 0) {
      const pokemonList = await getPokemonByTypes(selectedTypes)
      dispatch({type: 'SET_FILTER_LIST', payload: pokemonList, filterList: selectedTypes})
    } else {
      dispatch({type: 'SET_FILTER_LIST', filterList: []})
    }

    dispatch({type: 'TOGGLE_FILTER_MODE'})
  }

  return (
    <div className="sticky left-0 right-0 z-20 flex flex-col flex-wrap px-4 py-2 mx-5 space-y-3 rounded-xl bottom-5 bg-slate-100" style={{display: state.filterMode ? 'inherit' : 'none'}}>
      <h2 className="text-lg font-bold">Filter: </h2>
      <div className="flex flex-col space-y-9">
        <section>
          <h3 className="mb-2 font-semibold">By Types</h3>
          <div className="flex flex-wrap">
          {
            types.map(type => (
              <label key={type.name} className="flex px-2 mb-2 mr-1 space-x-1 text-lg bg-green-200 border-2 rounded-lg hover:bg-green-700 hover:text-white">
                <input type="checkbox" className="cursor-pointer" onChange={handleTypeCheckboxClick} value={type.name}/>
                <span className="text-sm font-semibold">{type.name}</span>
              </label>
            ))
          }
          </div>
        </section>
        <section>
          <h3 className="mb-2 font-semibold">By Generation</h3>
          <div className="flex flex-wrap">
          {
            ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map(generation => (
              <label key={generation} className="flex px-2 mb-2 mr-1 space-x-1 text-lg bg-green-200 border-2 rounded-lg hover:bg-green-700">
                <input type="checkbox" className="cursor-pointer"/>
                <span className="text-sm font-semibold">{generation}</span>
              </label>
            ))
          }
          </div>
        </section>
        <button className="inline-flex items-center py-2 px-2.5 text-sm rounded-md text-white font-bold leading-none bg-green-700 justify-center" onClick={handleFilterButtonClick}>Save Filter</button>
      </div>
    </div>
  )
}

export default FilterDialog;
