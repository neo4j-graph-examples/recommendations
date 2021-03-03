const { ApolloServer } = require("apollo-server-lambda");
const neo4j = require("neo4j-driver");
const { Neo4jGraphQL } = require("@neo4j/graphql");

const typeDefs = /* GraphQL */ `
  type Movie {
    budget: Int
    countries: [String]
    imdbId: ID
    imdbRating: Float
    imdbVotes: Int
    languages: [String]
    movieId: ID!
    plot: String
    poster: String
    released: String
    revenue: Int
    runtime: Int
    title: String
    tmdbId: String
    url: String
    year: String
    genres: [Genre] @relationship(type: "IN_GENRE", direction: "OUT")
  }

  type Genre {
    name: String
    movies: [Movie] @relationship(type: "IN_GENRE", direction: "IN")
  }

  type User {
    userId: ID!
    name: String
    rated: [Movie] @relationship(type: "RATED", direction: "OUT")
  }

  type Actor {
    bio: String
    born: Date
    bornIn: String
    died: Date
    imdbIb: String
    name: String
    poster: String
    tmdbId: String
    url: String
    acted_in: [Movie] @relationship(type: "ACTED_IN", direction: "OUT")
    actors: [Actor] @relationship(type: "ACTED_IN", direction: "IN")
    directors: [Director] @relationship(type: "DIRECTED", direction: "IN")
  }

  type Director {
    bio: String
    born: Date
    bornIn: String
    died: Date
    imdbIb: String
    name: String
    poster: String
    tmdbId: String
    url: String
    directed: [Movie] @relationship(type: "DIRECTED", direction: "OUT")
  }
`;

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
