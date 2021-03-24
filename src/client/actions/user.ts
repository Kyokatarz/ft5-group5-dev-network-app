import { Dispatch } from 'react'
import request from 'graphql-request'

import {
  ADD_POST,
  LOGIN,
  LOGOUT,
  Post,
  SET_CONNECTIONS,
  UserActions,
  UserProfile,
} from '../types'
import {
  checkCookie,
  host,
  logInUser,
  signupUser,
  userCreateComment,
  userCreatePost,
  userLikePost,
  logOut,
  updateUserProfile,
  connectToAnotherUser,
  disconnectFromAnotherUser,
} from '../helpers/gql-string-factory'
import { NextRouter } from 'next/router'
import { addCommentInState } from './post'

export const signUserIn = (payload: UserProfile): UserActions => {
  return {
    type: LOGIN,
    payload: payload,
  }
}

export const signUserOut = (): UserActions => {
  return {
    type: LOGOUT,
  }
}

export const userAddPost = (post: Post) => {
  return {
    type: ADD_POST,
    payload: post,
  }
}

export const setConnectionsInState = (connections: Partial<UserProfile>[]) => {
  return {
    type: SET_CONNECTIONS,
    payload: connections,
  }
}
/*---------------------Thunk------------------------------------------------*/
export const sendRequestToSignUserIn = (
  email: string,
  password: string,
  router: NextRouter
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, logInUser(email, password))
      dispatch(signUserIn(resp.loginUser))

      const userId = resp.loginUser.id
      router.push(`/profile/${userId}`)
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToSignUserUp = (
  email: string,
  password: string,
  lastName: string,
  firstName: string,
  router: NextRouter
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(
        host,
        signupUser(email, password, lastName, firstName)
      )
      dispatch(signUserIn(resp.signupUser))
      const userId = resp.signupUser.id
      router.push(`/profile/${userId}`)
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
  }
}

export const requestCheckCookie = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, checkCookie())
      dispatch(signUserIn(resp.checkCookieAndRetrieveUser))
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
  }
}

export const requestUserCreatePost = (content: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, userCreatePost(content))
      console.log(resp)
      dispatch(userAddPost(resp.userCreatePost))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToLikePost = (postId: string) => {
  return async () => {
    try {
      const resp = await request(host, userLikePost(postId))
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToComment = (postId: string, content: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, userCreateComment(postId, content))
      dispatch(addCommentInState(resp.userCreateComment))
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToLogOut = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await request(host, logOut())
      dispatch(signUserOut())
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToUpdateUserProfile = (
  update: Partial<UserProfile>
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await request(host, updateUserProfile(update))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToConnectUser = (userId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, connectToAnotherUser(userId))

      dispatch(setConnectionsInState(resp.connectToAnotherUser.connections))
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToDisconnectUser = (userId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(host, disconnectFromAnotherUser(userId))
      dispatch(
        setConnectionsInState(resp.disconnectFromAnotherUser.connections)
      )
    } catch (err) {
      console.error(err)
    }
  }
}
