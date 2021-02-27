import { Dispatch } from 'react'
import request from 'graphql-request'
import {
  host,
  deletePost,
  deleteComment,
  likeComment,
} from '../helpers/gql-string-factory'

export const sendRequestToDeletePost = (postId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await request(host, deletePost(postId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToDeleteComment = (
  postId: string,
  commentId: string
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await request(host, deleteComment(postId, commentId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToLikeComment = (postId: string, commentId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, likeComment(postId, commentId))
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
  }
}
