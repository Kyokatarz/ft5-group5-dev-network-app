import CreatePost from '../CreatePost'
import Head from 'next/head'

import ProfileBar from '../ProfileBar'
import React from 'react'
import ProfilePostContainer from '../ProfilePostContainer'
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { Post, UserProfile } from '../../types'
import useStateContext from '../../hooks/useStateContext'

type ProfilePageProps = {
  userProfile: UserProfile
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(9),
    },
    profileBarAnchor: {
      position: 'relative',
    },
  })
)

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile }) => {
  const classes = useStyles()
  const { state } = useStateContext()
  console.log('userProfile', userProfile)
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={2} className={classes.profileBarAnchor}>
          <ProfileBar
            profileFirstName={userProfile.firstName}
            profileLastName={userProfile.lastName}
            profileCompany={userProfile.company}
            profileEmploymentStatus={userProfile.employmentStatus}
            profileId={userProfile.id}
          />
        </Grid>

        <Grid item xs={8}>
          {state.user?.user?.id === userProfile.id && <CreatePost />}
          <ProfilePostContainer
            posts={userProfile?.posts}
            profileFirstName={userProfile.firstName}
            profileLastName={userProfile.lastName}
            profileId={userProfile.id}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage
