import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStateContext from '../../hooks/useStateContext'
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
  const { dispatchAsync } = useStateContext()
  const { state } = useStateContext()
  const loggedInUserId = state.user?.id
  const router = useRouter()
  const onLogOutClick = () => {
    dispatchAsync(sendRequestToLogOut())
    router.push('/')
  }
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
      <li onClick={onLogOutClick}>
        <Typography>Logout</Typography>
      </li>
    </ul>
  )
}

export default NavBarLinks
