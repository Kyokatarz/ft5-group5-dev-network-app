import { GraphQLResolver } from '../../../types'
import * as postServices from './services'

export const resolvers: GraphQLResolver = {
  Query: {
    testHello: () => 'Hello',
    getPostById: (_parents, _args, _context) =>
      postServices.getPostById(_args.postId),
  },
}
