import Head from 'next/head'
import Navbar from '../src/client/components/Navbar'
import Surprise from '../src/client/components/Surprise'

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Developer Network</title>
      </Head>
      <Navbar />
      <Surprise />
    </div>
  )
}
