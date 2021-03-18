import { UserActions } from '../../types'

export type UserStateType = {
  isLoggedIn: boolean
  user: any
}

export const initUserState: UserStateType = {
  isLoggedIn: false,
  user: null,
}

const userReducer = (
  state: UserStateType,
  action: UserActions
): UserStateType => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}

export default userReducer
