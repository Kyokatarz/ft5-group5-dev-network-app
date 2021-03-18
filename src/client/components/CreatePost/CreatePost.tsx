import {
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from '@material-ui/core'
import React, { useState } from 'react'

import CreatePostModal from '../CreatePostModal/'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 115,
      marginBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    gridContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: '50%',
    },
    textFieldContainer: {
      position: 'relative',
    },
    textField: {
      width: '100%',
    },
    textFieldOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      color: 'red',
      top: 0,
      left: 0,
      cursor: 'pointer',
    },
  })
)

const CreatePost = () => {
  const classes = useStyles()
  const [modalState, setModalState] = useState(false)

  const openModal = () => {
    setModalState(true)
  }

  const closeModal = () => {
    setModalState(false)
  }

  return (
    <>
      <Paper className={classes.container}>
        <Grid container className={classes.gridContainer} spacing={1}>
          <Grid item xs={1} className={classes.avatarContainer}>
            <Avatar className={classes.avatar} />
          </Grid>

          <Grid item xs={11} className={classes.textFieldContainer}>
            <TextField
              className={classes.textField}
              label="What's on your mind?"
              variant="outlined"
              color="primary"
              disabled
            />
            <div className={classes.textFieldOverlay} onClick={openModal} />
          </Grid>
        </Grid>
      </Paper>
      <CreatePostModal modalState={modalState} closeModal={closeModal} />
    </>
  )
}

export default React.memo(CreatePost)
