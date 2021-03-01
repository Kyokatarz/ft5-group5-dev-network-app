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
          firstName={comment.user?.firstName}
          lastName={comment.user?.lastName}
          commentId={comment.id}
          commentUserId={comment.user?.id}
          content={comment.content}
          likes={comment.likes}
          key={comment.id}
        />
      ))}
    </div>
  )
}

export default CommentContainer
