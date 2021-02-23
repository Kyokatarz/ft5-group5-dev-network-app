import {
  errorHandler,
  findPostById,
  findUserById,
  getPayloadFromJwt,
  NOT_AUTHORISED_ERROR,
  NOT_FOUND_ERROR,
} from '../../helpers'
import { getTokenFromContext } from '../../helpers/'
import Post from '../../models/Post'
import { GraphQLContext } from '../../types'

export const deletePost = async (
  _context: GraphQLContext,
  _args: { postId: string }
) => {
  try {
    const token = getTokenFromContext(_context)
    const userId = getPayloadFromJwt(token).id
    const user = await findUserById(userId)

    const userPosts = [...user.posts].map((id) => id.toString())

    const { postId } = _args

    if (!userPosts.includes(postId))
      //if the user is trying to delete a post that's not theirs, deny it
      throw NOT_AUTHORISED_ERROR

    const post = await Post.findByIdAndDelete(postId)
    if (!post) throw NOT_FOUND_ERROR

    user.posts = userPosts.filter((id) => id !== postId)

    await user.save()
    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const deleteComment = async (_context: any, _args: any) => {
  try {
    const { postId, commentId } = _args
    const token = getTokenFromContext(_context)
    const userId = getPayloadFromJwt(token).id

    const post = await findPostById(postId)
    const postComments = [...post.comments]
    const foundComment = postComments.find(
      (comment) => comment.id === commentId
    )
    if (!foundComment) throw NOT_FOUND_ERROR
    if (foundComment.userId.toString() !== userId) throw NOT_AUTHORISED_ERROR

    post.comments = postComments.filter((comment) => comment.id !== commentId)
    await post.save()
    return post
  } catch (err) {
    errorHandler(err)
  }
  return
}
