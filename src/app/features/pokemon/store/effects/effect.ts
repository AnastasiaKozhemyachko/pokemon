import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { loadPokemons, loadPokemonsFailure, loadPokemonsSuccess } from "../actions/actions";
import { IPokemonsAPI } from "../../../../core/models/IPokemonsAPI";
import {IPokemon} from "../../../../core/models/IPokemon";

@Injectable()
export class PokemonEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      switchMap(() =>
        this.httpClient.get<IPokemonsAPI>('https://pokeapi.co/api/v2/pokemon?limit=10').pipe(
          map(response => {
            return loadPokemonsSuccess({ items: this.getItems(response) });
          }),
          catchError(error => of(loadPokemonsFailure({ error })))
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
}
