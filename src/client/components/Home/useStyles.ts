import { makeStyles } from '@material-ui/core/styles'
//https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
// import * as bg from './bg.svg'
// const bg = './bg.svg'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: "#74a353",
    // backgroundImage: `url(${bg})`
  },
  container: {
    height: '100vh',
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
    color: 'gray',
  },
  subTitle: {
    fontSize: '2rem',
    color: 'gray',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
    height: '50%',
    width: '90%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
    margin: '3%',
  },
})

export default useStyles
