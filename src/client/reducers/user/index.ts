export type UserStateType = {
  isLoggedIn: boolean
  user: any
  token?: string
}

export const userState: UserStateType = {
  isLoggedIn: false,
  user: null,
  token: null,
}

export const userReducer = (state: UserStateType, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('logging in user')
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}
