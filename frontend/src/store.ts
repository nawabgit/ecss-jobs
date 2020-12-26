import * as Redux from "redux";
import axios from "axios";
import thunkMiddleware, { ThunkAction as BaseThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { listingReducer, ListingActions } from "state";

export const api = axios.create({
  baseURL: process.env.NODE_ENV == "production" ? "/api/" : "",
});

const rootReducer = Redux.combineReducers({ listings: listingReducer });

/**
 * The whole shape of our application state
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Union of all supported application actions
 */
export type PlainActions = ListingActions; // add other actions as union

interface ThunkExtra {
  /** Axios instance bound to the API. */
  api: typeof api;
}

/**
 * A thunk returned by a thunk-creator.
 */
export type ThunkAction<R> = BaseThunkAction<
  R | Promise<R>,
  RootState,
  ThunkExtra /* this is the extra argument again */,
  PlainActions
>;

/**
 * Redux store
 */
export const store = Redux.createStore(
  rootReducer,
  composeWithDevTools(
    Redux.applyMiddleware(thunkMiddleware.withExtraArgument({ api }))
  )
);

export default store;
