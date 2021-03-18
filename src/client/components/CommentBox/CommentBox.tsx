import {
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import React, { FormEvent, useState } from 'react'
import { sendRequestToComment } from '../../actions/user'
import useStateContext from '../../hooks/useStateContext'

type CommentBoxProps = {
  postId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentBoxContainer: {
      marginTop: theme.spacing(1),
    },
  })
)

const CommentBox: React.FC<CommentBoxProps> = ({ postId }) => {
  const classes = useStyles()
  const { dispatchAsync } = useStateContext()
  const [commentText, setCommentText] = useState('')
  const onSubmitComment = (event: FormEvent) => {
    event.preventDefault()
    dispatchAsync(sendRequestToComment(postId, commentText))
    setCommentText('')
  }

  return (
    <Grid container className={classes.commentBoxContainer}>
      <Grid item xs={1}>
        <Avatar alt="avatar" />
      </Grid>
      <Grid item xs={10}>
        <form onSubmit={onSubmitComment}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            required
          />
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(CommentBox)
