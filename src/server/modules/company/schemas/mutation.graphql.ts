import { gql } from 'apollo-server-micro'

export default gql`
  type Mutation {
    createNewCompany(companyInfo: CompanyInfo): Company
    signInCompany(credentials: Credentials): Company
    updateCompanyInfo(newCompanyDetails: newCompanyDetails!): Company
    companyCreatePost(postContent: String): Post!
    companyLikesPost(postId: String): Post!
    companyDeletesPost(postId: String): Post!
  }
`