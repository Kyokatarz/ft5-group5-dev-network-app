import { errorHandler, NOT_FOUND_ERROR } from '../../helpers'
import Post, { PostDocument } from '../../models/Post'

export const getPostById = async (postId: string): Promise<PostDocument> => {
  try {
    console.log(postId)
    const post = await Post.findById(postId)
    if (!post) throw NOT_FOUND_ERROR
    return post
  } catch (err) {
    errorHandler(err)
  }

  return
}
