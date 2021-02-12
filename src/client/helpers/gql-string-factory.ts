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
): string => {
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

export const logInUser = (email: string, password: string): string => {
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
        image
        employmentStatus
        company
        posts{
          id,
          content,
          date,
          likes,
          comments{ 
            userId,
            content,
            likes
          }
        }
      }
    }
  `
}

export const checkCookie = () => {
  return gql`
    query {
      checkCookieAndRetrieveUser {
        id
        email
        firstName
        lastName
        image
        employmentStatus
        company
        posts {
          id
          content
          date
          likes
          comments {
            userId
            content
            likes
          }
        }
      }
    }
  `
}

export const userCreatePost = (content: string) => {
  return gql`
    mutation {
      userCreatePost(postContent: "${content}"){
        id,
        content,
        date,
        likes,
        comments{
          userId,
          content,
          likes
        }
      }
    }
  `
}

export const userLikePost = (postId: string) => {
  return gql`
    mutation{
      userLikePost(postId: "${postId}"){
        likes
      }
    }
  `
}
