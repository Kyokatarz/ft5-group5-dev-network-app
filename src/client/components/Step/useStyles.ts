import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // maxHeight: "80%",
    borderRadius: 3,
  },
  icon: {
    margin: 5,
    color: theme.palette.primary.light,
    fontSize: 64,
    // width: 64,
    // height: 64,
  },
  title: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#74a353',
    textTransform: 'uppercase',
    margin: 5,
  },
  text: {
    textAlign: 'justify',
    fontSize: '1.5rem',
  },
}))

export default useStyles
