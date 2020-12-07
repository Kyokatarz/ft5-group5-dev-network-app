import Head from 'next/head'
import Home from '../src/client/components/Home'

export default function HomePage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Developer Network</title>
      </Head>
      <Home />
    </div>
  )
}
