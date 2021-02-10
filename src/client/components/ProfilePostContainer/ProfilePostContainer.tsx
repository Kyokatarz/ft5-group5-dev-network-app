import { Grid } from '@material-ui/core'
import React from 'react'

import useUserContext from '../../hooks/useUserContext'
import SinglePost from '../SinglePost'

const ProfilePostContainer = () => {
  const { state } = useUserContext()
  React.useEffect(() => {
    console.log(state)
  })
  return (
    <Grid container direction="column">
      {state.user?.posts?.map((post) => (
        <Grid item key={post.id}>
          <SinglePost
            id={post.id}
            likes={post.likes}
            content={post.content}
            date={post.date}
            comments={post.comments}
            firstName={state.user.firstName}
            lastName={state.user.lastName}
          />
        </Grid>
      )) || 'Empty'}
    </Grid>
  )
}

export default ProfilePostContainer
