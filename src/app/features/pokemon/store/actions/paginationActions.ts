import {createAction, props} from "@ngrx/store";
import {IPagination} from "../../../../core/models/IPagination";

export const setNewPagination = createAction(
  '[Pokemons] Set New Pagination',
  props<{ pagination: IPagination }>()
);

export const loadMorePokemon = createAction(
  '[Pokemons] Load More Pokemon'
);
