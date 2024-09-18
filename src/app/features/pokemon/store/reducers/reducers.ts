import { createReducer, on } from '@ngrx/store';
import { loadPokemon, loadPokemonFailure, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemonSuccess } from '../actions/actions';
import { IPokemon } from '../../../../core/models/IPokemon';

export interface PokemonState {
  ids: number[];
  entities: { [key: number]: IPokemon };
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  entities: {},
  ids: [],
  loading: false,
  error: null
};

export const reducers = createReducer(
  initialState,
  on(loadPokemons, state => ({ ...state, loading: true })),
  on(loadPokemonsSuccess, (state, action) => {
    const entities = action.payload.reduce((acc, item) => {
      const existingItem = state.entities[item.id];
      return { ...acc, [item.id]: { ...existingItem, ...item } };
    }, {});
    const ids = action.payload.map(item => item.id);
    return { ...state, entities, ids, loading: false };
  }),
  on(loadPokemonsFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(loadPokemon, state => ({ ...state, loading: true })),
  on(loadPokemonSuccess, (state, action) => {
    const entities = { ...state.entities, [action.payload.id]: action.payload };
    return { ...state, entities, loading: false };
  }),
  on(loadPokemonFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }))
);
