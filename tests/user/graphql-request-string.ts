import { gql } from 'graphql-request'

type UserOverride = {
  email?: string
  password?: string
}

type UserProfile = {
  email: string
  firstName?: string
  lastName?: string
  image?: string
  // employmentStatus?: string
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

export const updateMockUserProfile = (
  userId: string,
  update: Partial<UserProfile>
): string => {
  const {
    email,
    firstName,
    lastName,
    image,
    // employmentStatus,
    company,
  } = update

  return gql`
    mutation {
      updateUserProfile (
        userId: "${userId}",
        update: {
          email: "${email}",
          firstName: "${firstName}",
          lastName: "${lastName}",
          image: "${image}",
          company: "${company}"
        }){
          id,
          email,
          firstName,
          lastName,
          image,
          # employmentStatus,
          company
        }
    }
  `
}
