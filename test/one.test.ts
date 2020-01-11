import "jest";
/** */
describe("randomName", () => {
  it("works", async () => {
    const { default: randomName, __internal } = await import(
      "../src/core/randomName"
    );
    const { chars } = __internal;
    expect(chars).toBe(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    );
    const aName = randomName();
    expect(/^[a-zA-Z][a-zA-Z0-9]+$/.test(aName)).toBe(true); //is alphanumeric, starts with Aplha
    expect(aName.length).toBe(10);
    expect(randomName(11).length).toBe(11);
  });
});
function findStyle(style: string): HTMLElement | undefined {
  for (let i = 0; i < document.head.childNodes.length; i++) {
    const e = document.head.childNodes.item(i);
    if (e && style === (e as HTMLElement).innerHTML) {
      return e as HTMLElement;
    }
  }
  return undefined;
}
describe("css", () => {
  it("works", async () => {
    const { default: randomName, __internal } = await import(
      "../src/core/randomName"
    );
    const { default: createStyle } = await import("../src/core/css");
    const name = randomName();
    const style = "color: red;";
    const dispose = createStyle(style, name);
    const namedStyle = `.${name} {${style}}`;
    const e = findStyle(namedStyle);
    expect(e).not.toBeUndefined();
    expect(e!.innerHTML).toBe(namedStyle);
    dispose();
    expect(findStyle(`${name}.${style}`)).toBeUndefined();
  });
});
