import { gql } from 'apollo-server-micro'

export default gql`
  type Mutation {
    deletePost(postId: String): Post!
    deleteComment(postId: String, commentId: String): Post!
    likeComment(postId: String, commentId: String): Post!
  }
`
