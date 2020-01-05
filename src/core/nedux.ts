/** Nedux Not est Redux */
type Subscriber = () => any;

type Unsubscribe = () => any;

type Subscribe = (subscriber: Subscriber) => Unsubscribe;

export type Action = {
  type?: string;
  payload?: any;
  error?: any;
}

export type Dispatch<A extends Action = Action> = (action: A) => A;

export type Store<S extends {} = {} , A extends Action = Action> = {
  getState: () => S;
  dispatch: Dispatch<A>;
  subscribe: Subscribe;
};

export type Middleware<S extends {} = {}, A extends Action = Action> = (
  store: Store<S, A>,
) => (next: Dispatch<A>) => (action: A) => A;

export type Reducer<S extends {} = {}, A extends Action = Action> = (
  state: S,
  action: A,
) => S;

export type ReducerMap<S extends {} = {}, A extends Action = Action> = {
  [key in keyof S]: Reducer<S[key], A>;
};

type IndexerOf<T> = {
  [K in keyof T & string]: T[K];
};

const INIT = "@@INIT";

const Keys = <T, K extends keyof T & string>(x: T) => Object.keys(x) as K[];

export const CombineReducers = <S extends {} = {}, A extends Action = Action>(
  reducerMap: ReducerMap<S, A>,
): Reducer<S, A> => {
  return (state: S, action: A) => {
    for (let key of Keys(reducerMap) as (keyof S)[]) {
      state = {
        ...state,
        [key]: reducerMap[key](state[key], action),
      };
    }
    return state;
  };
};
/** */
const Store = <S extends {} = {}, A extends Action = Action>(
  state: S,
  reducer: Reducer<S, A>,
): Store<S, A> => {
  const getState = () => {
    return state;
  };
  //
  const dispatch: Dispatch<A> = action => {
    if (!action || !(action as any).type ) {
      console.warn(`Unpected action '${action}', missing middleware?`)
      return action;
    }        
    if (action instanceof Function) {
      console.warn("Did you forgett a middleware? ");
    }
    state = reducer(state, action);
    for (let subs of subscribers) {
      subs();
    }
    return action;
  };

  let subscribers: Subscriber[] = [];

  const subscribe = (subscriber: Subscriber) => {
    subscribers = [...subscribers, subscriber];
    return () => {
      subscribers = subscribers.filter(s => s != subscriber);
    };
  };

  dispatch({ type: INIT } as A);

  return {
    dispatch,
    getState,
    subscribe,
  };
};

/** */
export default <S extends IndexerOf<S> = {}, A extends Action = Action>(
  defaultState: S,
  reducer: Reducer<S, A>,
  middlewares: Middleware<S, A>[] = [],
) => {
  const store = Store(defaultState, reducer);
  if (middlewares && middlewares.length) {
    const dispatch = middlewares
      .map(m => m(store)(store.dispatch))
      .reduce((o, d) => action => o(d(action)));

    return {
      ...store,
      dispatch,
    };
  }
  return store;
};
