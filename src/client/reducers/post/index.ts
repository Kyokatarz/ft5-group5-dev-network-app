import { Post, UserActions } from '../../types'

export type PostStateType = {
  posts: Post[]
}

export const initPostState: PostStateType = {
  posts: [],
}

const postReducer = (
  state: PostStateType,
  action: UserActions
): PostStateType => {
  switch (action.type) {
    default:
      return state
  }
}

export default postReducer
