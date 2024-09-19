import {inject, Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IPokemonsApi } from "../../../../core/models/IPokemonsApi";
import {ActionsPokemonsUnion, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemon, loadPokemonFailure, loadPokemonSuccess} from "../actions/actions";
import {Store} from "@ngrx/store";
import {selectPokemonById} from "../selectors/selectors";
import { concatLatestFrom } from '@ngrx/operators';
import {IPokemon} from "../../../../core/models/IPokemon";


@Injectable()
export class PokemonsEffects {
  private readonly actions$ = inject(Actions<ActionsPokemonsUnion>);
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store);

  private readonly url = 'https://pokeapi.co/api/v2/pokemon';

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(loadPokemons),
        switchMap(() =>
          this.httpClient.get<IPokemonsApi>(`${this.url}?limit=20`).pipe(
            map(response => loadPokemonsSuccess({payload: response.results})),
            catchError(error => {
              return of(loadPokemonsFailure({error}));
            })
          )
        )
      );
    }
  );

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemon),
      concatLatestFrom((action: ReturnType<typeof loadPokemon>) => this.store.select(selectPokemonById(action.id))),
      switchMap(([action, pokemon]: [ReturnType<typeof loadPokemon>, IPokemon | undefined]) => {
        if (pokemon?.abilities) {
          return of(loadPokemonSuccess({ payload: pokemon }));
        } else {
          return this.httpClient.get<IPokemonsApi>(`${this.url}/${action.id}`).pipe(
            map(response => loadPokemonSuccess({ payload: response })),
            catchError(error => {
              return of(loadPokemonFailure({ error }));
            })
          );
        }
      }),
    )
  );
}
