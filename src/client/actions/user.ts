import { Dispatch } from 'react'
import request from 'graphql-request'

import { LOGIN, UserActions, UserProfile } from '../types'
import {
  checkCookie,
  host,
  logInUser,
  signUpUser,
  userCreatePost,
} from '../helpers/graphql-request-string'

export const signUserIn = (payload: UserProfile): UserActions => {
  return {
    type: LOGIN,
    payload: payload,
  }
}

export const sendRequestToSignUserIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const resp = await request(host, logInUser(email, password))
      console.log(JSON.stringify(resp, null, 2))
      dispatch({
        type: 'LOGIN',
        payload: resp,
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const sendRequestToSignUserUp = (
  email: string,
  password: string,
  lastName: string,
  firstName: string
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const resp = await request(
        host,
        signUpUser(email, password, lastName, firstName)
      )
      dispatch(signUserIn(resp))
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
