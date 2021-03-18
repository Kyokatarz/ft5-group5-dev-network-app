import { Dispatch, useContext } from 'react'

import { StateContext as StateContextType } from '../context/auth'
import { RootState } from '../types'

type StateContextType = {
  state: RootState
  dispatch: Dispatch<any>
  dispatchAsync: Dispatch<any>
}

const useUserContext = () => {
  const context = useContext<StateContextType>(StateContextType)
  return context
}

export default useUserContext
