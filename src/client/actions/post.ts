import { Dispatch } from 'react'
import request from 'graphql-request'
import { host, deletePost, deleteComment } from '../helpers/gql-string-factory'

export const sendRequestToDeletePost = (postId: string) => {
  return (dispatch: Dispatch<any>) => {
    try {
      request(host, deletePost(postId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToDeleteComment = (
  postId: string,
  commentId: string
) => {
  return (dispatch: Dispatch<any>) => {
    try {
      request(host, deleteComment(postId, commentId))
    } catch (err) {
      console.error(err)
    }
  }
}
