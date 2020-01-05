/** @jsx createElement */
import createElement, { Component } from "../core/create-element.js";
import { Actions, State } from "./store.js";
import InputBox from "../components/imput-box.js";
import Route, { matchHash } from "../core/router.js";
import Nav from "./nav.js";

const links = [
  { href: "./", label: "Root" },
  { href: "./#", label: "Home" },
  { href: "./#input", label: "Input" },
  { href: "./#click", label: "Click" },
  { href: "./#things", label: "things" },  
];
const App: Component<State & Actions> = async ({
  message,
  things,
  busy,
  error,
  children,
  setMessage,
  pre,
}) => {

  ((pre() as any) as Promise<any>).then((x: any) => {
    console.log("dispatch(async thunk) => ", x);
  }); // FixMe: Dispatch definition

  return (
    <div className="flex column" style="padding: 1rem">
      <div className="flex row">
        <Nav links={links} />
      </div>
      <div className="flex column" style="margin: 1rem">
        <Route match={matchHash("#input")}>
          <div className="flex row">
            <InputBox
              onChange={e =>
                e && e.target && setMessage((e.target as any).value)
              }
              message={message}
              label="Input Box"
            />
          </div>
        </Route>
        <Route match={matchHash("#click")}>
          <div className="flex row">
            <button className="btn" onclick={() => setMessage(message + "!")}>
              Click
            </button>
          </div>
        </Route>
        <Route match={location => location.pathname.endsWith("/") && location.hash === ""}>
          <span>Root</span>
        </Route>
        <Route match={x => x.href.endsWith("#")}>
          <span>HOME</span>
        </Route>
        <Route match={matchHash("#things")}>
          <div className="flex column">
            <ul>
              {things.map(x => (
                <li style="margin-left: 0.5rem">{x.name}</li>
              ))}
            </ul>
          </div>
        </Route>
      </div>
      <div className="flex row">{busy ? "...busy" : ""}</div>
      <div className="flex col" style="margin: 1rem;">
        {children}
      </div>
    </div>
  );
};

export default App;
