import { makeStyles, Theme } from '@material-ui/core/styles'
import { relative } from 'path'
//https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
// import * as bg from './bg.svg'
// const bg = './bg.svg'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 64,
    // backgroundColor: "#74a353",
    // backgroundImage: `url(${bg})`
  },
  relative: {
    position: 'relative',
  },
  image: {
    height: '100vh',
    width: '99vw',
    objectFit: 'cover',
    filter: 'blur(1px)',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    background: 'rgba(0,0,0,0.5)',
    width: '80vw',
    height: '80vh',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  block: {
    width: '80%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '3rem',
    color: theme.palette.primary.light,
  },
  subTitle: {
    fontSize: '2rem',
    color: 'white',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    '& a': {
      textDecoration: 'none',
    },
  },
  stepsContainer: {
    // height: '50%',
    // width: '90%',
    // display: 'grid',
    // gridTemplateColumns: 'repeat(3, 30%)',
    // gridGap: '5%',
    // margin: '3%',
    [theme.breakpoints.down('md')]: {
      marginTop: 10,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default useStyles
