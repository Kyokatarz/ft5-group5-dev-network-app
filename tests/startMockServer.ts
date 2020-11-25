/* eslint @typescript-eslint/no-var-requires: "off" */
import { combineSchemas } from '../src/server/startServer'
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'

dotenv.config()
const rootSchema = combineSchemas()
const server = new ApolloServer({ schema: rootSchema, mocks: true })

export const startMockServer = async () => {
  const { url } = await server.listen()
}
export const stopMockServer = async () => {
  await server.stop()
}
