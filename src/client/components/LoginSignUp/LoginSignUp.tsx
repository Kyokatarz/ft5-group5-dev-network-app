import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
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
      marginLeft: theme.spacing(2),
    },
  })
)

const LoginSignUp = () => {
  const classes = useStyles()

  return (
    <ul className={classes.buttonsContainer}>
      <li>
        <Link href="/login">
          <Button color="inherit">Login</Button>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <Button color="inherit" className={classes.buttonRight}>
            SignUp
          </Button>
        </Link>
      </li>
    </ul>
  )
}

export default LoginSignUp
