import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {selectAllPokemons} from "../../store/selectors/selector";
import {loadPokemons} from "../../store/actions/actions";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {IRow} from "../../../../core/models/IRow";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    TableComponent
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly $pokemons = this.store.pipe(select(selectAllPokemons))
  readonly rows: IRow[] = [{name: 'Name', key: 'name'}, {name: '', key: ''}];

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
  }

  selectPokemon() {
    this.router.navigate(['/pokemon', 1]);
  }
}
