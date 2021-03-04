import CreatePost from '../CreatePost'
import Head from 'next/head'

import ProfileBar from '../ProfileBar'
import React from 'react'
import ProfilePostContainer from '../ProfilePostContainer'
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'

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

const ProfilePage = () => {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={3} className={classes.profileBarAnchor}>
          <ProfileBar />
        </Grid>

        <Grid item xs={7}>
          <CreatePost />
          <ProfilePostContainer />
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage
