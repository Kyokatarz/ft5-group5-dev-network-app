//Action constants
//__User__
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

//__Post__
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

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
  posts: Post[]
}

//A post:
export type Post = {
  id: string
  content: string
  date: string
  likes: string[]
  comments: Comment[]
  firstName: string
  lastName: string
}

//A comment
export type Comment = {
  id: string
  user: Partial<UserProfile>
  content: string
  likes: string[]
}

//Actions
//__User__
export type LogUserIn = {
  type: typeof LOGIN
  payload: UserProfile
}

export type LogUserOut = {
  type: typeof LOGOUT
}

export type UserActions = LogUserIn | LogUserOut

//__Post__
export type AddPost = {
  type: typeof ADD_POST
  payload: Post
}

export type DeletePost = {
  type: typeof DELETE_POST
  payload: string
}

export type AddComment = {
  type: typeof ADD_COMMENT
  payload: Comment
}

export type DeleteComment = {
  type: typeof DELETE_COMMENT
  payload: string
}

export type PostActions = AddPost | DeletePost | AddComment | DeleteComment

//States:
export type UserState = {
  isLoggedIn: boolean
  user: UserProfile
}

export type PostState = {
  posts: Post[]
}

export type RootState = {
  user: UserState
  posts: PostState
}
