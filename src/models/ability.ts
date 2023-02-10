export interface Ability {
  id: number;
  dataLevel: string;
  infoList: {
    [k:string]: string
  }[];
  position: string[];
}

export interface AbilityState {
  abilityList: Ability[];
  ability: Ability | object;
  setId: string;
  deleteId: string;
  isFetching: boolean;
}
