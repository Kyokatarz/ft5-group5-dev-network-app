import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import useStyles from './useStyles'

type StepType = {
  icon: any
  title: string
  text: string
}

const Step = ({ icon, title, text }: StepType): JSX.Element => {
  const classes = useStyles()
  return (
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
  )
}

export default Step
