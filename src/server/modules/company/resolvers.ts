import { GraphQLResolver } from '../../../types'
import * as companyServices from './services'

export const resolvers: GraphQLResolver = {
  Query: {
    //Unprotected
    getAllCompanies: () => companyServices.getAllCompanies(),
  },

  Mutation: {
    //Unprotected
    createNewCompany: (_parents, _args, _context) =>
      companyServices.createNewCompany(_args.companyInfo),
    signIn: (_parent, _args, _context) =>
      companyServices.signIn(_args.credentials),
  },
}
