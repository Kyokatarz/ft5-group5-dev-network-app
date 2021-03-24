//Action constants
//__User__
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_CONNECTED_USER = 'ADD_CONNECTED_USER'
//__Post__
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SET_INIT_POST = 'SET_INIT_POST'
export const CHANGE_USING_PROPS = 'CHANGE_USING_PROPS'
export const SET_CONNECTIONS = 'SET_CONNECTIONS'

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
  connections: Partial<UserProfile>[]
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

export type SetConnections = {
  type: typeof SET_CONNECTIONS
  payload: Partial<UserProfile>
}

export type UserActions = LogUserIn | LogUserOut | SetConnections

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
  payload: Post
}

export type DeleteComment = {
  type: typeof DELETE_COMMENT
  payload: {
    postId: string
    commentId: string
  }
}

export type SetInitPost = {
  type: typeof SET_INIT_POST
  payload: Post[]
}

export type ChangeUsingProps = {
  type: typeof CHANGE_USING_PROPS
}
export type PostActions =
  | AddPost
  | DeletePost
  | AddComment
  | DeleteComment
  | SetInitPost
  | ChangeUsingProps

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
