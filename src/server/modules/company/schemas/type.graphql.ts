import { gql } from 'apollo-server-micro'

export default gql`
  #import Post from '../../postGQL/'
  type Company {
    id: String!
    email: String!
    password: String!
    companyName: String!
    companyDetails: String
    website: String
    contactNumber: String
    jobDescription: String
    address: String
    numOfApplicants: String
    posts: [Post!]
  }

  type Token {
    token: String!
  }
`
