import { GraphQLContext } from '../src/server/types'

export const mockCookie = (
  context: GraphQLContext,
  jwtToken: string | undefined
) => {
  context.cookie.token = jwtToken
}
