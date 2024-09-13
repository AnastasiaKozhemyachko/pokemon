import {Component, inject} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private readonly location = inject(Location)

  back() {
    this.location.back();
  }
}
