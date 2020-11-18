import Head from 'next/head'
import Surprise from '../src/client/components/Surprise'

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Developer Network</title>
      </Head>
      <Surprise />
    </div>
  )
}
