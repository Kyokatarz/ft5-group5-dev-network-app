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
            id
            user {
              id
              firstName
              lastName
            }
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

export const userCreateComment = (postId: string, content: string) => {
  return gql`
    mutation {
      userCreateComment(
        commentObj: { content: "${content}", postId: "${postId}" }
      ) {
        id
        content
        date
        likes

      }
    }
  `
}

export const deletePost = (postId: string) => {
  return gql`
    mutation {
      deletePost(postId: "${postId}") {
        content
      }
    }
  `
}

export const deleteComment = (postId: string, commentId: string) => {
  return gql`
    mutation {
      deleteComment(
        postId: "${postId}"
        commentId: "${commentId}"
      ) {
        content
      }
    }
  `
}

export const likeComment = (postId: string, commentId: string) => {
  return gql`
    mutation {
      likeComment(
        postId: "${postId}"
        commentId: "${commentId}"
      ) {
        content
      }
    }
  `
}

export const getUserById = (userId: string) => {
  return gql`
  query {
    getUserById(userId: "${userId}") {
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
          id
          user {
            id
            firstName
            lastName
          }
          content
          likes
        }
      }
    }
  }
  `
}

export const logOut = () => {
  return gql`
    query {
      logOut
    }
  `
}
