import {IPokemonApi} from "./IPokemonApi";

export interface IPokemonsApi {
  count: number,
  next: string,
  previous: string,
  results: IPokemonApi[]
}
