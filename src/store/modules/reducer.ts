import { combineReducers } from "redux";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import * as post from "./data_action/post";
import * as card from "./data_action/card";
import * as analy from "./data_action/analy";
import * as modal from "./data_action/modal";
import * as user from "./data_action/user";
import * as dictio from "./data_action/dictio";
import * as ability from "./data_action/ability";

import * as PostsModels from "../../models/Posts";
import * as ModalModels from "../../models/modal";
import { Ability, AbilityState } from "../../models/ability";
import { CardState } from "../../models/analy";

export interface RootStore {
  post: {
    isFetching: boolean;
    postItems: PostsModels.Posts[];
  };
  card: CardState;
  modal: ModalModels.Modals;
  analy: analy.analyState;
  user: user.UserState;
  dictio: dictio.DictioState;
  ability: AbilityState;
}

export const reducers = combineReducers({
  post: post.postReducer,
  card: card.cardReducer,
  modal: modal.modalReducer,
  analy: analy.analyReducer,
  user: user.userReducer,
  dictio: dictio.dictioReducer,
  ability: ability.abilityReducer
});

export const rootReducer = (state: RootStore | undefined, action: any) => {
  if (action?.type === "") {
    state = undefined;
  }
  return reducers(state, action);
};

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector;
