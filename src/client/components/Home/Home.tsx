import { Button, Grid } from '@material-ui/core'
import TouchAppTwoToneIcon from '@material-ui/icons/TouchAppTwoTone'
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone'
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

import Step from '../Step'
import useStyles from './useStyles'

//todo: maybe would be better to have a data file or something
const stepOneText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
const stepTwoText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
const stepThreeText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

const iconOne = <TouchAppTwoToneIcon fontSize="inherit" />
const iconTwo = <PeopleAltTwoToneIcon fontSize="inherit" />
const iconThree = <TrendingUpTwoToneIcon fontSize="inherit" />

const Home = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={clsx(classes.container, classes.relative)}>
        <img src="https://i.imgur.com/4WTfei1.jpg" className={classes.image} />
        <div className={classes.overlay}>
          <h1 className={classes.title}>APP NAME HERE</h1>
          <h2 className={classes.subTitle}>Boost your career in 3 steps</h2>
          <Link href="#getting-started">
            <Button className={classes.button}>GET STARTED</Button>
          </Link>
        </div>
      </div>
      <div className={classes.container} id="getting-started">
        <Grid container className={classes.stepsContainer} spacing={2}>
          <Step icon={iconOne} title="1. Sign Up" text={stepOneText} />
          <Step icon={iconTwo} title="2. Get Connected" text={stepTwoText} />
          <Step
            icon={iconThree}
            title="3. Boost Your Career"
            text={stepThreeText}
          />
        </Grid>
        <Link href="/signup">
          <Button className={classes.button}>SIGN UP NOW</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
