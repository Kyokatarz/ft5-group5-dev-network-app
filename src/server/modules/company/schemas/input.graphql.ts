import { gql } from 'apollo-server-micro'

export default gql`
  input CompanyInfo {
    email: String!
    password: String!
    companyName: String!
  }

  input Credentials {
    email: String!
    password: String!
  }

  input newCompanyDetails {
    companyName: String
    contactNumber: String
    companyDetails: String
    address: String
    website: String
  }
`
