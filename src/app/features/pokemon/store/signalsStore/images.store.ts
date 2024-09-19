import {patchState, signalStore, withHooks, withState} from "@ngrx/signals";
import {ImageService} from "../../../../core/services/image.service";
import {inject} from "@angular/core";
import {selectPokemon} from "../selectors/selectors";
import {Store} from "@ngrx/store";
import {delay, switchMap} from "rxjs/operators";
import {IPokemon} from "../../../../core/models/IPokemon";
import {forkJoin, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

interface PokemonImages {
  front?: string;
  back?: string;
  frontShiny?: string;
  backShiny?: string;
}

interface ImageState {
  images: PokemonImages;
  isLoading: boolean;
}

const initialState: ImageState = {
  images: {},
  isLoading: false
};

export const ImageStore = signalStore(
  withState(initialState),
  withHooks((store) => {
    const imageService = inject(ImageService);
    const globalStore = inject(Store);
    const pokemon$ = globalStore.select(selectPokemon);

    return {
      onInit() {
        patchState(store,{isLoading: true});
        pokemon$.pipe(
          switchMap((p: IPokemon | undefined) => forkJoin({
            front: imageService.showImage(p?.sprites?.front_default ?? ''),
            back: imageService.showImage(p?.sprites?.back_default ?? ''),
            frontShiny: imageService.showImage(p?.sprites?.front_shiny ?? ''),
            backShiny:imageService.showImage(p?.sprites?.back_shiny ?? '')
          })),
          takeUntilDestroyed(),
          delay(1000),
          tap((images: PokemonImages) =>  patchState(store, {images, isLoading: false}))
        ).subscribe();
      },
    };
  }),
);
