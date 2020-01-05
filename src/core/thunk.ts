import { Middleware, Dispatch as D, Action } from "./nedux";

type Thunk<S extends {} = {}, A extends Action = Action> = (
  dispatch: Dispatch<S, A>,
  getState: () => S,
) => any;

export type Dispatch<S extends {} = {}, A extends Action = Action> = 
  (actionOrThunk: A | Thunk<S,A> ) => any 

//  Fixme: Middleware signature Action inference
const ThunkMiddleware = (): Middleware<any, any > => {
  // ...
  return store => next =>
    function dispatch(action: any) {
      if (action instanceof Promise) {
        return action.then(dispatch as any);
      }
      if (typeof action === "function") {
        return action(dispatch, store.getState);
      }
      return next(action);
    };
};

export default ThunkMiddleware;
