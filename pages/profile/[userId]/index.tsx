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
  try {
    const { userId } = ctx.query as { userId: string }
    const resp = await request(host, getUserById(userId))

    return { props: { userProfile: resp.getUserById } }
  } catch (err) {
    console.error(err)
    return { props: { error: JSON.stringify(err, null, 2) } }
  }
}

export default index
