import { Action, Dispatch, AnyAction } from "redux";
import {
  Card01,
  Card02,
  Card03,
  Card04,
  Card05,
  Card06,
  AnalyData,
  SendAnalyData,
} from "../../../models/analy";
import {
  reCard01,
  reCard02,
  reCard03,
  reCard04,
  reCard05,
  reCard06,
  setAnalyData,
} from "./analySetData";
import { FetchApi } from "../../../lib/fetch-api";

export const FETCH_ANALY_DATA_REQUEST = "FETCH_ANALY_DATA_REQUEST";
export const FETCH_ANALY_DATA_SUCCESS = "FETCH_ANALY_DATA_SUCCESS";
export const FETCH_ANALY_SUCCESS = "FETCH_ANALY_SUCCESS";
export const FETCH_ANALY_DATA_FAILURE = "FETCH_ANALY_DATA_FAILURE";

export interface analyState {
  card01: Card01;
  card02: Card02;
  card03: Card03;
  card04: Card04;
  card05: Card05;
  card06: Card06;
  setAnalies: AnalyData[];
  setAnaly: AnalyData;
}

const fetchApi = new FetchApi();

export function initalAnalyState(): analyState {
  return {
    card01: reCard01,
    card02: reCard02,
    card03: reCard03,
    card04: reCard04,
    card05: reCard05,
    card06: reCard06,
    setAnalies: setAnalyData,
    setAnaly: setAnalyData[0],
  };
}

export interface AnalyAction extends Action {
  type: string;
  card01: Card01;
  card02: Card02;
  card03: Card03;
  card04: Card04;
  card05: Card05;
  card06: Card06;
  setAnalies: AnalyData[];
  setAnaly: AnalyData;
}

export interface FetchAnalyAction extends Action {
  type: string;
  card01?: Card01;
  setAnalies?: AnalyData[];
  setAnaly?: AnalyData;
}

export interface PostActionFailure extends Action {
  type: string;
  err: string;
}

export function analyReducer(
  state: analyState = initalAnalyState(),
  action: AnalyAction
) {
  switch (action.type) {
    case FETCH_ANALY_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        card01: reCard01,
      };
    case FETCH_ANALY_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        setAnalies: action["setAnalies"],
      };
    case FETCH_ANALY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        setAnaly: action["setAnaly"],
      };
    case FETCH_ANALY_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        card01: reCard01,
      };
    case "CARD01":
      return {
        ...state,
        isFetching: false,
        card01: action["card01"],
      };
    case "CARD02":
      return {
        ...state,
        isFetching: false,
        card02: action["card02"],
      };
    case "CARD03":
      return {
        ...state,
        isFetching: false,
        card03: action["card03"],
      };
    case "CARD04":
      return {
        ...state,
        isFetching: false,
        card04: action["card04"],
      };
    case "CARD05":
      return {
        ...state,
        isFetching: false,
        card05: action["card05"],
      };
    case "CARD06":
      return {
        ...state,
        isFetching: false,
        card06: action["card06"],
      };
    default:
      return state;
  }
}

export const analyFetchDataRequest = (): FetchAnalyAction => {
  return {
    type: FETCH_ANALY_DATA_REQUEST,
    card01: reCard01,
  };
};

export const analyFetchDataSuccess = (data: AnalyData[]): FetchAnalyAction => {
  return {
    type: FETCH_ANALY_DATA_SUCCESS,
    setAnalies: data,
  };
};

export const analyFetchSuccess = (data: AnalyData): FetchAnalyAction => {
  return {
    type: FETCH_ANALY_SUCCESS,
    setAnaly: data,
  };
};

export const analyFetchDataFailure = (err: string): PostActionFailure => {
  return {
    type: FETCH_ANALY_DATA_FAILURE,
    err: err,
  };
};

export const AddAnalyData = () => {
  return (
    dispatch: Dispatch<AnyAction>,
    getState: () => { base: { analy: analyState } }
  ) => {
    return new Promise<void>((resolve, eject) => {
      dispatch(analyFetchDataRequest());
      const analy = getState().base.analy;
      const setAnaly = {
        card01_category: analy.card01.category,
        card01_value_s1: analy.card01.valueS1,
        card01_value1: String(analy.card01.value1),
        card01_value2: String(analy.card01.value2),
        card01_value3: String(analy.card01.value3),

        card02_ability1: analy.card02.ability1,
        card02_value1: analy.card02.value1,
        card02_value2: String(analy.card02.value2),

        card03_category: analy.card03.category,
        card03_value1: analy.card03.value1,
        card03_value2: analy.card03.value2,
        card03_value3: analy.card03.value3,

        card04_category: analy.card04.category,
        card04_value1: analy.card04.value1,
        card04_value2: analy.card04.value2,
        card04_value3: analy.card04.value3,

        card05_value1: analy.card05.value1,
        card05_value2: analy.card05.value2,
        card05_value3: analy.card05.value3,

        card06_value1: analy.card06.value1,
        card06_value2: analy.card06.value2,
      };
      try {
        fetchApi
          .PostFetch<{ analy: SendAnalyData }>(
            `http://localhost:3001/api/v1/analy`,
            {
              analy: setAnaly,
            }
          )
          .then((data) => {
            dispatch<any>(getAnalyData());
          });
      } catch (err) {
        console.log(err);
        //  return dispatch(postFetchDataFailure(err))
      }
    });
  };
};

export const UpdateAnalyData = (sendData: AnalyData) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(analyFetchDataRequest());
    try {
      fetchApi
        .PutFetch<{ analy: AnalyData; id?: number }>(
          `http://localhost:3001/api/v1/analy`,
          { analy: sendData, id: sendData.id }
        )
        .then((data) => {
          console.log(data);
          dispatch<any>(getAnalyData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const deleteAnalyData = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(analyFetchDataRequest());
    try {
      fetchApi
        .DeleteFetch(`http://localhost:3001/api/v1/analy`, id)
        .then((data) => {
          dispatch<any>(getAnalyData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const getAnalyData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(analyFetchDataRequest());
    try {
      fetchApi
        .GetFetch<AnalyData[]>(`http://localhost:3001/api/v1/analy/index`)
        .then((res) => {
          const data = res.map((item: any) => {
            const card01_value1 = item.card01_value1.split(",");
            const card01_value2 = item.card01_value2.split(",");
            const card01_value3 = item.card01_value3.split(",");
            const card02_value2 = item.card02_value2.split(",");
            return {
              ...item,
              card01_value1: [
                Number(card01_value1[0]),
                Number(card01_value1[1]),
              ],
              card01_value2: [
                Number(card01_value2[0]),
                Number(card01_value2[1]),
              ],
              card01_value3: [
                Number(card01_value3[0]),
                Number(card01_value3[1]),
              ],
              card02_value2: [
                Number(card02_value2[0]),
                Number(card02_value2[1]),
              ],
            };
          });
          dispatch<any>(analyFetchDataSuccess(data));
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const getAnaly = () => {
  return async (dispatch: Dispatch) => {
    dispatch(analyFetchDataRequest());
    try {
      fetchApi
        .GetFetch<AnalyData>(`http://localhost:3001/api/v1/analy/index`)
        .then((data) => {
          dispatch<any>(analyFetchSuccess(data));
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};
