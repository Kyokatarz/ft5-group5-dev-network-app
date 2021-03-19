import { Grid } from '@material-ui/core'
import React from 'react'
import { changeUsingProps, setInitPosts } from '../../actions/post'

import useStateContext from '../../hooks/useStateContext'
import { Post } from '../../types'
import SinglePost from '../SinglePost'

type ProfilePostContainerProps = {
  posts: Post[]
  profileFirstName: string
  profileLastName: string
  profileId: string
}

const ProfilePostContainer: React.FC<ProfilePostContainerProps> = ({
  posts: postsInProps,
  profileFirstName,
  profileLastName,
  profileId,
}) => {
  const { state, dispatchAsync } = useStateContext()
  const postsInState = state.posts?.posts
  const renderingPosts = postsInState

  React.useEffect(() => {
    dispatchAsync(setInitPosts(postsInProps))
  }, [postsInProps])

  if (renderingPosts?.length === 0) return <Grid container>Empty</Grid>
  else
    return (
      <Grid container direction="column" spacing={1}>
        {[...renderingPosts]?.reverse().map((post) => (
          <Grid item key={post.id}>
            <SinglePost
              id={post.id}
              likes={post.likes}
              content={post.content}
              date={post.date}
              comments={post.comments}
              profileFirstName={profileFirstName}
              profileLastName={profileLastName}
              profileId={profileId}
            />
          </Grid>
        ))}
      </Grid>
    )
}

export default ProfilePostContainer
