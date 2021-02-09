import CreatePost from '../CreatePost'
import Head from 'next/head'

import ProfileBar from '../ProfileBar'
import React from 'react'
import ProfilePostContainer from '../ProfilePostContainer'

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileBar />
      <CreatePost />
      <ProfilePostContainer />
    </>
  )
}

export default ProfilePage
