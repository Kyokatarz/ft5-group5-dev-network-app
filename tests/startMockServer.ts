/* eslint @typescript-eslint/no-var-requires: "off" */
import { combineSchemas } from '../src/server/startServer'
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'

dotenv.config()
const rootSchema = combineSchemas()
export const server = new ApolloServer({ schema: rootSchema })

export const host = 'http://localhost:4000'

export const startMockServer = async () => {
  await server.listen()
}
export const stopMockServer = async () => {
  await server.stop()
}
