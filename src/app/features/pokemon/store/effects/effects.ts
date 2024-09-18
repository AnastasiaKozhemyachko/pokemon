import {inject, Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of, tap} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IPokemonsApi } from "../../../../core/models/IPokemonsApi";
import {ActionsPokemonsUnion, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemon, loadPokemonFailure, loadPokemonSuccess} from "../actions/actions";
import {Store} from "@ngrx/store";
import {selectPokemonById} from "../selectors/selectors";
import { concatLatestFrom } from '@ngrx/operators';
import {navigateToPokemon} from "../../../../store/actions/routerActions";
import {Router} from "@angular/router";


@Injectable()
export class PokemonsEffects {
  private readonly actions$ = inject(Actions<ActionsPokemonsUnion>);
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private readonly url = 'https://pokeapi.co/api/v2/pokemon';

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(loadPokemons),
        switchMap(() =>
          this.httpClient.get<IPokemonsApi>(`${this.url}?limit=10`).pipe(
            map(response => loadPokemonsSuccess({payload: response.results})),
            catchError(error => {
              console.error('Error loading pokemons:', error);
              return of(loadPokemonsFailure({error}));
            })
          )
        )
      );
    }
  );

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(navigateToPokemon),
      concatLatestFrom((action: ReturnType<typeof navigateToPokemon>) => this.store.select(selectPokemonById(action.id))),
      switchMap(([action, pokemon]) => {
        if (pokemon?.abilities) {
          return of(loadPokemonSuccess({ payload: pokemon }));
        } else {
          return this.httpClient.get<IPokemonsApi>(`${this.url}/${action.id}`).pipe(
            map(response => loadPokemonSuccess({ payload: response })),
            catchError(error => {
              console.error('Error loading pokemon:', error);
              return of(loadPokemonFailure({ error }));
            })
          );
        }
      }),
      tap((action) => {
        if (action.type === loadPokemonSuccess.type) {
          this.router.navigate(['/pokemon', action.payload.id]);
        }
      })
    )
  );
}
