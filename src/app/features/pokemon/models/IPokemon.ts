export interface IPokemon {
  name: string;
  id: number;
  abilities?: IPokemonAbilities[];
  base_experience?: number;
  // game_indices?: object[];
  height?: number;
  // held_items?: object[];
  is_default?: boolean;
  // location_area_encounters?: string;
  // moves?: object[];
  order?: number;
  // past_abilities?: object[];
  // past_types?: object[];
  // species?: object;
  sprites?: IPokemonSprites;
  // stats?: object[];
  // types?: object[];
  weight?: number;
}

export interface IPokemonAbilities {
  ability: IPokemonAbility,
  is_hidden: boolean,
  slot: number
}

export interface IPokemonAbility {
  name: string,
  url: string
}

export interface IPokemonSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: object;
  versions: object;
}



