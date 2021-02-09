import { Dispatch, useContext } from 'react'

import { AuthUserContext } from '../context/auth'
import { UserState } from '../types'

type UserContext = {
  state: UserState
  dispatch: Dispatch<any>
  dispatchAsync: Dispatch<any>
}

const useUserContext = () => {
  const context = useContext<UserContext>(AuthUserContext)
  return context
}

export default useUserContext
