import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Context } from 'vm'
import request from 'graphql-request'

import ProfilePage from '../../../src/client/components/ProfilePage'
import {
  getUserById,
  host,
} from '../../../src/client/helpers/gql-string-factory'

const index = (props: any) => {
  if (props.errors) return <h1>{props.errors}</h1>
  else
    return (
      <>
        <Head>
          <title>{useRouter().query.userId}</title>
        </Head>
        <ProfilePage userProfile={props.userProfile} />
      </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = ctx.query as { userId: string }
  try {
    const resp = await request(host, getUserById(userId))
    return { props: { userProfile: resp.getUserById } }
  } catch (err) {
    return { props: { errors: JSON.stringify(err.response.errors[0].message) } }
  }
}

export default index
