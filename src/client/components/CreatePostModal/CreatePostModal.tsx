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
  Theme,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import React from 'react'

type CreatePostModalProps = {
  modalState: boolean
  closeModal: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
      width: '35vw',
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
  return (
    <Modal open={true} onClose={closeModal} className={classes.modal}>
      {/* TODO: CHANGE LATER */}
      <Card className={classes.card}>
        <CardHeader
          title="Create a new post"
          action={
            <IconButton>
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
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    label="What's on your mind?"
                    className={classes.textField}
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className={classes.postButton}
                    color="primary"
                  >
                    Post
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default React.memo(CreatePostModal)
