import { Action } from "redux";

export interface ModalAction extends Action {
  type: string;
  modalView: boolean;
  viewId: number;
  selectId: number;
}

export interface ModalActionFailure extends Action {
  type: string;
  err: string;
  id: string;
}

export function initalCardState(): any {
  return {
    modalView: false,
    viewId: 0,
    selectId: 1,
    isFetching: false,
    isloading: false,
  };
}

export function modalReducer(
  state: any = initalCardState(),
  action: ModalAction
) {
  switch (action.type) {
    case "modal/open":
      return {
        ...state,
        modalView: true,
        viewId: action.viewId,
      };
    case "modal/close":
      return {
        ...state,
        modalView: false,
      };
    case "modal/dataget":
      return {
        ...state,
        isFetching: false,
      };
    case "modal/selectId":
      return {
        ...state,
        selectId: action.selectId,
      };
    default:
      return state;
  }
}
