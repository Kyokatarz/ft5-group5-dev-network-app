import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    testHello: String
    getPostById(postId: String): Post!
  }
`
