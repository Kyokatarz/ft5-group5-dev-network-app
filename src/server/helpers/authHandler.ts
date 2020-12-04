import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

import { GraphQLContext, Payload } from '../types'
import { errorHandler } from './errorHandler'
import { mockCookie } from '../../../tests/mockCookie'

/** JWT_KEY is checked before connecting to DB  */
export const generateJWT = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY)
  return token
}

export const getPayloadFromJwt = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY) as Payload
  } catch (err) {
    errorHandler(err)
  }
}

export const setCookie = async (context: GraphQLContext, payload?: Payload) => {
  let token
  payload ? (token = generateJWT(payload)) : null
  if (process.env.NODE_ENV === 'test') return mockCookie(context, token)
  context.res.setHeader(
    'Set-Cookie',
    serialize('token', token || '', { httpOnly: true })
  )
}
