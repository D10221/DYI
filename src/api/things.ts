import { RequestHandler } from "express";
export interface Thing {
    name: string;
    index: number;
}
/** */
const things: RequestHandler = (req, res, next) => {
  function fmt(i: number) {
    return i < 10 ? `0${i}` : i;
  }
  try {
    const things: any = [];
    for (let i = 0; i < 10; i++) {
      things.push({
        index: i,
        name: `Thing#(${fmt(i)})`,
      });
    }
    res.json(things);
  } catch (error) {
    next(error);
  }
};
export default things;
