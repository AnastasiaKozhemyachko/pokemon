import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, Location, NgOptimizedImage} from '@angular/common';
import {Store} from "@ngrx/store";
import {selectPokemon} from "../../store/selectors/selectors";
import {IPokemonSprites} from "../../../../core/models/IPokemon";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgOptimizedImage
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private readonly location = inject(Location);
  private readonly store = inject(Store);
  readonly sprites: (keyof IPokemonSprites)[] = ['front_default', 'back_default', 'front_shiny', 'back_shiny'];

  pokemon$ = this.store.select(selectPokemon);

  back() {
    this.location.back();
  }
}
