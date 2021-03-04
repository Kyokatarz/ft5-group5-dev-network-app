import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import React from 'react'

import { Comment } from '../../types'
import SingleComment from '../SingleComment'

type CommentContainerProps = {
  comments: Comment[]
  postId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentContainer: {
      marginTop: theme.spacing(2),
    },
  })
)

const CommentContainer: React.FC<CommentContainerProps> = ({
  comments,
  postId,
}) => {
  const classes = useStyles()
  return (
    <Grid
      container
      className={classes.commentContainer}
      direction="column"
      spacing={2}
    >
      {comments.map((comment) => (
        <Grid item key={comment.id}>
          <SingleComment
            postId={postId}
            firstName={comment.user?.firstName}
            lastName={comment.user?.lastName}
            commentId={comment.id}
            commentUserId={comment.user.id}
            content={comment.content}
            likes={comment.likes}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default CommentContainer
