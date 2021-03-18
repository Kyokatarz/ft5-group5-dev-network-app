import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import DeleteCommentIcon from '@material-ui/icons/DeleteOutlineOutlined'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined'

import MoreOptionsIcon from '@material-ui/icons/MoreHoriz'
import {
  sendRequestToDeleteComment,
  sendRequestToLikeComment,
} from '../../actions/post'
import useStateContext from '../../hooks/useStateContext'

type SingleCommentProps = {
  postId: string
  commentUserId: string
  commentId: string
  likes: string[]
  content: string
  firstName: string
  lastName: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      width: '100%',
      paddingLeft: 10,
      paddingTop: 5,
      backgroundColor: theme.palette.grey[200],
      borderRadius: 30,
      position: 'relative',
    },
    commentLikeDisplay: {
      position: 'absolute',
      right: 5,
      top: 5,
    },
  })
)

const SingleComment: React.FC<SingleCommentProps> = ({
  commentUserId,
  postId,
  commentId,
  likes,
  content,
  firstName,
  lastName,
}) => {
  const classes = useStyles()
  const [anchorPopoverEl, setAnchorPopoverEl] = useState(null)
  const { dispatchAsync, state } = useStateContext()
  const userId = state.user?.user?.id

  const [isLikedComment, setIsLikedComment] = useState(likes?.includes(userId))
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

  React.useEffect(() => {
    console.log('%cSingleComment', likes)
  })
  return (
    //  First grid container for the whole comment
    <Grid container spacing={1}>
      <Grid item xs={1}>
        <Avatar />
      </Grid>

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
      <Grid item xs={10}>
        {/* Second grid container for the name and comment content */}
        <Grid
          container
          direction="column"
          spacing={1}
          className={classes.contentContainer}
        >
          <Grid item>
            <Typography component="div">
              <Box fontWeight="fontWeightMedium">
                {firstName + ' ' + lastName}
              </Box>
            </Typography>
          </Grid>
          <Grid item>{content}</Grid>
          <Grid item className={classes.commentLikeDisplay}>
            {numberOfLikes}
            <LikeIcon fontSize="small" />
          </Grid>
          <Grid item>
            <Button
              style={{ justifyContent: 'flex-start' }}
              variant="text"
              size="small"
              color={isLikedComment ? 'primary' : 'default'}
              onClick={onLikeComment}
              disableRipple
            >
              Like
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {commentUserId === userId && (
        <Grid item xs={1}>
          <IconButton onClick={onMoreOptionsClick}>
            <MoreOptionsIcon fontSize="small" />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(SingleComment)
