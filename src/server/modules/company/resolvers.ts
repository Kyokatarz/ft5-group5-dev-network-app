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
    signInCompany: (_parent, _args, _context) =>
      companyServices.signInCompany(_args.credentials),
    updateCompanyInfo: (_parent, _args, _context) =>
      companyServices.updateCompanyInfo(
        _args.companyId,
        _args.newCompanyDetails
      ),
    companyCreatePost: (_parent, _args, _context) =>
      companyServices.companyCreatePost(_args.companyId, _args.postContent),
    companyLikesPost: (_parent, _args, _context) =>
      companyServices.CompanyLikesPost(_args.companyId, _args.postId),
  },
}
