const { ApolloServer } = require("apollo-server-lambda");
const neo4j = require("neo4j-driver");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const fs = require("fs");

// The schema.graphql file is copied to this directory as part of the Netlify build process
// see netlify.toml at project root
const typeDefs = fs
  .readFileSync(require.resolve("./schema.graphql"))
  .toString("utf-8");

const neoSchema = new Neo4jGraphQL({
  typeDefs,
});

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const server = new ApolloServer({
  schema: neoSchema.schema,
  context: ({ event }) => {
    return {
      driver,
      driverConfig: { database: process.env.NEO4J_DATABASE },
    };
  },
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
