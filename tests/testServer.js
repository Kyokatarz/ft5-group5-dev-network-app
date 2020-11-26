const { ApolloServer, gql } = require('apollo-server')
const { request } = require('graphql-request')

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`

const resolvers = {
  Query: {
    sayHello: () => 'Hello there',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then((thing) => console.log(thing))

const query = gql`
  query {
    sayHello
  }
`

request('http://localhost:4000/', query).then((resp) => console.log(resp))
