/* eslint @typescript-eslint/no-var-requires: "off" */
import { combineSchemas } from '../src/server/startServer'
import { ApolloServer } from 'apollo-server-micro'
import dotenv from 'dotenv'
import { GraphQLContext } from '../src/server/types'
import cookie from 'cookie'

dotenv.config()

const rootSchema = combineSchemas()

type mockContext = {
  cookie: {
    [key: string]: any
  }
}

const defaultContext: mockContext = {
  cookie: {},
}

export const createMockServer = (context = defaultContext) => {
  return new ApolloServer({
    schema: rootSchema,
    context: context,
  })
}
