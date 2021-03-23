import { Button } from '@material-ui/core'
import React from 'react'

import useStateContext from '../../hooks/useStateContext'

type ConnectDisconnectButtonProps = {
  profileId: string
  connections: string[]
}

const ConnectDisconnectButton: React.FC<ConnectDisconnectButtonProps> = ({
  profileId,
  connections,
}) => {
  const { state } = useStateContext()
  const loggedInUserId = state.user?.user?.id

  if (loggedInUserId === profileId || !state.user?.isLoggedIn) return null
  return (
    <>
      {connections?.includes(profileId) ? (
        <Button variant="outlined" color="secondary">
          Connect
        </Button>
      ) : (
        <Button variant="outlined" color="secondary">
          Disconnect
        </Button>
      )}
    </>
  )
}

export default ConnectDisconnectButton
