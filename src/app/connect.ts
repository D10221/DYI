import connect from "../core/connect.js";
import { selector, actions } from "./store.js";
import bindActions from "../core/bindActions.js";
import store from "../store.js";
export default connect(store)(selector, bindActions(actions))