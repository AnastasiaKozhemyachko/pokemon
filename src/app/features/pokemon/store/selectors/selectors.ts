import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonState} from "../reducers/reducers";

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectAllPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.items
);

export const selectPokemonById = (id: number) => createSelector(
  selectPokemonState,
  (state: PokemonState) => state.items.find(item => item.id === id)
);
