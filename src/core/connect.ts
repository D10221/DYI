import { Component } from "./create-element";
import { Store } from "./nedux";

const connect = <S, A>(store: Store<S, A>) => <PS, PA>(
  selector: (state: S) => Partial<PS>,
  actions: (d: typeof store.dispatch) => PA
) => (
  component: Component<PS & PA>,
) => {
  return (props: Partial<PS & PA>) => {
    const ret = {
      ...selector(store.getState()),
      ...actions(store.dispatch),
      ...props,
    };
    return component(ret as PS & PA);
  };
};

export default connect;
