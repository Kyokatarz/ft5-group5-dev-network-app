import { Avatar, Grid, TextField } from '@material-ui/core'
import React, { FormEvent, useState } from 'react'
import { sendRequestToComment } from '../../actions/user'
import useUserContext from '../../hooks/useUserContext'

type CommentBoxProps = {
  postId: string
}

const CommentBox: React.FC<CommentBoxProps> = ({ postId }) => {
  const { dispatchAsync } = useUserContext()
  const [commentText, setCommentText] = useState('')
  const onSubmitComment = (event: FormEvent) => {
    event.preventDefault()
    dispatchAsync(sendRequestToComment(postId, commentText))
    setCommentText('')
  }

  React.useEffect(() => {
    console.log(commentText)
  })
  return (
    <Grid container>
      <Grid item xs={1}>
        <Avatar alt="avatar" src="https://i.imgur.com/WgXR4f7.jpg" />
      </Grid>
      <Grid item xs={7}>
        <form onSubmit={onSubmitComment}>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
        </form>
      </Grid>
    </Grid>
  )
}

export default React.memo(CommentBox)
