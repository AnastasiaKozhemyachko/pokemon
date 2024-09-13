import { ResolveFn } from '@angular/router';
import * as ActionsPokemons from "../store/actions/actions";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";

export const pokemonsResolver: ResolveFn<boolean> = () => {
  inject(Store).dispatch(ActionsPokemons.loadPokemons());
  return true;
};
