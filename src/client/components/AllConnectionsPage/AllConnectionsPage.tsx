import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

import { UserProfile } from '../../types'

type AllConnectionsPageProps = {
  connections: Partial<UserProfile>[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(9),
    },
  })
)

const AllConnectionsPage: React.FC<AllConnectionsPageProps> = ({
  connections,
}) => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid container spacing={1}>
        {connections?.map((connection) => (
          <Grid item key={connection.id} xs={4}>
            <Card>
              <Link href={`/profile/${connection.id}`}>
                <CardActionArea>
                  <CardHeader
                    avatar={
                      <Avatar sizes="large">{connection.firstName[0]}</Avatar>
                    }
                    title={connection.firstName + ' ' + connection.lastName}
                  />

                  <CardContent>
                    <Typography>{connection.company || 'N/A'}</Typography>
                    <Typography>
                      {connection.employmentStatus || 'N/A'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default AllConnectionsPage
