import Button from '@material-ui/core/Button'
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
        <img
          src="https://dev-network.s3.eu-north-1.amazonaws.com/altumcode-dC6Pb2JdAqs-unsplash.jpg"
          className={classes.image}
        />
        <div className={classes.overlay}>
          <h1 className={classes.title}>APP NAME HERE</h1>
          <h2 className={classes.subTitle}>Boost your career in 3 steps</h2>
          <Link href="#getting-started">
            <Button className={classes.button}>GET STARTED</Button>
          </Link>
        </div>
      </div>
      <div className={classes.container} id="getting-started">
        <div className={classes.stepsContainer}>
          <Step icon={iconOne} title="Sign Up" text={stepOneText} />
          <Step icon={iconTwo} title="Get Connected" text={stepTwoText} />
          <Step
            icon={iconThree}
            title="Boost Your Career"
            text={stepThreeText}
          />
        </div>
        <Link href="/signup">
          <Button className={classes.button}>SIGN UP NOW</Button>
        </Link>
        <Button> Test </Button>
      </div>
    </div>
  )
}

export default Home
