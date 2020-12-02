import { GraphQLResolver } from '../../../types'
import * as userServices from './services'
import { UserDocument } from '../../models/User'

export const resolvers: GraphQLResolver = {
  Query: {
    getUserById: (_parents, _args, _context): Promise<UserDocument> =>
      userServices.getUserById(_args.id),
    getAllUsers: (): Promise<UserDocument[]> => userServices.getAllUsers(),
  },

  Mutation: {
    signupUser: (_parents, _args, _context) =>
      userServices.signupUser(_args.user.email, _args.user.password, _context),
    loginUser: (_parent, _args, _context) =>
      userServices.loginUser(_args.user.email, _args.user.password, _context),
    updateUserProfile: (_parents, _args, _context) =>
      userServices.updateUserProfile(_args.userId, _args.update),
    userCreatePost: (_parents, _args, _context) =>
      userServices.userCreatePost(_args.userId, _args.postContent),
    userDeletePost: (_parents, _args, _context) =>
      userServices.userDeletePost(_args.userId, _args.postId),
  },
}
