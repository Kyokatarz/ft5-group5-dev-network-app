import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Toolbar,
  Hidden,
} from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import useStateContext from '../../hooks/useStateContext'
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
  const classes = useStyles()
  const { state } = useStateContext()
  const router = useRouter()

  const [searchString, setSearchString] = useState('')

  const userId = state.user?.user?.id
  const isLoggedIn = state.user?.isLoggedIn

  const onRequestSearchHandler = () => {
    router.push(`/searchResult?searchString=${searchString}`)
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Hidden xlDown>
          <MenuIcon className={classes.menuIcon} />
        </Hidden>
        <Link href={isLoggedIn ? `/profile/${userId}` : '/'}>
          <Typography variant="h6" component="a" className={classes.appName}>
            App Name
          </Typography>
        </Link>
        <SearchBar
          placeholder="Search by name..."
          onRequestSearch={onRequestSearchHandler}
          onChange={(string) => setSearchString(string)}
          value={searchString}
        />
        {!isLoggedIn && <LoginSignUp />}
        {isLoggedIn && <NavBarLinks />}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
