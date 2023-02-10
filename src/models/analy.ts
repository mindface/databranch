export interface Card {
  id: number;
  name: string;
  x: number;
  y: number;
  content: string;
  contentId: string;
}

export interface Cards {
  type: string;
  cards: Card[];
  card: Card | object;
  setId: string;
}

export interface CardState {
  type: string;
  cards: Card[];
  card: Card | object;
  setId: string;
  deleteId: string;
}

export interface Card01 {
  category: string;
  valueS1: number;
  value1: number[];
  value2: number[];
  value3: number[];
}

export interface Card02 {
  ability1: string;
  value1: number;
  value2: number[];
}

export interface Card03 {
  category: string;
  value1: number;
  value2: number;
  value3: number;
}

export interface Card04 {
  category: string;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
}

export interface Card05 {
  value1: number;
  value2: number;
  value3: number;
}

export interface Card06 {
  value1: number;
  value2: string;
}

export interface AnalyData {
  id?: number;
  created_at?: string;
  updated_at?: string;
  card01_category: string;
  card01_value_s1: number;
  card01_value1: number[];
  card01_value2: number[];
  card01_value3: number[];

  card02_ability1: string;
  card02_value1: number;
  card02_value2: number[];

  card03_category: string;
  card03_value1: number;
  card03_value2: number;
  card03_value3: number;

  card04_category: string;
  card04_value1: number;
  card04_value2: number;
  card04_value3: number;

  card05_value1: number;
  card05_value2: number;
  card05_value3: number;

  card06_value1: number;
  card06_value2: string;
}

export interface SendAnalyData {
  id?: number;
  created_at?: string;
  updated_at?: string;
  card01_category: string;
  card01_value_s1: number;
  card01_value1: string;
  card01_value2: string;
  card01_value3: string;

  card02_ability1: string;
  card02_value1: number;
  card02_value2: string;

  card03_category: string;
  card03_value1: number;
  card03_value2: number;
  card03_value3: number;

  card04_category: string;
  card04_value1: number;
  card04_value2: number;
  card04_value3: number;

  card05_value1: number;
  card05_value2: number;
  card05_value3: number;

  card06_value1: number;
  card06_value2: string;
}
