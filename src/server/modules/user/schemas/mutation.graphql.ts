import { gql } from 'apollo-server-micro'

export default gql`
  type Mutation {
    signupUser(user: UserSignupInput): User!
    loginUser(user: UserLoginInput): User!
    logoutUser: String
    updateUserProfile(update: UserUpdateProfileInput): User!
    forgotPassword(email: String!): String
    userCreatePost(postContent: String): Post!
    userLikePost(postId: String): Post!
    userCreateComment(commentObj: UserCreateCommentInput): Post! # not sure about that cause we need postId as well
    connectToAnotherUser: String # todo
    disconnectFromAnotherUser: String # todo
    testCookie: String
  }
`
