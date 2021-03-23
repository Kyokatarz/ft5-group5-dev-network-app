import { gql } from 'apollo-server-micro'

export default gql`
  type Mutation {
    connectToAnotherUser(connectingId: String): User!
    disconnectFromAnotherUser(disconnectingId: String): User!
    forgotPassword(email: String!): String
    loginUser(user: UserLoginInput): User!
    logoutUser: String
    signupUser(user: UserSignupInput): User!
    testCookie: String
    updateUserProfile(update: UserUpdateProfileInput): User!
    userCreateComment(commentObj: UserCreateCommentInput): Post!
    userCreatePost(postContent: String): Post!
    userLikePost(postId: String): Post!
  }
`
