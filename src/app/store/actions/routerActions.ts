import {createAction, props} from "@ngrx/store";

export const navigateToPokemon = createAction(
  '[Pokemon List] Navigate to Pokemon',
  props<{ id: number }>()
);
