export interface Dictio {
  id?: number;
  user_id?: string;
  name: string;
  body: string;
  disc: string;
  env: string;
  meanlevel: string;
}

export interface GetDictio {
  items: Dictio[];
}

export interface GetFetchDictio {
  items: Dictio[];
}
