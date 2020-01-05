import {
  VElement,
  Optional,
  VTextElement,
} from "./create-element.js";

function safeChildren(children: Optional<Optional<VElement>[]>): VElement[] {
  return !children || !children.length
    ? []
    : (children.filter(Boolean) as VElement[]);
}

const toProps = (props: any) => (key: any) => `${key}=${(props as any)[key]}`;

function toNode(el: VElement): string {
  if (!el) throw new Error(`element='${el}' is not optional`);
  // ...
  if (el instanceof VTextElement) return el.value;
  if (el instanceof VElement) {
    const { children, ...props } = el.props;
    const atts = Object.keys(props)
      .map(toProps(props))
      .reduce((a, b) => a + " " + b, "");//
    return `<${el.type} ${atts}>${safeChildren(children)
      .map(toNode)
      .reduce((a, b) => a + b, "")}</${el.type}>`;
  }
  // ...
  throw new Error(`Can't render ${el}`);
}

export default function render(el: VElement): any {
  if (el instanceof Promise) {
    return el.then(x => render(x));
  }
  return toNode(el);
}
