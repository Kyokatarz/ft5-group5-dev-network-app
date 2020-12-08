import Card from '@material-ui/core/Card'
import { CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'

import useStyles from './useStyles'

type StepType = {
  icon: any
  title: string
  text: string
}

const Step = ({ icon, title, text }: StepType): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid item lg={3} md={5} xs={9}>
      <Card className={classes.step}>
        <div className={classes.icon}>{icon}</div>
        {/* <CardActionArea>
      </CardActionArea> */}
        <CardContent>
          <Typography
            className={classes.title}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {title}
          </Typography>
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Step
