import { Dispatch } from 'react'
import request from 'graphql-request'
import { host, deletePost } from '../helpers/gql-string-factory'

export const sendRequestToDeletePost = (postId: string) => {
  return (dispatch: Dispatch<any>) => {
    request(host, deletePost(postId))
  }
}
