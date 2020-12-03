import { GraphQLResolver } from '../../../types'
import { CompanyDocument } from '../../models/Company'
import * as companyServices from './services'

export const resolvers: GraphQLResolver = {
  Query: {
    //Unprotected
    getAllCompanies: (): Promise<CompanyDocument[]> =>
      companyServices.getAllCompanies(),
  },

  Mutation: {
    //Protected
    createNewCompany: (_parents, _args, _context) =>
      companyServices.createNewCompany(_args.companyInfo, _context),
    signInCompany: (_parent, _args, _context) =>
      companyServices.signInCompany(_args.credentials, _context),
    updateCompanyInfo: (_parent, _args, _context) =>
      companyServices.updateCompanyInfo(
        _args.companyId,
        _args.newCompanyDetails
      ),
    companyCreatePost: (_parent, _args, _context) =>
      companyServices.companyCreatePost(_args.companyId, _args.postContent),
    companyLikesPost: (_parent, _args, _context) =>
      companyServices.CompanyLikesPost(_args.companyId, _args.postId),
    companyDeletesPost: (_parent, _args, _context) =>
      companyServices.companyDeletesPost,
  },
}
