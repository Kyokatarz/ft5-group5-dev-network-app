import combineReducers from 'react-combine-reducers'
import userReducer, { initUserState } from './user'
import postReducer, { initPostState } from './post'
import { RootState } from '../types'

type Action = {
  type: string
  payload: any
}

type RootStateReducer = (state: RootState, action: Action) => RootState

export const [rootReducer, initRootState] = combineReducers<RootStateReducer>({
  user: [userReducer, initUserState],
  posts: [postReducer, initPostState],
})
