import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, Location, NgOptimizedImage} from '@angular/common';
import {Store} from "@ngrx/store";
import {selectPokemon} from "../../store/selectors/selectors";
import {ImageStore} from "../../store/signalsStore/images.store";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgOptimizedImage
  ],
  providers: [ImageStore],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private readonly location = inject(Location);
  private readonly store = inject(Store);
  protected readonly imageStore = inject(ImageStore);

  pokemon$ = this.store.select(selectPokemon);

  back() {
    this.location.back();
  }
}
