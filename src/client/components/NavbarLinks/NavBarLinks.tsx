import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'

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
  return (
    <ul className={classes.container}>
      <li>
        <Link href="/profile">
          <Typography>Profile</Typography>
        </Link>
      </li>
      <li>
        <Link href="/dashboard">
          <Typography>Dashboard</Typography>
        </Link>
      </li>
    </ul>
  )
}

export default NavBarLinks
