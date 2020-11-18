import { AppProps } from 'next/dist/next-server/lib/router/router'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}

export default App
