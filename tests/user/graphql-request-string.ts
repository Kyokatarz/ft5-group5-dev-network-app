import { gql } from 'graphql-request'

import { EmploymentStatus } from '../../src/server/models/User'

type UserOverride = {
  email?: string
  password?: string
}

type UserProfile = {
  email: string
  firstName?: string
  lastName?: string
  image?: string
  employmentStatus?: EmploymentStatus
  company?: string
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
        id
        email,
      }
    }
  `
}

export const getUserById = (userId: string): string => {
  return gql`{
    getUserById(id: "${userId}") {
      id
    }
  }`
}

export const loginMockUser = (user: {
  email: string
  password: string
}): string => {
  const { email, password } = user
  return gql`
    mutation {
      loginUser(user: {
        email: "${email}",
        password: "${password}"
      }){
        id,
        email
      }
    }
  `
}

export const getAllMockUsers = (): string => {
  return gql`
    {
      getAllUsers {
        id
        email
        firstName
        lastName
      }
    }
  `
}

export const updateMockUserProfile = (update: Partial<UserProfile>): string => {
  const {
    email,
    firstName,
    lastName,
    image,
    employmentStatus,
    company,
  } = update

  let string = ''
  if (email) string += `email: "${email}",`
  if (firstName) string += `firstName: "${firstName}",`
  if (lastName) string += `lastName: "${lastName}",`
  if (image) string += `image: "${image}",`
  if (employmentStatus) string += `image: "${employmentStatus}",`
  if (company) string += `company: "${company}",`
  console.log('testString:', string)
  return gql`
    mutation {
      updateUserProfile (
        update: { 
          ${string}
        }){
          id,
          email,
          firstName,
          lastName,
          image,
          employmentStatus,
          company
        }
    }
  `
}

export const userCreateMockPost = (postContent: string) => {
  return gql`
    mutation{
      userCreatePost(postContent: "${postContent}"){
        id,
        content,
        likes,
        date,
        comments{ content },
      }
    }
  `
}
