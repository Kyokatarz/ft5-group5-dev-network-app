import { gql } from 'apollo-server-micro'

export default gql`
  type Post {
    id: String!
    content: String!
    date: String!
    likes: [String]
    comments: [Comment]
  }

  type LikedUser {
    firstName: String!
    lastName: String!
  }

  type Comment {
    id: String!
    user: CommentUser
    content: String!
    likes: [String]
  }

  type CommentUser {
    id: String!
    firstName: String!
    lastName: String!
  }
`