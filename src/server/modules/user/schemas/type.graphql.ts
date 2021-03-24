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
    connections: [NameOnly]
  }

  enum EmploymentStatus {
    EMPLOYED
    OPEN_TO_WORK
    FREELANCER
  }

  type NameOnly {
    firstName: String!
    lastName: String!
    id: String!
  }
`