import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Divider,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React, { FormEvent, useContext, useState } from 'react'

import { requestUserCreatePost } from '../../actions/user'
import { StateContext } from '../../context/auth'

type CreatePostModalProps = {
  modalState: boolean
  closeModal: () => void
}

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
      minWidth: '45vw',
      height: 'auto',
    },
    textField: {
      width: '100%',
      maxHeight: '20vh',
    },
    postButton: {
      width: '100%',
    },
  })
)

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  modalState,
  closeModal,
}) => {
  const classes = useStyles()
  const { dispatchAsync } = useContext(StateContext)
  const [content, setContent] = useState('')
  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatchAsync(requestUserCreatePost(content))
    closeModal()
    setContent('')
  }

  return (
    <Modal open={modalState} onClose={closeModal} className={classes.modal}>
      <Card className={classes.card}>
        <CardHeader
          title="Create a new post"
          action={
            <IconButton onClick={closeModal}>
              <CloseIcon color="secondary" />
            </IconButton>
          }
        />
        <Divider light variant="middle" />
        <CardContent>
          {/* Grid container for the whole CardContent */}
          <Grid container>
            <Grid item xs={1}>
              <Avatar alt="avatar" src="https://i.imgur.com/WgXR4f7.jpg" />
            </Grid>
            <Grid item xs={11}>
              {/* Grid container for the TextField and Button */}
              <form onSubmit={submitHandler}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      label="What's on your mind?"
                      className={classes.textField}
                      rows={5}
                      required
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      className={classes.postButton}
                      color="primary"
                      type="submit"
                    >
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default React.memo(CreatePostModal)
