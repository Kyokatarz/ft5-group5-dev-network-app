import { Dispatch } from 'react'

type ThunkAction<T> = (dispatch: Dispatch<T>) => T
type AsyncDispatch<T> = Dispatch<T | ThunkAction<T>>

export function useThunk<T>(dispatch: Dispatch<T>): AsyncDispatch<T> {
  return function (action: T | ThunkAction<T>) {
    if (action instanceof Function) {
      return action(dispatch)
    }
    return dispatch(action)
  }
}
