import Head from 'next/head'
import React from 'react'

import Home from '../Home'

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Developer Network</title>
      </Head>
      <Home />
    </div>
  )
}

export default HomePage
