import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    getUserById(userId: String): User
    getAllUsers: [User]
    searchUsersByName(searchString: String): [User]
    checkCookieAndRetrieveUser: User
    logOut: Boolean
  }
`
