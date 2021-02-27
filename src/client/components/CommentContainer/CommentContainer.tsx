import React from 'react'

import { Comment } from '../../types'
import SingleComment from '../SingleComment'

type CommentContainerProps = {
  comments: Comment[]
  postId: string
}

const CommentContainer: React.FC<CommentContainerProps> = ({
  comments,
  postId,
}) => {
  return (
    <div>
      {comments.map((comment) => (
        <SingleComment
          postId={postId}
          commentId={comment.id}
          commentUserId={comment.userId}
          content={comment.content}
          likes={comment.likes}
          key={comment.id}
        />
      ))}
    </div>
  )
}

export default CommentContainer
