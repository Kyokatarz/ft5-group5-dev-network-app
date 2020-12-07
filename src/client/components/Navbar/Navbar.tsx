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

import LoginSignUp from '../LoginSignUp'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuIcon: {
      marginRight: theme.spacing(2),
    },
    appName: {
      flexGrow: 1,
    },
  })
)

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Hidden xlDown>
          <MenuIcon className={classes.menuIcon} />
        </Hidden>
        <Typography variant="h6" className={classes.appName}>
          App Name
        </Typography>
        <LoginSignUp />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
