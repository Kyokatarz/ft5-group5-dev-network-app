import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Popover,
} from '@material-ui/core'
import React, { useState } from 'react'
import DeleteCommentIcon from '@material-ui/icons/DeleteOutlineOutlined'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined'

import MoreOptionsIcon from '@material-ui/icons/MoreHoriz'
import {
  sendRequestToDeleteComment,
  sendRequestToLikeComment,
} from '../../actions/post'
import useUserContext from '../../hooks/useUserContext'

type SingleCommentProps = {
  postId: string
  commentUserId: string
  commentId: string
  likes: string[]
  content: string
  firstName: string
  lastName: string
}

const SingleComment: React.FC<SingleCommentProps> = ({
  postId,
  commentId,
  likes,
  content,
  firstName,
  lastName,
}) => {
  const [anchorPopoverEl, setAnchorPopoverEl] = useState(null)
  const { dispatchAsync, state } = useUserContext()
  const userId = state.user.id

  const [isLikedComment, setIsLikedComment] = useState(likes.includes(userId))
  const [numberOfLikes, setNumberOfLikes] = useState(likes?.length || 0)

  const onLikeComment = () => {
    dispatchAsync(sendRequestToLikeComment(postId, commentId))
    isLikedComment
      ? setNumberOfLikes(numberOfLikes - 1)
      : setNumberOfLikes(numberOfLikes + 1)
    setIsLikedComment(!isLikedComment)
  }

  const onMoreOptionsClick = (event: React.MouseEvent) => {
    setAnchorPopoverEl(event.currentTarget)
  }

  const handleMoreOptionsClose = () => {
    setAnchorPopoverEl(null)
  }

  const onDeleteCommentClick = () => {
    dispatchAsync(sendRequestToDeleteComment(postId, commentId))
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sizes="small" />}
        action={
          <IconButton onClick={onMoreOptionsClick}>
            <MoreOptionsIcon fontSize="small" />
          </IconButton>
        }
        title={firstName + ' ' + lastName}
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
        <Button onClick={onDeleteCommentClick}>
          <DeleteCommentIcon />
          Delete Comment
        </Button>
      </Popover>
      <Grid container direction="column">
        <Grid item>{content}</Grid>
        <Grid item>
          {numberOfLikes} <LikeIcon />
        </Grid>
        <Divider />
        <Grid item>
          <Button
            size="small"
            color={isLikedComment ? 'primary' : 'default'}
            onClick={onLikeComment}
          >
            Like
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default React.memo(SingleComment)
