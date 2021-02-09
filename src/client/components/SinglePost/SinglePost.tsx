import { Card } from '@material-ui/core'

import { Comment } from '../../types'

type SinglePostProps = {
  id: string
  likes: string[]
  content: string
  date: string
  comments: Comment[]
}

const SinglePost: React.FC<SinglePostProps> = () => {
  return <Card></Card>
}

export default SinglePost
