import { Dispatch, useContext } from 'react'

import { StateContext } from '../context/auth'
import { UserState } from '../types'

type StateContext = {
  state: UserState
  dispatch: Dispatch<any>
  dispatchAsync: Dispatch<any>
}

const useUserContext = () => {
  const context = useContext<StateContext>(StateContext)
  return context
}

export default useUserContext
