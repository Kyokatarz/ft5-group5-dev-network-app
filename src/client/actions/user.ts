import { Dispatch } from 'react'
import request from 'graphql-request'

import { LOGIN, LOGOUT, UserActions, UserProfile } from '../types'
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
} from '../helpers/gql-string-factory'
import { NextRouter } from 'next/router'

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

/*---------------------Thunk------------------------------------------------*/
export const sendRequestToSignUserIn = (
  email: string,
  password: string,
  router: NextRouter
) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const resp = await request(host, logInUser(email, password))
      console.log(JSON.stringify(resp, null, 2))
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
      dispatch(signUserIn(resp))
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
  return async () => {
    try {
      const resp = await request(host, userCreatePost(content))
      console.log(resp)
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
  return async () => {
    try {
      const resp = await request(host, userCreateComment(postId, content))
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
