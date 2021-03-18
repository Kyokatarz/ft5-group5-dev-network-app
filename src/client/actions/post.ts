import { Dispatch } from 'react'
import request from 'graphql-request'

import {
  host,
  deletePost,
  deleteComment,
  likeComment,
} from '../helpers/gql-string-factory'
import {
  ADD_COMMENT,
  DELETE_POST,
  Post,
  PostActions,
  SET_INIT_POST,
  DELETE_COMMENT,
  CHANGE_USING_PROPS,
} from '../types'

export const setInitPosts = (posts: Post[]): PostActions => {
  return {
    type: SET_INIT_POST,
    payload: posts,
  }
}

export const deletePostInState = (postId: string): PostActions => {
  return {
    type: DELETE_POST,
    payload: postId,
  }
}

export const addCommentInState = (post: Post): PostActions => {
  return { type: ADD_COMMENT, payload: post }
}

export const deleteCommentInState = (
  postId: string,
  commentId: string
): PostActions => {
  return { type: DELETE_COMMENT, payload: { commentId, postId } }
}

export const changeUsingProps = () => {
  return { type: CHANGE_USING_PROPS }
}

/*---------------------Thunk------------------------------------------------*/
export const sendRequestToDeletePost = (postId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await request(host, deletePost(postId))
      dispatch(deletePostInState(postId))
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
      dispatch(deleteCommentInState(postId, commentId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToLikeComment = (postId: string, commentId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, likeComment(postId, commentId))
    } catch (err) {
      console.error(err)
    }
  }
}
