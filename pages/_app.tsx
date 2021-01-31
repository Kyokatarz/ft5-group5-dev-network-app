import React, { useReducer } from 'react'
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
import { AuthUserContext } from '../src/client/context/auth'
import { userState, userReducer } from '../src/client/reducers/user'

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
  const [state, dispatch] = useReducer(userReducer, userState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

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
        <AuthUserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <main className={classes.content}>
            <Component {...pageProps} />
          </main>
        </AuthUserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}
