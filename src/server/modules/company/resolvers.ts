import { CompanyDocument } from '../../models/Company'
import { GraphQLResolver } from '../../types'
import * as companyServices from './services'

const resolvers: GraphQLResolver = {
  Query: {
    getAllCompanies: (): Promise<CompanyDocument[]> =>
      companyServices.getAllCompanies(),
  },

  Mutation: {
    //Unprotected
    createNewCompany: (_parents, _args, _context) =>
      companyServices.createNewCompany(_args.companyInfo, _context),
    signInCompany: (_parent, _args, _context) =>
      companyServices.signInCompany(_args.credentials, _context),
    //Protected
    updateCompanyInfo: (_parent, _args, _context) =>
      companyServices.updateCompanyInfo(_context, _args.newCompanyDetails),
    companyCreatePost: (_parent, _args, _context) =>
      companyServices.companyCreatePost(_context, _args.postContent),
    companyLikesPost: (_parent, _args, _context) =>
      companyServices.CompanyLikesPost(_context, _args.postId),
    companyDeletesPost: (_parent, _args, _context) =>
      companyServices.companyDeletesPost(_context, _args.postId),
  },
}

export default resolvers
