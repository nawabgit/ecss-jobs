import {
  useSelector as genericUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

import { RootState } from "store";

/**
 * State-aware version of the plain useSelector
 */
const useSelector: TypedUseSelectorHook<RootState> = genericUseSelector;

export default useSelector;
