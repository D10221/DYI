/** @jsx createElement */

type RouteMatch = (localtion: Location) => boolean;

/** */
export function matchHash(expected: string | ((x: string) => boolean) | RegExp) {
  return (location: Location) => {
    if (typeof expected === "string") return location.hash === expected;
    if (expected instanceof RegExp) return expected.test(location.hash);
    if (typeof expected === "function") return expected(location.hash);
    throw new Error(`Expected <Function|RegExp|string> instead of ${expected}`)
  };
}
/** return nothing if location doesn't match provided matcher*/
const Route = (props: { children?: any[]; match: RouteMatch }) => {
  const { match, children } = props;
  if (!Array.isArray(children) || !children.length)
    throw new Error("No Children");
  if (children.length > 1)
    throw new Error("Too many children , should be 1 (one)");
  return !match(location) ? null : children[0];
};

export default Route;
