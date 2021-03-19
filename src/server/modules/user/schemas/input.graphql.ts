import { gql } from 'apollo-server-micro'

export default gql`
  input UserSignupInput {
    email: String!
    password: String!
    lastName: String
    firstName: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserUpdateProfileInput {
    email: String
    firstName: String
    lastName: String
    image: String
    employmentStatus: EmploymentStatus
    company: String
  }

  input UserCreateCommentInput {
    postId: String!
    content: String!
  }
`
