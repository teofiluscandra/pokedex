import { createContext, useContext, useEffect, useReducer } from 'react';
import { getAllPokemon } from '../utils/pokemon_fetch';

export const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON_TO_COMPARE':
      if (state.compareList.length < 2) {
        return {...state, compareList: [...state.compareList, action.payload]};
      }
    case 'REMOVE_POKEMON_TO_COMPARE':
      return {...state, compareList: state.compareList.filter(pokemon => pokemon.name !== action.payload.name)};
    case 'TOGGLE_COMPARE_MODE':
      return {...state, compareMode: !state.compareMode, compareList: []};
    case 'TOGGLE_FILTER_MODE':
      return {...state, filterMode: !state.filterMode}
    case 'SET_POKEMON_LIST':
      return {...state, pokemonList: [...state.pokemonList, ...action.payload.pokemonList], nextUrl: action.payload.nextUrl};
    default:
      throw new Error(`Unhandled action type.`)
  }
}

const initialState = {
  compareList: [],
  compareMode: false,
  filterMode: false,
  pokemonList: [],
  nextUrl: ''
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appContextValue = [state, dispatch];

  // Set All Pokemon List
  useEffect(() => {
    (async () => {
      const { nextUrl, pokemonList } = await getAllPokemon();
      dispatch({type: 'SET_POKEMON_LIST', payload: {nextUrl, pokemonList}});
    })()
  }, []);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
