import cookie from 'cookie'

import * as userServices from './services'
import { UserDocument } from '../../models/User'
import { GraphQLResolver } from '../../types'

export const resolvers: GraphQLResolver = {
  Query: {
    getUserById: (_parents, _args, _context): Promise<UserDocument> =>
      userServices.getUserById(_args.id),
    getAllUsers: (): Promise<UserDocument[]> => userServices.getAllUsers(),
  },

  Mutation: {
    //Unprotected
    signupUser: (_, _args, _context) =>
      userServices.signupUser(_args.user.email, _args.user.password, _context),
    loginUser: (_, _args, _context) =>
      userServices.loginUser(_args.user.email, _args.user.password, _context),

    //Protected
    updateUserProfile: (_, _args, _context) =>
      userServices.updateUserProfile(_context, _args.update),
    userCreatePost: (_, _args, _context) =>
      userServices.userCreatePost(_context, _args.postContent),
    userDeletePost: (_, _args, _context) =>
      userServices.userDeletePost(_context, _args.postId),
    testCookie: (_, _args, _context) => {
      console.log('Heare', _context.cookie)
    },
  },
}
