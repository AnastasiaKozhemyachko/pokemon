import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import { PokemonsEffects} from "./features/pokemon/store/effects/effects";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {reducers} from "./features/pokemon/store/reducers/reducers";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // @ts-ignore
    provideStore({ pokemon: reducers }),
    provideEffects([PokemonsEffects]),
    importProvidersFrom([
      HttpClientModule,
      StoreDevtoolsModule.instrument()
    ]),
  ]
};
