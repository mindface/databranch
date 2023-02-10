import { Action, Dispatch, AnyAction } from "redux";
import {
  Ability,
  AbilityState,
} from "../../../models/ability";

import { FetchApi } from "../../../lib/fetch-api";

export const FETCH_ABILITY_DATA_REQUEST = "FETCH_ABILITY_DATA_REQUEST";
export const FETCH_ABILITY_DATA_SUCCESS = "FETCH_ABILITY_DATA_SUCCESS";
export const FETCH_ABILITY_SUCCESS = "FETCH_ABILITY_SUCCESS";
export const FETCH_ABILITY_DATA_FAILURE = "FETCH_ABILITY_DATA_FAILURE";

const fetchApi = new FetchApi();

export function initalAbilityState(): AbilityState {
  return {
    abilityList: [],
    ability: {},
    setId: '',
    deleteId: '',
    isFetching: false
  };
}

export interface AbilityAction extends Action {
  type: string,
  ability?: Ability | object,
  abilityList?: Ability[],
  isFetching?: boolean
}

export interface AbilityActionFailure extends Action {
  type: string;
  err: string;
}

export function abilityReducer(
  state: AbilityState = initalAbilityState(),
  action: AbilityAction
) {
  switch (action.type) {
    case FETCH_ABILITY_DATA_REQUEST:
      return {
        ...state,
        ability: {
          id: -1,
          dataLevel: '',
          infoList: [],
          position: ''
        },
      };
    case FETCH_ABILITY_DATA_SUCCESS:
      return {
        ...state,
        abilityList: action.abilityList ?? [],
      };
    case FETCH_ABILITY_SUCCESS:
      return {
        ...state,
        ability: action.ability ?? {},
      };
    case FETCH_ABILITY_DATA_FAILURE:
      return {
        ...state,
        ability: {
          id: -1,
          dataLevel: '',
          infoList: [],
          position: ''
        }
      };
    default:
      return state;
  }
}

export const abilityFetchDataRequest = (): AbilityAction => {
  return {
    type: FETCH_ABILITY_DATA_REQUEST,
    ability: {},
  };
};

export const abilityFetchDataSuccess = (data: Ability[]): AbilityAction => {
  return {
    type: FETCH_ABILITY_DATA_SUCCESS,
    abilityList: data ?? [],
  };
};

export const abilityFetchSuccess = (data: Ability[]): AbilityAction => {
  return {
    type: FETCH_ABILITY_SUCCESS,
    ability: data ?? {},
  };
};

export const abilityFetchDataFailure = (err: string): AbilityActionFailure => {
  return {
    type: FETCH_ABILITY_DATA_FAILURE,
    err: err,
  };
};


export const getAbilityData = (path:string) => {
  return async (dispatch: Dispatch) => {
    dispatch(abilityFetchDataRequest());
    try {
      fetchApi
        .GetFetch<Ability[]>(path)
        .then((res) => {
          console.log(res)
          const data = res
          dispatch<any>(abilityFetchDataSuccess(data));
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

