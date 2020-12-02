import { NextApiRequest, NextApiResponse } from 'next'

export type GraphQLContext = {
  req: NextApiRequest
  res: NextApiResponse
}

export type GraphQLResolver = {
  [key: string]: {
    [key: string]: (_parent: any, _args: any, _context: GraphQLContext) => any
  }
}
