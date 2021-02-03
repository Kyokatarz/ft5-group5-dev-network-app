import cookie from 'cookie'

import * as services from './services'
import { UserDocument } from '../../models/User'
import { GraphQLContext, GraphQLResolver } from '../../types'

export const resolvers: GraphQLResolver = {
  Query: {
    getUserById: (_parents, _args, _context): Promise<UserDocument> =>
      services.getUserById(_args.id),
    getAllUsers: (): Promise<UserDocument[]> => services.getAllUsers(),
    checkCookieAndRetrieveUser: (_, _args, _context) =>
      services.checkCookieAndRetrieveUser(_context),
  },

  Mutation: {
    //Unprotected
    signupUser: (_, _args, _context) =>
      services.signupUser(_context, _args.user),
    loginUser: (_, _args, _context) => services.loginUser(_context, _args.user),
    //Protected
    updateUserProfile: (_, _args, _context: GraphQLContext) =>
      services.updateUserProfile(_context, _args.update),
    userCreatePost: (_, _args, _context: GraphQLContext) =>
      services.userCreatePost(_context, _args.postContent),
    userDeletePost: (_, _args, _context: GraphQLContext) =>
      services.userDeletePost(_context, _args.postId),
    testCookie: (_, _args, _context: GraphQLContext) => {
      console.log('Heare', _context.cookie)
    },
  },
}
