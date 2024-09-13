import { Routes } from '@angular/router';
import {PokemonCardComponent} from "./features/pokemon/components/pokemon-card/pokemon-card.component";
import {PokemonListComponent} from "./features/pokemon/components/pokemon-list/pokemon-list.component";

export const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonCardComponent },
  { path: '',   redirectTo: '/pokemons', pathMatch: 'full' },
];
