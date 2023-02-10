import { combineReducers, applyMiddleware, createStore } from "redux";
import { rootReducer } from "./modules/reducer";
// import logger from 'redux-logger'
import thunkMiddleware from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  base: rootReducer,
});

export const setupStore = createStore(
  combinedReducer,
  applyMiddleware(thunkMiddleware)
);

const makeStore = () => setupStore;
export const storeWrapper = createWrapper(makeStore);

export type AppDispatch = typeof setupStore.dispatch;
