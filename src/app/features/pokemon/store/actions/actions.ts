import {createAction, union} from '@ngrx/store';
import {IPokemon} from "../../../../core/models/IPokemon";

// loadPokemons
export const loadPokemons = createAction(
  '[Pokemons] Pokemons Load',
);

export const loadPokemonsSuccess = createAction(
  '[Pokemons] Load Pokemons Success',
  (payload: IPokemon[]) => ({payload})
);

export const loadPokemonsFailure= createAction(
  '[Pokemons] Load Pokemons Failure',
  (error: unknown) => ({error})
);

// loadPokemon
export const loadPokemon = createAction(
  '[Pokemon] Pokemon Load',
  (id: number) => ({id})
);

export const loadPokemonSuccess = createAction(
  '[Pokemon] Load Pokemon Success',
  (payload: any) => ({payload})
);

export const loadPokemonFailure= createAction(
  '[Pokemon] Load Pokemon Failure',
  (error: unknown) => ({error})
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
