import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import CompanyIcon from '@material-ui/icons/BusinessRounded'
import EmploymentIcon from '@material-ui/icons/WorkRounded'
import React from 'react'
import Link from 'next/link'

import useStateContext from '../../hooks/useStateContext'
import ConnectDisconnectButton from '../ConnectDisconnectButton'

type ProfileBarProps = {
  profileFirstName: string
  profileLastName: string
  profileCompany: string
  profileEmploymentStatus: string
  profileId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 150,
      height: 150,
    },
    container: {
      padding: theme.spacing(1),
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: theme.spacing(1),
      top: theme.spacing(9),
      left: 0,
    },
    infoContainer: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  })
)

const ProfileBar: React.FC<ProfileBarProps> = ({
  profileLastName,
  profileFirstName,
  profileCompany,
  profileEmploymentStatus,
  profileId,
}) => {
  const classes = useStyles()
  const { state } = useStateContext()

  return (
    <Card className={classes.container}>
      <Avatar alt="avatar" className={classes.avatar} />
      <Typography variant="h5" component="p">
        {profileFirstName || profileLastName || 'Unnamed User'}
      </Typography>

      {state.user?.user?.id === profileId && (
        <Link href={`/profile/${profileId}/edit`}>
          <Button variant="outlined">Edit Profile</Button>
        </Link>
      )}

      <ConnectDisconnectButton profileId={profileId} />

      <Grid
        container
        direction="column"
        spacing={1}
        className={classes.infoContainer}
      >
        <Grid item>
          <Typography variant="body2">
            <CompanyIcon color="primary" fontSize="small" /> Company:{' '}
            {profileCompany || 'N/A'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            <EmploymentIcon color="primary" fontSize="small" /> Employment
            Status: {profileEmploymentStatus || 'N/A'}
          </Typography>
        </Grid>

        <Grid item>
          <Card elevation={1}>
            <CardHeader
              title={
                <Typography variant="body2">
                  Connections{' '}
                  <Box fontWeight={500}>
                    {' '}
                    {state.user?.user?.connections.length || 0}
                  </Box>
                </Typography>
              }
              action={<Link href="/">See all</Link>}
            />
            <CardContent>
              <AvatarGroup max={4}>
                {state.user?.user.connections.map((connection) => (
                  <Avatar key={connection.id} alt={connection.firstName[0]} />
                ))}
              </AvatarGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Card>
  )
}

export default React.memo(ProfileBar)
