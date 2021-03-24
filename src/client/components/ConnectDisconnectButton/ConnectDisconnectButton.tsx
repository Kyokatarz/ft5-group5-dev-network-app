import { Button } from '@material-ui/core'
import React from 'react'

import {
  sendRequestToConnectUser,
  sendRequestToDisconnectUser,
} from '../../actions/user'
import useStateContext from '../../hooks/useStateContext'

type ConnectDisconnectButtonProps = {
  profileId: string
}

const ConnectDisconnectButton: React.FC<ConnectDisconnectButtonProps> = ({
  profileId,
}) => {
  const { state, dispatchAsync } = useStateContext()
  const loggedInUserId = state.user?.user?.id
  const connections = state.user?.user?.connections

  const onConnectClick = () => {
    dispatchAsync(sendRequestToConnectUser(profileId))
  }
  const onDisconnectClick = () => {
    dispatchAsync(sendRequestToDisconnectUser(profileId))
  }

  if (loggedInUserId === profileId || !state.user?.isLoggedIn) return null

  return (
    <>
      {!connections?.map((user) => user.id).includes(profileId) ? (
        <Button variant="outlined" color="secondary" onClick={onConnectClick}>
          Connect
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={onDisconnectClick}
        >
          Disconnect
        </Button>
      )}
    </>
  )
}

export default ConnectDisconnectButton
