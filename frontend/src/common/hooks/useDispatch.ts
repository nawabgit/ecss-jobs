import { ThunkDispatch } from "redux-thunk";
import { useDispatch as genericUseDispatch } from "react-redux";
import { AxiosInstance } from "axios";

import { RootState, PlainActions } from "store";

/**
 * A state-aware, action-aware and middlware-aware—that's a lot of awarness—version of the plain useDispatch
 */
const useDispatch: () => ThunkDispatch<
  RootState,
  ThunkExtra, // make this an API client, this is the `extra` argument in a thunk
  PlainActions
> = genericUseDispatch;

/**
 * An interface to dispatch to a designated api
 */

interface ThunkExtra {
  api: AxiosInstance;
}

export default useDispatch;
