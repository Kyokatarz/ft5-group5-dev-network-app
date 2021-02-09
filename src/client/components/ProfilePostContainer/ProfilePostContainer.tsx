import React from 'react'

import useUserContext from '../../hooks/useUserContext'
import SinglePost from '../SinglePost'

const ProfilePostContainer = () => {
  const { state } = useUserContext()
  React.useEffect(() => {
    console.log(state)
  })
  return (
    <div>
      {state.user?.posts?.map((post) => (
        <SinglePost
          id={post.id}
          likes={post.likes}
          content={post.content}
          date={post.date}
          comments={post.comments}
          key={post.id}
        />
      )) || 'Empty'}
    </div>
  )
}

export default ProfilePostContainer
