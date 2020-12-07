import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // maxHeight: "80%",
    borderRadius: 3,
  },
  icon: {
    margin: '5%',
    color: '#74a353',
    // width: 60,
    // height: 60,
  },
  title: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#74a353',
    textTransform: 'uppercase',
    margin: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
})

export default useStyles
