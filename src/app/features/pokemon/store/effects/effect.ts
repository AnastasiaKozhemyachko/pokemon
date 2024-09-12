import {inject, Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { loadPokemons, loadPokemonsFailure, loadPokemonsSuccess} from "../actions/actions";
import {IPokemon} from "../reducers/reducer";

interface IPokemons {
  count: number,
  next: string,
  previous: string,
  results: IPokemon[]
}

@Injectable()
export class PokemonEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(ofType(loadPokemons),
      switchMap(() => {
        return this.httpClient.get<IPokemons>('https://pokeapi.co/api/v2/pokemon?limit=10').pipe(
          map(response => loadPokemonsSuccess({ items: response.results })),
          catchError(error => of(loadPokemonsFailure({ error })))
        )
      }
      )
    )
  );
}
