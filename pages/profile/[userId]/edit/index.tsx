import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import request from 'graphql-request'
import React from 'react'

import {
  host,
  getUserById,
} from '../../../../src/client/helpers/gql-string-factory'

import EditPage from '../../../../src/client/components/EditPage'

const index = ({ userProfile, errors }: any) => {
  console.log(userProfile)
  if (errors) return <>ERROR</>
  else
    return (
      <EditPage
        profileLastName={userProfile.lastName}
        profileFirstName={userProfile.firstName}
        profileCompany={userProfile.company}
        profileEmploymentStatus={userProfile.employmentStatus}
        profileEmail={userProfile.email}
      />
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
