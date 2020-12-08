import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import Link from 'next/link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { FormEvent, ChangeEvent, useState, useContext } from 'react'
import request, { gql } from 'graphql-request'

type InitialStateType = {
  email: string
  password: string
  isSubmitting: boolean
  errorMessage: string | null
}

import { AuthUserContext } from '../../context/auth'
import useStyles from './useStyles'

export default function SignIn(): JSX.Element {
  const classes = useStyles()

  const initialState: InitialStateType = {
    email: '',
    password: '',
    isSubmitting: true,
    errorMessage: null,
  }

  const { dispatch } = useContext(AuthUserContext)
  const [data, setData] = useState(initialState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })

    try {
      const res = await request(
        '/api/v1/graphql',
        gql`
      mutation {
        loginUser(user: {
          email: "${data.email}", 
          password: "${data.password}"
          }) {
            id, 
            email
          }
        }
      `
      )
      await dispatch({
        type: 'LOGIN',
        payload: res, //TODO: check if we need a json object
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">
                <Typography className={classes.link} variant="body2">
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup">
                <Typography className={classes.link} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
