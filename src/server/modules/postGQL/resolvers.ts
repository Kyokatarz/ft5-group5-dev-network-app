import { GraphQLResolver } from '../../types/'
import * as postServices from './services'

export const resolvers: GraphQLResolver = {
  Query: {
    testHello: () => 'Hello',
    getPostById: (_parents: any, _args: any, _context: any) =>
      postServices.getPostById(_args.postId),
  },
  Mutation: {
    deletePost: (_parents: any, _args: any, _context: any) =>
      postServices.deletePost(_context, _args),
  },
}
