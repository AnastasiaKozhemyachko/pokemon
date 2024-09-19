import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonState} from "../reducers/reducers";
import {selectRouteParams} from "../../../../store/selectors/routeSelectors";
import {Dictionary} from "@ngrx/entity";
import {IPokemon} from "../../../../core/models/IPokemon";

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

export const selectPokemon = createSelector(
  selectPokemonsEntities,
  selectRouteParams,
  (entities: Dictionary<IPokemon>, param) => {
    return entities?.[param['id']];
  }
);

