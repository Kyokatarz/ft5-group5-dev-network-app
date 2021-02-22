import React from 'react'

import { Comment } from '../../types'
import SingleComment from '../SingleComment'

type CommentContainerProps = {
  comments: Comment[]
}

const CommentContainer: React.FC<CommentContainerProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <SingleComment
          userId={comment.userId}
          content={comment.content}
          likes={comment.likes}
          key={Math.random()}
        />
      ))}
    </div>
  )
}

export default CommentContainer
