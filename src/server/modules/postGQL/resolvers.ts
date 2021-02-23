import { GraphQLResolver } from '../../types/'
import * as postServices from './services'

export const resolvers: GraphQLResolver = {
  Query: {
    testHello: () => 'Hello',
  },
  Mutation: {
    deletePost: (_parents: any, _args: any, _context: any) =>
      postServices.deletePost(_context, _args),

    deleteComment: (_parents: any, _args: any, _context: any) =>
      postServices.deleteComment(_context, _args),
  },
}
