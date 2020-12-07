import Button from '@material-ui/core/Button'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

import Step from '../Step'
import useStyles from './useStyles'

//todo: maybe would be better to have a data file or something
const stepOneText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
const stepTwoText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
const stepThreeText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

const iconOne = <AccountCircleOutlinedIcon />

const Home = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      NAVIGATION
      <div className={classes.container}>
        <div className={classes.block}>
          <h1 className={classes.title}>APP NAME HERE</h1>
          <h2 className={classes.subTitle}>Boost your career in 3 steps</h2>
          <Button className={classes.button}>GET STARTED</Button>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.stepsContainer}>
          <Step icon={iconOne} title="Sign Up" text={stepOneText} />
          <Step icon={iconOne} title="Get Connected" text={stepTwoText} />
          <Step icon={iconOne} title="Boost Your Career" text={stepThreeText} />
        </div>
        <Button className={classes.button}>SIGN UP NOW</Button>
      </div>
    </div>
  )
}

export default Home
