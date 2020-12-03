import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

import { GraphQLContext, Payload } from '../types'
import { errorHandler } from './errorHandler'

/** JWT_KEY is checked before connecting to DB  */
const generateJWT = (payload: Payload) => {
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
  if (payload) {
    const token = generateJWT(payload)
    context.res.setHeader(
      'Set-Cookie',
      serialize('token', token, { httpOnly: true })
    )
  } else {
    console.log('NO TOKEN')
    //TODO: delete if we don't need it on the front end
    context.res.setHeader(
      'Set-Cookie',
      serialize('token', '', { httpOnly: true })
    )
  }
}
