import { Action, Dispatch, AnyAction } from "redux";
import { Dictio } from "../../../models/Dictio";
import { FetchApi } from "../../../lib/fetch-api";

export const FETCH_DICTIO_DATA_REQUEST = "FETCH_DICTIO_DATA_REQUEST";
export const FETCH_DICTIO_DATA_SUCCESS = "FETCH_DICTIO_DATA_SUCCESS";
export const FETCH_DICTIO_SUCCESS = "FETCH_DICTIO_SUCCESS";
export const FETCH_DICTIO_DATA_FAILURE = "FETCH_DICTIO_DATA_FAILURE";

export interface DictioState {
  dictios: Dictio[];
  setDictio: Dictio;
}

const fetchApi = new FetchApi();

export function initalDictioState(): DictioState {
  return {
    dictios: [],
    setDictio: {
      name: "",
      body: "",
      disc: "",
      env: "",
      meanlevel: "",
    },
  };
}

export interface DictioAction extends Action {
  type: string;
  isFetching: boolean;
  dictios: Dictio[];
  setDictio: Dictio;
}

export interface FetchDictioAction extends Action {
  type: string;
  dictios?: Dictio[];
  setDictio?: Dictio;
}

export interface DictioActionFailure extends Action {
  type: string;
  err: string;
}

export function dictioReducer(
  state: DictioState = initalDictioState(),
  action: DictioAction
) {
  switch (action.type) {
    case FETCH_DICTIO_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        dictios: [],
      };
    case FETCH_DICTIO_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dictios: action["dictios"],
      };
    case FETCH_DICTIO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        setDictio: action["setDictio"],
      };
    case FETCH_DICTIO_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        dictios: [],
      };
    default:
      return state;
  }
}

export const dictioFetchDataRequest = (): FetchDictioAction => {
  return {
    type: FETCH_DICTIO_DATA_REQUEST,
    dictios: [],
  };
};

export const dictioFetchDataSuccess = (data: Dictio[]): FetchDictioAction => {
  return {
    type: FETCH_DICTIO_DATA_SUCCESS,
    dictios: data,
  };
};

export const dictioFetchSuccess = (data: Dictio): FetchDictioAction => {
  return {
    type: FETCH_DICTIO_SUCCESS,
    setDictio: data,
  };
};

export const dictioFetchDataFailure = (err: string): DictioActionFailure => {
  return {
    type: FETCH_DICTIO_DATA_FAILURE,
    err: err,
  };
};

export const AddDictioData = (sendData: Dictio) => {
  return (
    dispatch: Dispatch<AnyAction>,
    getState: () => { dictio: DictioState }
  ) => {
    dispatch(dictioFetchDataRequest());
    try {
      fetchApi
        .PostFetch<{ dictio: Dictio }>(`http://localhost:3001/api/v1/dictios`, {
          dictio: sendData,
        })
        .then((data) => {
          dispatch<any>(getDictioData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const UpdateDictioData = (sendData: Dictio) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(dictioFetchDataRequest());
    try {
      fetchApi
        .PutFetch<{ dictio: Dictio; id?: number }>(
          `http://localhost:3001/api/v1/dictios`,
          { dictio: sendData, id: sendData.id }
        )
        .then((data) => {
          dispatch<any>(getDictioData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const deleteDictioData = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(dictioFetchDataRequest());
    try {
      fetchApi
        .DeleteFetch(`http://localhost:3001/api/v1/dictios`, id)
        .then((data) => {
          dispatch<any>(getDictioData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const getDictioData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(dictioFetchDataRequest());
    try {
      fetchApi
        .GetFetch<Dictio[]>(`http://localhost:3001/api/v1/dictios/index`)
        .then((data) => {
          dispatch<any>(dictioFetchDataSuccess(data));
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const getDictio = () => {
  return async (dispatch: Dispatch) => {
    dispatch(dictioFetchDataRequest());
    try {
      fetchApi
        .GetFetch<Dictio>(`http://localhost:3001/api/v1/dictios/index`)
        .then((data) => {
          dispatch<any>(dictioFetchSuccess(data));
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};
