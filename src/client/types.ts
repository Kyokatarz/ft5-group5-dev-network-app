//Action constants
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// Types
// A user profile:
export type UserProfile = {
  id: string
  email: string
  firstName: string
  lastName: string
  image: string
  employmentStatus: string
  company: string
  post: Post[]
}

//A post:
export type Post = {
  id: string
  content: string
  date: string
  likes: string[]
  comments: Comment[]
}

//A profile
export type Comment = {
  userId: string
  content: string
  likes: string[]
}

//Actions
export type logUserIn = {
  type: typeof LOGIN
  payload: UserProfile
}

export type logUserOut = {
  type: typeof LOGOUT
}

export type UserActions = logUserIn | logUserOut