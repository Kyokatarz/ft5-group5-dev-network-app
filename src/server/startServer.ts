/* eslint @typescript-eslint/no-var-requires: "off" */

import { GraphQLSchema } from 'graphql'
import fs from 'fs'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-micro'

const combineSchemas = (): GraphQLSchema => {
  const schemas: GraphQLSchema[] = []
  const folders = fs.readdirSync('./src/server/modules/')

  folders.forEach((folder) => {
    const { resolvers } = require(`./modules/${folder}/resolvers`)
    const typeDefs = importSchema(
      `./src/server/modules/${folder}/schema.graphql`
    )
    schemas.push(makeExecutableSchema({ typeDefs, resolvers }))
  })

  return mergeSchemas({ schemas })
}

export const startServer = () => {
  const rootSchema = combineSchemas()
  const server = new ApolloServer({ schema: rootSchema })
  return server.createHandler({ path: '/api/v1/graphql' })
}
