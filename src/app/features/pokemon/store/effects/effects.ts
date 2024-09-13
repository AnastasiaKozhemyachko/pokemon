import {inject, Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IPokemonsAPI } from "../../../../core/models/IPokemonsAPI";
import {IPokemon} from "../../../../core/models/IPokemon";
import {ActionsPokemonsUnion, loadPokemons, loadPokemonsFailure, loadPokemonsSuccess, loadPokemon, loadPokemonFailure, loadPokemonSuccess} from "../actions/actions";
import {Store} from "@ngrx/store";
import {selectPokemonById} from "../selectors/selectors";
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class PokemonsEffects {
  private readonly actions$ = inject(Actions<ActionsPokemonsUnion>);
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      switchMap(() =>
        this.httpClient.get<IPokemonsAPI>('https://pokeapi.co/api/v2/pokemon?limit=10').pipe(
          map(response => loadPokemonsSuccess(this.getItems(response))),
          catchError(error => of(loadPokemonsFailure({error})))
        )
      )
    )
  );

  private getItems(response: IPokemonsAPI): IPokemon[] {
    const idRegex = /\/pokemon\/(\d+)\//;

    return response.results.map(item => {
      const match = item.url.match(idRegex);
      const id = match ? parseInt(match[1], 10) : null;
      return {name: item.name, id: id!};
    });
  }

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemon),
      concatLatestFrom(action => this.store.select(selectPokemonById(action.id))),
      switchMap(([action, pokemon]) => {
        if (pokemon?.abilities) {
          return of(loadPokemonSuccess(pokemon));
        } else {
          return this.httpClient.get<IPokemonsAPI>(`https://pokeapi.co/api/v2/pokemon/${action.id}`).pipe(
            map(response => loadPokemonSuccess(response)),
            catchError(error => of(loadPokemonFailure({error})))
          );
        }
      })
    )
  );
}
