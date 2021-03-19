import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
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
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone'
import MoreOptionsIcon from '@material-ui/icons/MoreHoriz'
import DeletePostIcon from '@material-ui/icons/DeleteOutlineOutlined'

import { Comment } from '../../types'
import useStateContext from '../../hooks/useStateContext'
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
  profileLastName: string
  profileFirstName: string
  profileId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postContent: {
      height: 70,
    },
    likeAndCommentDisplay: {
      paddingLeft: '30px',
      paddingRight: '30px',
      height: '50px',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    numberOfLikesContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dangerButton: {
      color: theme.palette.error.main,
    },
    icons: {
      margin: 5,
    },
  })
)

const SinglePost: React.FC<SinglePostProps> = ({
  id: postId,
  likes,
  content,
  date: dateString,
  comments,
  profileLastName,
  profileFirstName,
  profileId,
}) => {
  const classes = useStyles()
  const { dispatchAsync, state } = useStateContext()
  const userId = state.user?.user?.id
  const date = new Date(Number(dateString))

  const [likeArray, setLikeArray] = useState(likes)
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
    if (likeArray.includes(userId)) {
      setNumberOfLikes(numberOfLikes - 1)
      setLikeArray((prev) => prev.filter((id) => id !== userId))
    } else {
      setNumberOfLikes(numberOfLikes + 1)
      setLikeArray((prev) => prev.concat(userId))
    }
  }

  return (
    <Card>
      <Container>
        <CardHeader
          avatar={<Avatar>K</Avatar>}
          title={
            profileFirstName && profileLastName
              ? `${profileFirstName} ${profileLastName}`
              : 'Unnamed User'
          }
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
          {profileId === state.user?.user?.id && (
            <Button
              className={classes.dangerButton}
              onClick={onDeletePostClick}
            >
              <DeletePostIcon />
              Delete Post
            </Button>
          )}
        </Popover>
        <CardContent>
          <Container className={classes.postContent}>
            <Typography variant="body1">{content}</Typography>
          </Container>

          <Grid container spacing={1} className={classes.likeAndCommentDisplay}>
            <Grid item className={classes.numberOfLikesContainer}>
              <Typography>{likeArray.length}</Typography>

              <ThumbUpIcon className={classes.icons} />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {comments?.length}{' '}
                {comments?.length <= 1 ? 'Comment' : 'Comments'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <CardActions>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  color={likeArray.includes(userId) ? 'primary' : 'default'}
                  onClick={onLikePost}
                >
                  <ThumbUpTwoToneIcon className={classes.icons} /> Like
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth>
                  <CommentTwoToneIcon className={classes.icons} /> Comment
                </Button>
              </Grid>
            </Grid>
          </CardActions>
          <Divider variant="middle" />
          <CommentBox postId={postId} />
          <CommentContainer comments={comments} postId={postId} />
        </CardContent>
      </Container>
    </Card>
  )
}

export default React.memo(SinglePost)
