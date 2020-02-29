const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const typeDefs = gql`
  scalar Date

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
    title: String!
    releaseDate: Date
    rating: Int
    status: Status
    actor: [Actor!]!
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }

  type Mutation {
    addMovie(title: String, releaseDate: Date, id: ID): [Movie]
  }
`;

const actors = [
  {
    id: "shankara",
    name: "Shankara"
  },
  {
    id: "shambho",
    name: "Shambho"
  }
];

const movies = [
  {
    id: "ashldja",
    title: "Kailash",
    releaseDate: new Date("10-10-1983"),
    rating: 5,
    actor: [
      {
        id: "shambho"
      }
    ]
  },
  {
    id: "uqodhg",
    title: "Shiva Shambho",
    releaseDate: new Date("10-11-1983"),
    rating: 5,
    actor: [
      {
        id: "shankara"
      }
    ]
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
  },

  Movie: {
    actor: (obj, arg, ctx) => {
      const actorIds = obj.actor.map(actor => actor.id);
      return actors.filter(actor => actorIds.includes(actor.id));
    }
  },

  Mutation: {
    addMovie: (obj, { id, title, releaseDate }, ctx) => {
      const newMoviesList = [
        ...movies,
        // new movie data
        { id, title, releaseDate }
      ];
      return newMoviesList;
    }
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "it's a date",
    parseValue(value) {
      // value from the client
      return new Date(value);
    },
    serialize(value) {
      // value sent to the client
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
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
