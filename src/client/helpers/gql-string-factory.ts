import { gql } from 'graphql-request'

export const host =
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://dev-social.vercel.app') + '/api/v1/graphql' //TODO: change after deploy

export const signupUser = (
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
        connections {
          id
          firstName
          lastName
        }
        posts {
          id
          content
          date
          likes
          comments {
            user {
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
  const modifiedContent = content.replace('\n', '\\n')
  return gql`
    mutation {
      userCreatePost(postContent: "${modifiedContent}"){
        id,
        content,
        date,
        likes,
        comments{
          id
          content
          likes
          user{
            id
            firstName
            lastName
          }
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
        comments{ 
          id
          content
          likes
          user{
            id
            firstName
            lastName
          }
        }

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
        connections{
          id
          firstName
          lastName
        }
        posts {
          id
          content
          date
          likes
          comments {
            id
            content
            likes
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
    }
  `
}

export const searchUsersByName = (searchString: string) => {
  return gql`
    query {
      searchUsersByName(searchString: "${searchString}") {
        id
        lastName
        firstName
      }
    }
  `
}

export const updateUserProfile = (update: any) => {
  const { email, firstName, lastName, company, employmentStatus } = update
  let string = ''
  if (email) string += `email: "${email}"`
  if (firstName) string += `firstName: "${firstName}"`
  if (lastName) string += `lastName: "${lastName}"`
  if (company) string += `company: "${company}"`
  if (employmentStatus) string += `employmentStatus: ${employmentStatus}`

  return gql`
    mutation{
      updateUserProfile(update: {
        ${string}
      }){
        id
        firstName
        lastName
        company
        employmentStatus
      }
    }
  `
}

export const connectToAnotherUser = (connectingId: string) => {
  return gql`
    mutation {
      connectToAnotherUser(connectingId: "${connectingId}") {
        id
        connections{
          id
          firstName
          lastName
        }
      }
    }
  `
}

export const disconnectFromAnotherUser = (disconnectingId: string) => {
  return gql`
    mutation {
      disconnectFromAnotherUser(disconnectingId: "${disconnectingId}") {
        id
        connections{
          id
          firstName
          lastName
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
