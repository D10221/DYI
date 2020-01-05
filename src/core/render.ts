import { VElement, Optional, Props, VTextElement } from "./create-element.js";

type StringKey<P> = keyof P & string;
type AnyFunction = (...args: any) => any;

function isString(x: any): x is string {
  return typeof x === "string";
}

const keysof = <T>(target: T) => Object.keys(target) as (keyof T)[];

const stringKeysOf = <T>(t: T, keys: (x: T) => (keyof T)[]) =>
  keys(t).filter(isString) as (keyof T & string)[];

function safeChildren(children: Optional<Optional<VElement>[]>): VElement[] {
  return !children || !children.length
    ? []
    : (children.filter(Boolean) as VElement[]);
}
function isListener(key: string, value: any): value is AnyFunction {
  return (
    typeof key === "string" &&
    key.startsWith("on") &&
    typeof value === "function"
  );
}
interface TEventListener {
  addEventListener(eventKey: string, value: Function): any;
  removeEventListener(eventKey: string, value: Function): any;
}
function isTEventListener(x: any): x is TEventListener {
  return (
    x && isFunction(x.addEventListener) && isFunction(x.removeEventListener)
  );
}

function AddEventListener(
  dom: TEventListener,
  key: string,
  value: AnyFunction,
) {
  const eventKey = key.slice(2);
  dom.addEventListener(eventKey, value);
  return function removeEventListener() {
    dom.removeEventListener(eventKey, value);
    console.log("removeEventListener: %s", key);
  };
}

const mapProp = <DOMElement, P>(dom: DOMElement, props: P) => (
  key: StringKey<P>,
) => {
  const value = props[key];
  if (isListener(key, value) && isTEventListener(dom)) {
    return AddEventListener(dom, key, value);
  }
  Object.assign(dom, { [key]: value });
  return null;
};

function isFunction(f: any): f is Function {
  return typeof f === "function";
}

function filterFunctions(fs: (Function | null | undefined)[]): Function[] {
  return !fs || !fs.length ? [] : fs.filter(isFunction);
}
interface VNode<T> {
  el: T;
  dispose: Function[];
  children: VNode<T>[];
}

type Render<T, DOMElement> = (x: T) => VNode<DOMElement>;

let node: VNode<any> | undefined;

export function Renderer<DOMElement>(
  createElement: (s: string) => DOMElement,
  createTextNode: (s: string) => DOMElement,
  appendChild: (parent: DOMElement, e: DOMElement) => any,
  removeChild: (parent: DOMElement, e: DOMElement) => any,
  childNodes: (el: DOMElement) => DOMElement[],
) {
  const toElementNode: Render<VElement, DOMElement> = el => {
    const { children, ...props } = el.props;
    const dom = createElement(el.type as string);
    const dispose = filterFunctions(
      stringKeysOf(props, keysof).map(mapProp(dom, props)),
    );
    return {
      el: dom,
      dispose,
      children: safeChildren(children).map(toNode),
    };
  };

  const toStringNode: Render<VTextElement, DOMElement> = el => {
    const text = createTextNode(el.value);
    return {
      el: text,
      dispose: [],
      children: [],
    };
  };

  function toNode(el: VElement) {
    if (!el) throw new Error(`element='${el}' is not optional`);
    // ...
    if (el instanceof VTextElement) return toStringNode(el);
    if (el instanceof VElement) return toElementNode(el);
    // ...
    throw new Error(`Can't render ${el}`);
  }

  const build = (node: VNode<DOMElement>) => {
    if (node) {
      if (node.children) {
        for (const ch of node.children) {
          appendChild(node.el, ch.el);
          build(ch);
        }
      }
    }
    return node;
  };

  const dispose = (node: VNode<DOMElement>) => {
    if (node) {
      if (node.dispose) {
        for (const d of node.dispose) {
          d();
        }
      }
      if (node.children) {
        for (const ch of node.children) {
          dispose(ch);
        }
      }
    }
  };
  return function render(el: VElement, parent: DOMElement): any {
    if (el instanceof Promise) {
      return el.then(x => render(x, parent));
    }
    if (node) dispose(node);
    childNodes(parent).forEach(n => removeChild(parent, n));
    node = build(toNode(el));
    appendChild(parent, node.el);
    return node;
  };
}
export default Renderer(
  (tag: string) => document.createElement(tag) as ChildNode,
  (tag: string) => document.createTextNode(tag) as ChildNode,
  (parent: ChildNode, el: ChildNode) => parent.appendChild(el),
  (parent: ChildNode, el: ChildNode) => parent.removeChild(el),
  parent => Array.from(parent.childNodes),
);
