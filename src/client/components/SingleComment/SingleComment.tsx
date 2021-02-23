import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Popover,
} from '@material-ui/core'
import React, { useState } from 'react'
import DeleteCommentIcon from '@material-ui/icons/DeleteOutlineOutlined'

import MoreOptionsIcon from '@material-ui/icons/MoreHoriz'
import { sendRequestToDeleteComment } from '../../actions/post'
import useUserContext from '../../hooks/useUserContext'

type SingleCommentProps = {
  postId: string
  userId: string
  commentId: string
  likes: string[]
  content: string
}

const SingleComment: React.FC<SingleCommentProps> = ({
  postId,
  commentId,
  likes,
  content,
}) => {
  const [anchorPopoverEl, setAnchorPopoverEl] = useState(null)
  const { dispatchAsync } = useUserContext()

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
      <Grid container>
        <Grid item>
          {commentId}
          {content}
          {likes?.length || 0}
        </Grid>
      </Grid>
    </Card>
  )
}

export default React.memo(SingleComment)
