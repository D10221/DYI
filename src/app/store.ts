import { Action } from "../core/nedux.js";
import { Dispatch }from "../core/thunk.js";
import { Thing } from "../api/things.js";

export const STORE_KEY = "@app";
//
export const actionTypes = {
  SET_MESSAGE: `${STORE_KEY}/SET_MESSAGE`,
  FETCH_START: `${STORE_KEY}/FETCH_START`,
  FETCH_COMPLETED: `${STORE_KEY}/FETCH_COMPLETED`,
};
//
export const defaultState = {
  message: "",
  busy: false,
  error: undefined as any,
  things: [] as Thing [],
};
//
export type State = typeof defaultState;
//
export const reducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case actionTypes.FETCH_START: {
      return {
        ...state,
        busy: true,
        error: undefined,
      };
    }
    case actionTypes.FETCH_COMPLETED: {
      const done = {
        ...state,
        busy: false,
      };
      const result =
        action.payload instanceof Error
          ? {
              error: action.payload.message,
            }
          : {
              things: action.payload,
              error: undefined,
            };
      const final = {
        ...state,
        ...done,
        ...result,
      };
      return final;
    }
    default:
      return state;
  }
};
//
export const actions = {
  setMessage: (message: string): Action => ({
    type: actionTypes.SET_MESSAGE,
    payload: message,
  }),
  fetchStart: () => ({ type: actionTypes.FETCH_START }),
  fetchCompleted: (payload: any) => ({
    type: actionTypes.FETCH_COMPLETED,
    payload,
  }),
  // ... Thunk
  pre: () => async (dispatch: Dispatch, getState: () => any) => {
    const { busy, things, error } = selector(getState());
    if (busy || !!error || (things && things.length > 0)) {
      return;
    }
    try {
      dispatch(actions.fetchStart());
      console.log("fetching");
      const r = await fetch("/api/things");
      if (!r.ok) {
        throw new Error(`${r.statusText} (${r.status})`);
      } else {
        console.log("api/:ok");
        const result = await r.json();
        dispatch(actions.fetchCompleted(result));
      }
    } catch (error) {
      dispatch(actions.fetchCompleted(error));
    }
  },
};
export type Actions = typeof actions;
export const selector = (state: any) => state[STORE_KEY] as State;
