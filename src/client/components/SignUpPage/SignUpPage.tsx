import {
  Container,
  Avatar,
  makeStyles,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import * as yup from 'yup'
import Link from 'next/link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useRouter } from 'next/router'

import { StateContext } from '../../context/auth'
import { useContext } from 'react'
import { sendRequestToSignUserUp } from '../../actions/user'

const signUpYupSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(8).max(255),
  firstName: yup.string().min(1),
  lastName: yup.string().min(1),
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function SignUpPage() {
  const classes = useStyles()
  const router = useRouter()
  const { dispatchAsync } = useContext(StateContext)
  const submitHandler = async (data: any) => {
    const { email, password, lastName, firstName } = data
    dispatchAsync(
      sendRequestToSignUserUp(email, password, lastName, firstName, router)
    )
  }

  return (
    <Container component="section" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => submitHandler(values)}
          validationSchema={signUpYupSchema}
        >
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login">
                  <Typography className={classes.link} variant="body2">
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Container>
  )
}
