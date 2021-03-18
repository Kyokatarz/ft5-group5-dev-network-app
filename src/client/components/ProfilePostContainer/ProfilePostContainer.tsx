import { Grid } from '@material-ui/core'
import React from 'react'

import useStateContext from '../../hooks/useStateContext'
import { Post } from '../../types'
import SinglePost from '../SinglePost'

type ProfilePostContainerProps = {
  posts: Post[]
  profileFirstName: string
  profileLastName: string
}

const ProfilePostContainer: React.FC<ProfilePostContainerProps> = ({
  posts: postsInProps,
  profileFirstName,
  profileLastName,
}) => {
  const { state } = useStateContext()
  const postsInState = state.posts?.posts
  const renderingPosts = state.posts.usingProps ? postsInProps : postsInState

  React.useEffect(() => {
    console.log(state)
  })

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
          />
        </Grid>
      )) || 'Empty'}
    </Grid>
  )
}

export default ProfilePostContainer
