import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonState} from "../reducers/reducer";

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectAllPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.items
);
