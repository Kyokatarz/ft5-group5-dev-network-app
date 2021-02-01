import { Dispatch } from 'react'
import request from 'graphql-request'

import { LOGIN, UserActions, UserProfile } from '../types'
import { logInUser } from '../helpers/graphql-request-string'

export const signUserIn = (payload: UserProfile): UserActions => {
  return {
    type: LOGIN,
    payload: payload,
  }
}

export const sendRequestToSignUserIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const res = await request('/api/v1/graphql', logInUser(email, password))
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
