/** @jsx createElement */
import App from "./app/index.js";
import createElement from "./core/create-element.js";
import Render from "./core/render.js";
import store from "./store.js";

const render = () => {
  Render(
    <App>
      <pre >
        {JSON.stringify(store.getState(), null, 2)}
      </pre>
    </App>,
    document.getElementById("root")!,
  );
};

render();
store.subscribe(render);
window.addEventListener("popstate", _ => render());
