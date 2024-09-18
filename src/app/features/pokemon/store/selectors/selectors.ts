import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonState} from "../reducers/reducers";

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectPokemonsEntities = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.entities
);

export const selectAllPokemons = createSelector(
  selectPokemonsEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const selectPokemonById = (id: number) => createSelector(
  selectPokemonsEntities,
  (entities) => entities[id]
);
