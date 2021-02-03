import CreatePost from '../CreatePost'
import Head from 'next/head'

import ProfileBar from '../ProfileBar'

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileBar />
      <CreatePost />
    </>
  )
}

export default ProfilePage
