import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-end',
      padding: 0,
      listStyle: 'none',
      marginRight: theme.spacing(2),
    },
    buttonRight: {
      marginLeft: theme.spacing(4),
    },
  })
)

const LoginSignUp = () => {
  const classes = useStyles()

  return (
    <ul className={classes.buttonsContainer}>
      <li>
        <Link href="/login">
          <Typography color="inherit">Login</Typography>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <Typography color="inherit" className={classes.buttonRight}>
            Sign Up
          </Typography>
        </Link>
      </li>
    </ul>
  )
}

export default LoginSignUp
