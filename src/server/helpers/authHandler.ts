import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'

import { GraphQLContext } from '../types'

type Payload = {
  [key: string]: any
}

/** JWT_KEY is checked before connecting to DB  */
const generateJWT = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY)
  return token
}

export const getPayloadFromCookie = (cookie: NextApiRequestCookies) => {
  if (Object.keys(cookie).length === 0) {
    console.log('no cookie')
    return undefined
  }
  try {
    const payload = jwt.verify(cookie.token, process.env.JWT_KEY)
    return { loggedIn: true, payload }
  } catch (err) {
    console.log(err)
    return { loggedIn: false }
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
