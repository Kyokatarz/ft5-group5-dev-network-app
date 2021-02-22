import { Avatar, Grid } from '@material-ui/core'
import React from 'react'
import { Comment } from '../../types'

type SingleCommentProps = {
  userId: string
  likes: string[]
  content: string
}

const SingleComment: React.FC<SingleCommentProps> = ({
  userId,
  likes,
  content,
}) => {
  return (
    <div>
      <Grid container>
        <Grid item>
          <Avatar />
        </Grid>
        <Grid item>
          {content}
          {likes?.length || 0}
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleComment
