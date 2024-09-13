import {createAction, props} from '@ngrx/store';
import { IPokemon } from '../../../../core/models/IPokemon';

export const loadPokemons = createAction('[Items] Load Items');
export const loadPokemonsSuccess = createAction('[Items] Load Items Success', props<{ items: IPokemon[] }>());
export const loadPokemonsFailure = createAction('[Items] Load Items Failure', props<{ error: any }>());
