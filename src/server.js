import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev")); // this one keeps taking note! keeps posting!
server.express.use(authenticateJwt); // Every request pass by authenticateJwt

server.start({ port: PORT }, () =>
  console.log(`Server running on https://localhost:${PORT}`)
);
