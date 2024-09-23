import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {selectAllPokemons, selectPokemonLoading} from "../../store/selectors/selectors";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {IRow} from "../../models/IRow";
import {Router} from "@angular/router";
import {EndScrollDirective} from "../../../../shared/directives/end-scroll.directive";
import {loadMorePokemon} from "../../store/actions/paginationActions";
import {IsLoadingDirective} from "../../../../shared/directives/is-loading.directive";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    AsyncPipe,
    TableComponent,
    JsonPipe,
    EndScrollDirective,
    IsLoadingDirective
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly $loading: Observable<boolean> = this.store.pipe(select(selectPokemonLoading));
  readonly $pokemons = this.store.pipe(select(selectAllPokemons));
  readonly rows: IRow[] = [{name: 'Name', key: 'name'}, {name: '', key: ''}];

  selectPokemon(id: number) {
    this.router.navigate(['/pokemon', id]);
  }

  getMoreItems() {
    this.store.dispatch(loadMorePokemon())
  }
}
