import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Theme,
} from '@material-ui/core'
import React, { useState } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import CommentIcon from '@material-ui/icons/Sms'
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone'
import MoreOptionsIcon from '@material-ui/icons/MoreHoriz'
import DeletePostIcon from '@material-ui/icons/DeleteOutlineOutlined'

import { Comment } from '../../types'
import useUserContext from '../../hooks/useUserContext'
import { sendRequestToLikePost } from '../../actions/user'
import CommentBox from '../CommentBox'
import CommentContainer from '../CommentContainer/CommentContainer'
import { sendRequestToDeletePost } from '../../actions/post'

type SinglePostProps = {
  id: string
  likes: string[]
  content: string
  date: string
  comments: Comment[]
  lastName: string
  firstName: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dangerButton: {
      color: theme.palette.error.main,
    },
  })
)

const SinglePost: React.FC<SinglePostProps> = ({
  id: postId,
  likes,
  content,
  date: dateString,
  comments,
  firstName,
  lastName,
}) => {
  const classes = useStyles()
  const { dispatchAsync, state } = useUserContext()
  const userId = state.user.id
  const date = new Date(Number(dateString))

  const [liked, setLiked] = useState(likes.includes(userId))
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length)
  const [anchorPopoverEl, setAnchorPopoverEl] = useState(null)

  const onMoreOptionsClick = (event: React.MouseEvent) => {
    setAnchorPopoverEl(event.currentTarget)
  }

  const handleMoreOptionsClose = () => {
    setAnchorPopoverEl(null)
  }

  const onDeletePostClick = () => {
    dispatchAsync(sendRequestToDeletePost(postId))
  }

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
        action={
          <IconButton onClick={onMoreOptionsClick}>
            <MoreOptionsIcon />
          </IconButton>
        }
      />
      <Popover
        open={!!anchorPopoverEl}
        onClose={handleMoreOptionsClose}
        anchorEl={anchorPopoverEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Button className={classes.dangerButton} onClick={onDeletePostClick}>
          <DeletePostIcon />
          Delete Post
        </Button>
      </Popover>
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
