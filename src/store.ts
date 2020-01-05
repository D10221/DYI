import CreateStore, { CombineReducers } from "./core/nedux.js";
import Thunk from "./core/thunk.js";

import * as appStore from "./app/store.js";

const state = { [appStore.STORE_KEY]: appStore.defaultState };

const reducers = {
  [appStore.STORE_KEY]: appStore.reducer,
};
const middleware = [Thunk()];
/** */
const store = CreateStore(state, CombineReducers(reducers), middleware);

export default store;
