import React from 'react'
import PropTypes from 'prop-types'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: 64,
    },
  })
)

export default function MyApp(props: any) {
  const classes = useStyles()
  const { Component, pageProps } = props

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
        <Navbar />
        <main className={classes.content}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </React.Fragment>
  )
}
