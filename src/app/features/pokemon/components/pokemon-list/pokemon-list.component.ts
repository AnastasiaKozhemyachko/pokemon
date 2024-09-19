import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {selectAllPokemons} from "../../store/selectors/selectors";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {IRow} from "../../../../core/models/IRow";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    TableComponent,
    JsonPipe
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly $pokemons = this.store.pipe(select(selectAllPokemons))
  readonly rows: IRow[] = [{name: 'Name', key: 'name'}, {name: '', key: ''}];

  selectPokemon(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
}
