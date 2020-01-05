import express from "express";
import { resolve } from "path";
import things from "./api/things.js";
import ssr from "./ssr.js";
const app = express();
const cwd = process.cwd();

// note: index.html is not mapped
app.get("/", ssr ) //server index.html 
app.use("/", express.static(resolve(cwd, "public"))); // server favicon and css
/** serve built client files (js) */
app.use("/build", express.static(resolve(cwd, "build"))); //
/**
 * let static middleware resolve index.js & .js 
 * usefull when importing/serving from 'node_modules/'
 */
const jsStaticOptions = {
  index: ["index.js"],
  redirect: true,
  extensions: ["js"],
};
app.use("/node_modules", express.static(resolve(cwd, "node_modules"), jsStaticOptions));
// serve some data
app.get("/api/things", things);

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, err => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(`Listening: ${HOST}:${PORT}`);
});
