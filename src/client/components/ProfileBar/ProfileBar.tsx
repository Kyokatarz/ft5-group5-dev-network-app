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
import { UserProfile } from '../../types'

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
      <NameDisplay
        profileFirstName={profileFirstName}
        profileLastName={profileLastName}
      />
      {state.user?.user?.id === profileId && (
        <EditProfileButton profileId={profileId} />
      )}

      <ConnectDisconnectButton profileId={profileId} />
      <UserJobInfo
        profileCompany={profileCompany}
        profileEmploymentStatus={profileEmploymentStatus}
      />
      <ConnectionDisplay connections={state.user?.user?.connections} />
    </Card>
  )
}

export default React.memo(ProfileBar)

/*==========================+
 |//---Small components---//|
 +==========================*/
type NameDisplayProps = {
  profileFirstName: string
  profileLastName: string
}

type EditProfileButtonProps = {
  profileId: string
}

type UserJobInfoProps = {
  profileCompany: string
  profileEmploymentStatus: string
}

const NameDisplay: React.FC<NameDisplayProps> = ({
  profileFirstName,
  profileLastName,
}) => (
  <Typography variant="h5" component="p">
    {profileFirstName || profileLastName || 'Unnamed User'}
  </Typography>
)

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ profileId }) => {
  return (
    <Link href={`/profile/${profileId}/edit`}>
      <Button variant="outlined">Edit Profile</Button>
    </Link>
  )
}

const UserJobInfo: React.FC<UserJobInfoProps> = ({
  profileCompany,
  profileEmploymentStatus,
}) => {
  const classes = useStyles()
  return (
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
          <EmploymentIcon color="primary" fontSize="small" /> Employment Status:{' '}
          {profileEmploymentStatus || 'N/A'}
        </Typography>
      </Grid>
    </Grid>
  )
}

const ConnectionDisplay: React.FC<{ connections: Partial<UserProfile>[] }> = ({
  connections,
}) => {
  return (
    <Card elevation={1} style={{ width: '100%' }}>
      <CardHeader
        title={
          <Typography variant="body2">
            Connections <Box fontWeight={500}> {connections?.length || 0}</Box>
          </Typography>
        }
        action={<Link href="/">See all</Link>}
      />
      <CardContent>
        <AvatarGroup max={4}>
          {connections?.map((connection) => (
            <Avatar key={connection.id}>{connection.firstName[0]}</Avatar>
          ))}
        </AvatarGroup>
      </CardContent>
    </Card>
  )
}
