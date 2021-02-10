import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@material-ui/core'
import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import CommentIcon from '@material-ui/icons/Sms'
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone'

import { Comment } from '../../types'

type SinglePostProps = {
  id: string
  likes: string[]
  content: string
  date: string
  comments: Comment[]
  lastName: string
  firstName: string
}

const SinglePost: React.FC<SinglePostProps> = ({
  id,
  likes,
  content,
  date,
  comments,
  firstName,
  lastName,
}) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>K</Avatar>}
        title={`${firstName} ${lastName}` || 'Unnamed User'}
        subheader={new Date(Number(date)).toLocaleString()}
      />
      <Divider variant="middle" />
      <CardContent>
        {content}
        <Divider />
        <Grid container spacing={1}>
          <Grid item>
            {likes.length}
            <ThumbUpIcon />
          </Grid>
          <Grid item>
            {comments.length}
            <CommentIcon />
          </Grid>
        </Grid>

        <CardActions>
          <Grid container>
            <Grid item xs={6}>
              <Button fullWidth>
                <ThumbUpTwoToneIcon />
                Like
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth>
                <CommentTwoToneIcon />
                Comment
              </Button>
            </Grid>
          </Grid>
        </CardActions>
        <Divider />
      </CardContent>
    </Card>
  )
}

export default SinglePost
