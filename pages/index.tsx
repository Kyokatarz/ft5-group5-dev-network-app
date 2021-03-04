import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import request from 'graphql-request'

import HomePage from '../src/client/components/HomePage'
import { host, checkCookie } from '../src/client/helpers/gql-string-factory'

export default function RootPage({ data }): JSX.Element {
  React.useEffect(() => {
    console.log(data)
  })
  return <HomePage />
}

export const getServerSideProps = async () => {
  try {
    const resp = await request(host, checkCookie())
  } catch (err) {
    console.error(err)
  }
  return { props: { data: 'hi' } }
}
