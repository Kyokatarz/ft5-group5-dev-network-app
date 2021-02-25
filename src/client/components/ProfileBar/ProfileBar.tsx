import {
  Avatar,
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 150,
      height: 150,
    },
    container: {
      height: '100vh',
      marginLeft: theme.spacing(1),
    },
  })
)

const ProfileBar = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.container}>
      <Avatar
        alt="avatar"
        src="https://i.imgur.com/WgXR4f7.jpg"
        className={classes.avatar}
      />
      <Typography variant="h5" component="p">
        Giang Tran
      </Typography>

      <Button variant="outlined">Edit Profile</Button>
    </Paper>
  )
}

export default ProfileBar
