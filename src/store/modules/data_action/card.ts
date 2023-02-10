import { Action, Dispatch } from "redux";
import { Card, CardState } from "../../../models/analy";

export interface CardAction extends Action {
  type: string;
  card: Card;
  cards: Card[];
  setCard: Card | object;
  setId?: string;
  deleteId: string;
}

export function initalCardState(): CardState {
  return {
    type: "",
    cards: [
      {
        id: 1,
        name: "title",
        x: 20,
        y: 20,
        content: "tetetetet",
        contentId: "1",
      },
      {
        id: 2,
        name: "title",
        x: 40,
        y: 80,
        content: "tetetetet",
        contentId: "2",
      },
    ],
    card: {},
    setId: "0",
    deleteId: "0",
  };
}

export function cardReducer(
  state: any = initalCardState(),
  action: CardAction
) {
  switch (action.type) {
    case "card/add":
      const list = [...state.cards,action.card];
      return {
        ...state,
        cardView: true,
        cards: list,
      };
    case "card/delete":
      const items = state.cards.filter(
        (item: Card) => String(item.id) !== action.deleteId
      );
      return {
        ...state,
        cards: items,
      };
    case "card/setId":
      return {
        ...state,
        setId: action.setId,
      };
    default:
      return state;
  }
}
