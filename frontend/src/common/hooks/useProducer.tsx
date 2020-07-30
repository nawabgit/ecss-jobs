import produce from "immer";
import * as React from "react";
export type Recipe<S, A> = (draft: S, action: A, state: Readonly<S>) => any;

type ExtractRecipeState<R extends Recipe<any, any>> = R extends Recipe<
  infer State,
  any
>
  ? State
  : never;

type ExtractRecipeActions<R extends Recipe<any, any>> = R extends Recipe<
  any,
  infer Actions
>
  ? Actions
  : never;

/**
 * A convenient wrapper around `React.useReducer` which wraps the state into [`immer`](https://github.com/immerjs/immer).
 *
 * Given this state and actions:
 *
 *    interface State {
 *      name: string;
 *      level: number;
 *      coins: number;
 *    }
 *
 *    interface LevelUp {
 *      type: 'character/levelUp';
 *    }
 *
 *    interface Loot {
 *      type: 'character/loot';
 *    }
 *
 *    type Actions = LevelUp | Loot;
 *
 * We can define a recipe and the initial state like this:
 *
 *    const recipe: Recipe<State, Actions> = (draft, action, readOnlyState) => {...};
 *    const initialState: State = {name: '', level: 0, coins: 0}
 *
 * And then use them in the component:
 *
 *    const [state, dispatch] = useProducer(recipe2, initalState);
 *
 * @param recipe recipe for computing the next state
 * @param initialArg initial state (or argument to lazy-initializer)
 * @param init thunk to lazyly initialize the state
 */
function useProducer<R extends Recipe<any, any>, I>(
  recipe: R,
  initialArg: I,
  init?: (arg: I) => ExtractRecipeState<R>
) {
  type State = Readonly<ExtractRecipeState<R>>;
  type Actions = ExtractRecipeActions<R>;
  const reducer: React.Reducer<State, Actions> = React.useMemo(
    () => (state, action) =>
      produce(state, (draft) => recipe(draft, action, state)),
    [recipe]
  );
  return React.useReducer(reducer, initialArg as State, init as undefined);
}

/**
 * A version of `useProducer` that accepts thunks
 *
 * @param recipe
 * @param initialArg
 * @param init
 */
export function useProducerWithThunks<R extends Recipe<any, any>, I>(
  recipe: R,
  initialArg: I,
  init?: (arg: I) => ExtractRecipeState<R>
) {
  type State = Readonly<ExtractRecipeState<R>>;
  type Actions = ExtractRecipeActions<R>;
  type Thunk = (action: React.Dispatch<Actions>) => any;
  type ThunkActions = Thunk | Actions;

  const [state, plainDispatch] = useProducer(recipe, initialArg, init);

  const thunkDispatch = React.useMemo(
    () => (action: ThunkActions) => {
      /**
       * Get the current state for this `useProducer` tree
       */
      if (typeof action === "function") {
        // Cast is necessary because TS resolves `action` as `Thunk | (Function & ExtractRecipeActions<T>)`
        // Not sure why it's doing that
        const thunk = action as Thunk;
        thunk(thunkDispatch);
      } else {
        // Let react handle anything else
        plainDispatch(action);
      }
    },
    [plainDispatch]
  );

  return [state, thunkDispatch] as const;
}

export default useProducer;
