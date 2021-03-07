import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import useUserContext from '../../hooks/useUserContext'
import { sendRequestToLogOut } from '../../actions/user'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-evenly',
      padding: 0,
      listStyle: 'none',
      marginRight: theme.spacing(2),
    },
    buttonRight: {
      marginLeft: theme.spacing(4),
    },
  })
)

const NavBarLinks = () => {
  const classes = useStyles()
  const { dispatchAsync } = useUserContext()
  const { state } = useUserContext()
  const loggedInUserId = state.user?.id
  React.useEffect(() => {
    console.log(state)
  })
  return (
    <ul className={classes.container}>
      <li>
        <Link href={`/profile/${loggedInUserId}`}>
          <Typography>Profile</Typography>
        </Link>
      </li>
      <li>
        <Link href="/dashboard">
          <Typography>Dashboard</Typography>
        </Link>
      </li>
      <li onClick={() => dispatchAsync(sendRequestToLogOut())}>Logout</li>
    </ul>
  )
}

export default NavBarLinks
