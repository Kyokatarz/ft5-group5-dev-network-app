import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  PostActions,
  PostState,
  SET_INIT_POST,
} from '../../types'

export const initPostState: PostState = {
  posts: [],
}

const postReducer = (state: PostState, action: PostActions): PostState => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    }
    case SET_INIT_POST: {
      return { ...state, posts: action.payload }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }
    }
    case ADD_COMMENT: {
      const tempPostArray = [...state.posts]
      const indexOfPost = tempPostArray
        .map((post) => post.id)
        .indexOf(action.payload.id)
      tempPostArray[indexOfPost] = action.payload
      return { ...state, posts: [...tempPostArray] }
    }
    case DELETE_COMMENT: {
      const tempPostArray = [...state.posts]

      const indexOfPost = tempPostArray
        .map((post) => post.id)
        .indexOf(action.payload.postId)

      //Filter the commentId from the post
      //New comment array has no deleted comment
      tempPostArray[indexOfPost].comments = tempPostArray[
        indexOfPost
      ].comments.filter((comment) => comment.id !== action.payload.commentId)

      return { ...state, posts: [...tempPostArray] }
    }

    default:
      return state
  }
}

export default postReducer