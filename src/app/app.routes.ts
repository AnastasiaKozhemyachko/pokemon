import { Routes } from '@angular/router';
import {PokemonCardComponent} from "./features/pokemon/components/pokemon-card/pokemon-card.component";
import {PokemonListComponent} from "./features/pokemon/components/pokemon-list/pokemon-list.component";
import {pokemonsResolver} from "./features/pokemon/resolvers/pokemons.resolver";
import {pokemonResolver} from "./features/pokemon/resolvers/pokemon.resolver";

export const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent, resolve: { pokemon: pokemonsResolver } },
  { path: 'pokemon/:id', component: PokemonCardComponent, resolve: { pokemon: pokemonResolver } },
  { path: '',   redirectTo: '/pokemons', pathMatch: 'full' },
];
