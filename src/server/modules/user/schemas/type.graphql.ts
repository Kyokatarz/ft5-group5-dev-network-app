import { gql } from 'apollo-server-micro'

export default gql`
  type User {
    id: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    image: String
    employmentStatus: EmploymentStatus
    company: String
    posts: [Post]
    connections: [ConnectionPopulate]
  }

  enum EmploymentStatus {
    EMPLOYED
    OPEN_TO_WORK
    FREELANCER
  }

  type ConnectionPopulate {
    firstName: String!
    lastName: String!
    id: String!
    company: String
    employmentStatus: EmploymentStatus
  }
`
