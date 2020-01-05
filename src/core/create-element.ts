//
export type Optional<T> = T | null | undefined | false;
//
export type Props<T extends {} = {}> = T & {
  children?: Optional<Optional<VElement>[]>;
};
//
export type Component<T> = (props: Props<T>) => any;
//
type KeyMap<T> = {
  [key in keyof T]: T[key];
};
//
export class VElement<T extends {} = {}> {
  constructor(public type: string | Function, public props: Props<T>) {
    // ...
  }
}
// exclude children from P ?
type CreateFunElement = <
  P extends {} = {},
  F extends Component<P> = Component<P>
>(
  func: F,
  props: P,
  ...children: VElement[]
) => VElement;
//
export type CreateDomElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: Partial<KeyMap<HTMLElementTagNameMap[K]>>,
  ...children: VElement[]
) => VElement;
//
type CreateElement = CreateDomElement & CreateFunElement;
//
enum UITYPE {
  TEXT_ELEMENT = "TEXT_ELEMENT",
}
//
export class VTextElement extends VElement<{}> {
  constructor(public value: string) {
    super(UITYPE.TEXT_ELEMENT, { children: [] });
  }
}
//
const flatMap = (arr: any[]): any[] => {
  return arr.reduce((o, n) => {
    const x = Array.isArray(n) ? flatMap(n) : [n];
    return [...o, ...x];
  }, []);
};
//
function toElement(el: any) {
  const ret =
    el instanceof VElement
      ? el
      : typeof el === "string"
      ? new VTextElement(el)
      : null;
  if (ret === null) throw new Error(`Expected a ${"UIElement|string"} instead of a ${typeof el}`);
  return ret;
}
//
function Children(children: VElement[]) {
  return flatMap(children)
    .filter(Boolean)
    .map(toElement);
}
//
const createFunElement: CreateFunElement = (component, props, ...children) => {
  if (typeof component !== "function")
    throw new Error(
      `Expected a ${"function"} instead of a ${typeof component}`,
    );
  return component({
    ...props,
    children: Children(children),
  });
};
//
const createDomElement: CreateDomElement = (tagName, props, ...children) => {
  if (typeof tagName !== "string")
    throw new Error(`Expected a ${"string"} instead of a ${typeof tagName}`);
  return new VElement(tagName, { ...props, children: Children(children) });
};
//
const createElement: CreateElement = (
  tagName: any,
  props: any,
  ...children: any[]
) => {
  if (typeof tagName === "string")
    return createDomElement(
      tagName as keyof HTMLElementTagNameMap,
      props,
      ...children,
    );
  else if (typeof tagName === "function")
    return createFunElement(tagName, props, ...children);
  throw new Error(`Expected a ${"function|string"} instead of a ${typeof tagName}`);
};
export default createElement;
