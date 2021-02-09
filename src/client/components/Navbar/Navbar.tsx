import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Toolbar,
  Hidden,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import React from 'react'

import useUserContext from '../../hooks/useUserContext'
import LoginSignUp from '../LoginSignUp'
import NavBarLinks from '../NavbarLinks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 64,
    },
    appName: {
      flexGrow: 1,
      cursor: 'pointer',
    },
    menuIcon: {
      marginRight: theme.spacing(2),
    },
  })
)

const Navbar = () => {
  const { state } = useUserContext()
  const classes = useStyles()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Hidden xlDown>
          <MenuIcon className={classes.menuIcon} />
        </Hidden>
        <Link href="/">
          <Typography variant="h6" component="a" className={classes.appName}>
            App Name
          </Typography>
        </Link>
        {!state.isLoggedIn && <LoginSignUp />}
        {state.isLoggedIn && <NavBarLinks />}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
