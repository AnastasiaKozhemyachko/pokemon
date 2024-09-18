import {loadPokemon, loadPokemonFailure, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemonSuccess,} from "../actions/actions";
import {IPokemon} from "../../../../core/models/IPokemon";
import {createReducer, on} from "@ngrx/store";

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

export const reducers = createReducer(
  initialState,
  on(loadPokemons, state => ({ ...state, loading: true })),
  on(loadPokemonsSuccess, (state, action) => ({
    ...state,
    items: getItems(action, state),
    loading: false
  })),
  on(loadPokemonsFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(loadPokemon, state => ({ ...state, loading: true })),
  on(loadPokemonSuccess, (state, action) => {
    const existingItem = state.items.find(item => item.id === action.payload.id);
    const updatedItems = existingItem
      ? state.items.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
      : [...state.items, action.payload];
    return { ...state, items: updatedItems, loading: false };
  }),
  on(loadPokemonFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }))
);
