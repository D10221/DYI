/** @jsx createElement */
import { RequestHandler } from "express";
import createElement from "./core/create-element.js";
import render from "./core/render-to-string.js";

const handler: RequestHandler = (req, res, next) => {
  try {
    res.type("html");
    res.send(
      render(
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>My APP</title>
            <meta name="description" content="" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="favicon.ico" />
            <link rel="stylesheet" href="index.css" />
            <script src="build/index.js" type="module"></script>     
          </head>
          <body><div id="root"/></body>
          <footer>
            SSR: footer
          </footer>
        </html>,
      ),
    );
  } catch (error) {
    next(error);
  }
};
export default handler;
