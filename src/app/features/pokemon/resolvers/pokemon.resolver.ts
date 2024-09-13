import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import * as ActionsPokemon from "../store/actions/actions";

export const pokemonResolver: ResolveFn<boolean> = (route, state) => {
  const id = route.paramMap.get('id');
  if (id) {
    inject(Store).dispatch(ActionsPokemon.loadPokemon(+id));
  }
  return true;
};
