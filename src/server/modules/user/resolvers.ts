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
      userServices.signupUser(_args.email, _args.password),
    loginUser: (_parent, _args, _context) =>
      userServices.loginUser(_args.email, _args.password),
  },
}
