import {IPokemonAPI} from "./IPokemonAPI";

export interface IPokemonsAPI {
  count: number,
  next: string,
  previous: string,
  results: IPokemonAPI[]
}
