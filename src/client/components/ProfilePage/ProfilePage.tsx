import CreatePost from '../CreatePost'
import Head from 'next/head'

import ProfileBar from '../ProfileBar'
import React from 'react'
import ProfilePostContainer from '../ProfilePostContainer'
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { Post, UserProfile } from '../../types'

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
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={3} className={classes.profileBarAnchor}>
          <ProfileBar
            profileFirstName={userProfile.firstName}
            profileLastName={userProfile.lastName}
          />
        </Grid>

        <Grid item xs={7}>
          <CreatePost />
          <ProfilePostContainer
            posts={userProfile?.posts}
            profileFirstName={userProfile.firstName}
            profileLastName={userProfile.lastName}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage
