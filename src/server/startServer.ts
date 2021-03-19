/* eslint @typescript-eslint/no-var-requires: "off" */
import { GraphQLSchema } from 'graphql'
import {
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from 'graphql-tools'
import { ApolloServer } from 'apollo-server-micro'
import dotenv from 'dotenv'
import cookie from 'cookie'

import { connectDb } from './connectDb'

import companyTypeDefs from './modules/company/schemas'
import postTypeDefs from './modules/postGQL/schemas'
import userTypeDefs from './modules/user/schemas'
import companyResolvers from './modules/company/resolvers'
import postResolvers from './modules/postGQL/resolvers'
import userResolvers from './modules/user/resolvers'

import { GraphQLContext } from './types'

dotenv.config()

export const combineSchemas = (): GraphQLSchema => {
  const mergedTypeDefs = mergeTypeDefs([
    companyTypeDefs,
    postTypeDefs,
    userTypeDefs,
  ])

  const mergedResolvers = mergeResolvers([
    companyResolvers,
    postResolvers,
    userResolvers,
  ])

  return makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  })
}

const context = (globalContext: GraphQLContext) => {
  return {
    ...globalContext,
    cookie: cookie.parse(globalContext.req.headers.cookie || ''),
  }
}

export const startServer = () => {
  console.log('Okay')
  const rootSchema = combineSchemas()
  connectDb()
  const server = new ApolloServer({ schema: rootSchema, context: context })
  return server.createHandler({ path: '/api/v1/graphql' })
}
