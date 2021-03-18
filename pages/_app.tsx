import React, { useReducer, useEffect, Component } from 'react'
import Head from 'next/head'
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../src/theme'
import Navbar from '../src/client/components/Navbar'
import { StateContext } from '../src/client/context/auth'
import { useThunk } from '../src/client/hooks/useThunk'
import { initRootState, rootReducer } from '../src/client/reducers'

import { requestCheckCookie } from '../src/client/actions/user'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      minHeight: '90vh',
    },
  })
)

export default function MyApp(props: any): JSX.Element {
  const classes = useStyles()
  const { Component, pageProps } = props
  const [state, dispatch] = useReducer(rootReducer, initRootState)
  const dispatchAsync = useThunk(dispatch)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    dispatchAsync(requestCheckCookie() as any)
  }, [])
  React.useEffect(() => {
    console.log('state', state)
  })

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StateContext.Provider value={{ state, dispatch, dispatchAsync }}>
          <Navbar />
          <main className={classes.content}>
            <Component {...pageProps} />
          </main>
        </StateContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}
