import { gql } from 'graphql-request'

type UserOverride = {
  email?: string
  password?: string
}

export const createMockUser = (override?: UserOverride): string => {
  const email = override?.email || 'userEmail@test.com'
  const password = override?.password || 'userPassword'

  return gql`
    mutation {
      signupUser(user: {
        email: "${email}",
        password: "${password}"
      }){
        email,
        # id
      }
    }
  `
}

export const getAllUsers = (): string => {
  return gql`
    {
      getAllUsers {
        email
        firstName
        lastName
      }
    }
  `
}
