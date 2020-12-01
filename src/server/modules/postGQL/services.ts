import { errorHandler, NOT_FOUND_ERROR } from '../../helpers'
import Post from '../../models/Post'

export const getPostById = async (postId: string) => {
  try {
    const post = await Post.findById(postId)
    if (!post) return NOT_FOUND_ERROR

    return post
  } catch (err) {
    errorHandler(err)
  }
}
