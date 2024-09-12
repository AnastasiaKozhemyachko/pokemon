import { createReducer, on } from '@ngrx/store';
import {loadPokemons, loadPokemonsFailure, loadPokemonsSuccess} from "../actions/actions";

export interface IPokemon {
  name: string;
  url: string;
}

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

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, state => ({ ...state, loading: true })),
  on(loadPokemonsSuccess, (state, { items }) => ({ ...state, items, loading: false })),
  on(loadPokemonsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
