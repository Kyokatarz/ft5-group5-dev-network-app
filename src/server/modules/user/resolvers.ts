import * as services from './services'
import { UserDocument } from '../../models/User'
import { GraphQLContext, GraphQLResolver } from '../../types'

//User resolver
export const resolvers: GraphQLResolver = {
  Query: {
    getUserById: (_parents, _args, _context): Promise<UserDocument> =>
      services.getUserById(_args.userId),
    getAllUsers: (): Promise<UserDocument[]> => services.getAllUsers(),
    checkCookieAndRetrieveUser: (_, _args, _context) =>
      services.checkCookieAndRetrieveUser(_context),
    logOut: (_, _args, _context) => services.logOut(_context),

    searchUsersByName: (_, _args) =>
      services.searchUsersByName(_args.searchString),
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

    userCreateComment: (_, _args, _context: GraphQLContext) =>
      services.userCreateComment(_context, _args.commentObj),

    userLikePost: (_, _args, _context: GraphQLContext) =>
      services.userLikePost(_context, _args.postId),

    testCookie: (_, _args, _context: GraphQLContext) => {
      console.log('Heare', _context.cookie)
    },
  },
}
