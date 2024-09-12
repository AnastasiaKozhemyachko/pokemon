import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {pokemonReducer} from "./features/pokemon/store/reducers/reducer";
import {provideEffects} from "@ngrx/effects";
import {PokemonEffects} from "./features/pokemon/store/effects/effect";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ pokemon: pokemonReducer }),
    provideEffects([PokemonEffects]),
    importProvidersFrom([
      HttpClientModule,
      StoreDevtoolsModule.instrument()
    ]),
  ]
};
