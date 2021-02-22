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
import React, { useState } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import CommentIcon from '@material-ui/icons/Sms'
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone'

import { Comment } from '../../types'
import useUserContext from '../../hooks/useUserContext'
import { sendRequestToLikePost } from '../../actions/user'
import CommentBox from '../CommentBox'
import CommentContainer from '../CommentContainer/CommentContainer'

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
  id: postId,
  likes,
  content,
  date: dateString,
  comments,
  firstName,
  lastName,
}) => {
  const { dispatchAsync, state } = useUserContext()
  const userId = state.user.id
  const date = new Date(Number(dateString))

  const [liked, setLiked] = useState(likes.includes(userId))
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length)

  const onLikePost = () => {
    dispatchAsync(sendRequestToLikePost(postId))
    liked
      ? setNumberOfLikes(numberOfLikes - 1)
      : setNumberOfLikes(numberOfLikes + 1)
    setLiked(!liked)
  }
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>K</Avatar>}
        title={`${firstName} ${lastName}` || 'Unnamed User'}
        subheader={date.toDateString() + ', ' + date.toLocaleTimeString()}
      />
      <CardContent>
        {content}
        <Divider />
        <Grid container spacing={1}>
          <Grid item>
            {numberOfLikes}
            <ThumbUpIcon />
          </Grid>
          <Grid item>
            {comments.length}
            <CommentIcon />
          </Grid>
        </Grid>

        <Divider />
        <CardActions>
          <Grid container>
            <Grid item xs={6}>
              <Button
                fullWidth
                color={liked ? 'primary' : 'default'}
                onClick={onLikePost}
              >
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
        <CommentBox postId={postId} />
        <Divider />
        <CommentContainer comments={comments} />
      </CardContent>
    </Card>
  )
}

export default SinglePost
