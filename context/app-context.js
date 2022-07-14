import { createContext, useContext, useReducer } from 'react';

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
    default:
      throw new Error(`Unhandled action type.`)
  }
}

const initialState = {
  compareList: [],
  compareMode: false,
  filterMode: false,
  pokemonList: []
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appContextValue = [state, dispatch];

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
