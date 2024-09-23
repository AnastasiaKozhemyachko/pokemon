import { createReducer, on } from '@ngrx/store';
import { loadPokemon, loadPokemonFailure, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemonSuccess } from '../actions/actions';
import { IPokemon } from '../../models/IPokemon';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {IPagination} from "../../../../core/models/IPagination";
import {loadMorePokemon, setNewPagination} from "../actions/paginationActions";

export const adapter: EntityAdapter<IPokemon> = createEntityAdapter<IPokemon>();

export interface PokemonState extends EntityState<IPokemon> {
  loading: boolean;
  error: any;
  pagination: IPagination;
}

export const initialState: PokemonState = adapter.getInitialState({
  loading: false,
  error: null,
  pagination: { limit: 40, offset: 0 }
});

export const reducers = createReducer(
  initialState,
  on(loadPokemons, state => ({ ...state, loading: true })),
  on(loadPokemonsSuccess, (state, action) => {
    const entities = action.payload.map(item => {
      const idRegex = /\/pokemon\/(\d+)\//;
      const match = item.url.match(idRegex);
      const id = match ? parseInt(match[1], 10) : 0;
      const existingItem = state.entities[id];
      return { ...existingItem, ...item, id };
    });

    const existingEntities = Object.values(state.entities).filter((entity): entity is IPokemon => entity !== undefined);
    return adapter.setAll([...existingEntities, ...entities], { ...state, loading: false, pagination: action.pagination });
  }),
  on(loadPokemonsFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(loadPokemon, state => ({ ...state, loading: true })),
  on(loadPokemonSuccess, (state, action) => {
    return adapter.upsertOne(action.payload, { ...state, loading: false });
  }),
  on(loadPokemonFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(setNewPagination, (state, action) => ({ ...state, pagination: action.pagination })),
  on(loadMorePokemon, state => ({ ...state, loading: true }))
);
