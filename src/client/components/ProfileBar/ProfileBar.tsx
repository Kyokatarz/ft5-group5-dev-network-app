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

type ProfileBarProps = {
  profileFirstName: string
  profileLastName: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 150,
      height: 150,
    },
    container: {
      height: '100vh',
      marginLeft: theme.spacing(1),
      position: 'fixed',
      top: theme.spacing(9),
      left: 0,
    },
  })
)

const ProfileBar: React.FC<ProfileBarProps> = ({
  profileLastName,
  profileFirstName,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.container}>
      <Avatar
        alt="avatar"
        src="https://i.imgur.com/WgXR4f7.jpg"
        className={classes.avatar}
      />
      <Typography variant="h5" component="p">
        {profileFirstName || profileLastName || 'Unnamed User'}
      </Typography>

      <Button variant="outlined">Edit Profile</Button>
    </Paper>
  )
}

export default ProfileBar
