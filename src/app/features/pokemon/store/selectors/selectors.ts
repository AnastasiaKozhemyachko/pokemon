import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonState} from "../reducers/reducers";
import {selectRouteParams} from "../../../../store/selectors/routeSelectors";
import {Dictionary} from "@ngrx/entity";
import {IPokemon} from "../../models/IPokemon";

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectPokemonsEntities = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.entities
);

export const selectAllPokemons = createSelector(
  selectPokemonsEntities,
  (entities: Dictionary<IPokemon>) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const selectPokemonById = (id: number) => createSelector(
  selectPokemonsEntities,
  (entities: Dictionary<IPokemon>) => entities[id]
);

export const selectHavePokemons = createSelector(
  selectPokemonsEntities,
  (entities: Dictionary<IPokemon>) => Object.keys(entities).length > 0
);

export const selectPokemon = createSelector(
  selectPokemonsEntities,
  selectRouteParams,
  (entities: Dictionary<IPokemon>, param) => {
    return entities?.[param['id']];
  }
);

export const selectPokemonPagination = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pagination
);

export const selectPokemonLoading = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.loading
);

