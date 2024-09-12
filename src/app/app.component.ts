import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {loadPokemons} from "./features/pokemon/store/actions/actions";
import {select, State, Store} from "@ngrx/store";
import {PokemonState} from "./features/pokemon/store/reducers/reducer";
import {selectAllPokemons} from "./features/pokemon/store/selectors/selector";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  $pokemons = this.store.pipe(select(selectAllPokemons))


  constructor(private store: Store<PokemonState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
  }
}
