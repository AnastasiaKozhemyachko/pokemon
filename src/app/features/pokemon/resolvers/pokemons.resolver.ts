import { ResolveFn } from '@angular/router';
import {selectHavePokemons} from "../store/selectors/selectors";
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {loadPokemons} from "../store/actions/actions";
import {map} from "rxjs/operators";

export const pokemonsResolver: ResolveFn<boolean> = () => {
  const store = inject(Store);
  return store.select(selectHavePokemons).pipe(map(hasPokemons => {
    if (!hasPokemons) {
      store.dispatch(loadPokemons());
    }
    return true;
  }));
};
