const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID!
    name: String!
  }

  type Movie {
    id: ID!
    title: String
    releaseDate: String
    rating: Int
    status: Status
    actor: [Actor!]!
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`;

const movies = [
  {
    id: "ashldja",
    title: "Kailash",
    releaseDate: "10-10-1983",
    rating: 5
  },
  {
    id: "uqodhg",
    title: "Shiva Shambho",
    releaseDate: "10-11-1983",
    rating: 5,
    actor: {
      id: "asdfjkl;",
      name: "mahadevaya"
    }
  }
];

const resolvers = {
  Query: {
    movies: () => {
      return movies;
    },
    movie: (obj, { id }, ctx, info) => {
      return movies.find(item => item.id === id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Aum Namah Shivaya ${url}`);
});
