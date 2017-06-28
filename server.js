const next = require("next");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const fs = require("fs");

// Environment config
const dev = process.env.NODE_ENV !== "production";
const port = dev ? 3000 : 80;

const app = next({ dev });
const handle = app.getRequestHandler();

// GraphQL
const { schema, root } = require("./schema");

// Finally prepare the Next.js app and Express server
app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
    );
    if ("OPTIONS" == req.method) res.sendStatus(200);
    else next();
  });

  server.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: dev
    })
  );

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
});
