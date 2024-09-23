import {inject, Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {debounceTime, delay, of, take, takeUntil, tap} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IPokemonsApi } from "../../models/IPokemonsApi";
import {ActionsPokemonsUnion, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemon, loadPokemonFailure, loadPokemonSuccess} from "../actions/actions";
import {Store} from "@ngrx/store";
import {selectPokemonById, selectPokemonPagination} from "../selectors/selectors";
import { concatLatestFrom } from '@ngrx/operators';
import {IPokemon} from "../../models/IPokemon";
import {IPagination} from "../../../../core/models/IPagination";
import {loadMorePokemon} from "../actions/paginationActions";

@Injectable()
export class PokemonsEffects {
  private readonly actions$ = inject(Actions<ActionsPokemonsUnion>);
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store);

  private readonly url = 'https://pokeapi.co/api/v2/pokemon';

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPokemons),
      delay(1000),
      concatLatestFrom(() => this.store.select(selectPokemonPagination)),
      switchMap(([action, pagination]: [ReturnType<typeof loadPokemons>, IPagination]) => this.fetchPokemons(pagination))
    );
  });

  loadMoreItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMorePokemon),
      concatLatestFrom(() => this.store.select(selectPokemonPagination)),
      switchMap(([action, pagination]: [ReturnType<typeof loadMorePokemon>, IPagination]) => {
        const newPagination = { limit: pagination.limit, offset: pagination.offset + pagination.limit };
        return this.fetchPokemons(newPagination);
      })
    );
  });

  private fetchPokemons(pagination: IPagination) {
    return this.httpClient.get<IPokemonsApi>(`${this.url}?limit=${pagination.limit}&offset=${pagination.offset}`).pipe(
      map(response => loadPokemonsSuccess({payload: response.results, pagination})),
      catchError(error => of(loadPokemonsFailure({error})))
    );
  }

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
