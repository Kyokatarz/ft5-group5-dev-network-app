import { gql } from 'graphql-request'

export const host =
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : undefined) + '/api/v1/graphql' //TODO: change after deploy

export const signUpUser = (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) => {
  let string = `email: "${email}", password: "${password}",`
  if (firstName) string += `firstName: "${firstName}"`
  if (lastName) string += `lastName: "${lastName}"`

  return gql`
    mutation {
      signupUser(user: {
        ${string}
      }){
        id
        email,
        firstName,
        lastName
      }
    }
  `
}

export const logInUser = (email: string, password: string) => {
  return gql`
    mutation {
      loginUser(user: {
        email: "${email}",
        password: "${password}"
      }){
        id
        email,
        firstName,
        lastName
      }
    }
  `
}
