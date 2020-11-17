import Head from 'next/head'
import Surprise from '../src/client/components/Surprise'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Surprise />
    </div>
  )
}
