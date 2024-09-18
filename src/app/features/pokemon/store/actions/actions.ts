import {createAction, props, union} from '@ngrx/store';
import {IPokemonApi} from "../../../../core/models/IPokemonApi";

// loadPokemons
export const loadPokemons = createAction(
  '[Pokemons] Pokemons Load',
);

export const loadPokemonsSuccess = createAction(
  '[Pokemons] Load Pokemons Success',
  props<{payload: IPokemonApi[]}>()
);

export const loadPokemonsFailure= createAction(
  '[Pokemons] Load Pokemons Failure',
  props<{error: unknown}>()
);

// loadPokemon
export const loadPokemon = createAction(
  '[Pokemon] Pokemon Load',
  props<{id: number}>()
);

export const loadPokemonSuccess = createAction(
  '[Pokemon] Load Pokemon Success',
  props<{payload: any}>()
);

export const loadPokemonFailure= createAction(
  '[Pokemon] Load Pokemon Failure',
  props<{error: unknown}>()
);

const pokemonApiActions = union({
  loadPokemon,
  loadPokemonSuccess,
  loadPokemonFailure,
  loadPokemons,
  loadPokemonsSuccess,
  loadPokemonsFailure,
});

export type ActionsPokemonsUnion = typeof pokemonApiActions;
