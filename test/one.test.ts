import "jest";
/** */
describe("tests", () => {
  it("works", async () => {
    const { chars } = (await import("../src/core/css")).__internal;
    expect(chars).toBe(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    );
  });
});
