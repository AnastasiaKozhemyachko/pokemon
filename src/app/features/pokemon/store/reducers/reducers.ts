import {
  ActionsPokemonsUnion, loadPokemon, loadPokemonFailure,
  loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemonSuccess,
} from "../actions/actions";
import {IPokemon} from "../../../../core/models/IPokemon";

export interface PokemonState {
  items: IPokemon[];
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  items: [],
  loading: false,
  error: null
};

function getItems(action: { payload: IPokemon[] }, state: PokemonState): IPokemon[] {
  return action.payload.map(newItem => {
    const existingItem = state.items.find(item => item.id === newItem.id);
    return existingItem ? {...existingItem, ...newItem} : newItem;
  });
}

export function reducers (state = initialState, action: ActionsPokemonsUnion): PokemonState {
  switch (action.type) {
    case loadPokemons.type: {
      return {...state, loading: true};
    }
    case loadPokemonsSuccess.type: {
      return {...state,  items: getItems(action, state), loading: false}
    }
    case loadPokemonsFailure.type: {
      return {...state, error: action.error, loading: false}
    }

    case loadPokemon.type: {
      return {...state, loading: true};
    }

    case loadPokemonSuccess.type: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.items.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
        : [...state.items, action.payload];
      return { ...state, items: updatedItems, loading: false };
    }

    case loadPokemonFailure.type: {
      return {...state, error: action.error, loading: false}
    }

    default: {
      return state;
    }
  }
}
