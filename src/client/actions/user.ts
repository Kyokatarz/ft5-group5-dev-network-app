import { Dispatch } from 'react'
import request from 'graphql-request'

import { LOGIN, UserActions, UserProfile } from '../types'
import {
  checkCookie,
  host,
  logInUser,
  signUpUser,
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
      const res = await request(host, logInUser(email, password))
      console.log(JSON.stringify(res, null, 2))
      dispatch({
        type: 'LOGIN',
        payload: res,
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
      const res = await request(
        host,
        signUpUser(email, password, lastName, firstName)
      )
      dispatch(signUserIn(res))
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }
}

export const requestCheckCookie = () => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await request(host, checkCookie())
    console.log(resp)
  }
}
