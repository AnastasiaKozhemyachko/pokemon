import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, Location} from '@angular/common';
import {Store} from "@ngrx/store";
import {selectPokemon} from "../../store/selectors/selectors";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private readonly location = inject(Location);
  private readonly store = inject(Store);

  pokemon$ = this.store.select(selectPokemon);

  back() {
    this.location.back();
  }
}
