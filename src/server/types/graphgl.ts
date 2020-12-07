import { NextApiRequest, NextApiResponse } from 'next'

export type Cookie = {
  token: string
}

export type GraphQLContext = {
  req: NextApiRequest
  res: NextApiResponse
  cookie: Cookie
  [key: string]: any
}

export type GraphQLResolver = {
  [key: string]: {
    [key: string]: (_parent: any, _args: any, _context: GraphQLContext) => any
  }
}
