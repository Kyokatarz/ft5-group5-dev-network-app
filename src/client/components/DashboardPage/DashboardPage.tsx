import CreatePost from '../CreatePost'
import Head from 'next/head'

import DashboardProfile from '../DashboardProfile'

const DashBoardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardProfile />
      <CreatePost />
    </>
  )
}

export default DashBoardPage
