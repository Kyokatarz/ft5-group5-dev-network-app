import {
  errorHandler,
  getPayloadFromJwt,
  NOT_AUTHORISED_ERROR,
  NOT_FOUND_ERROR,
  NO_TOKEN,
} from '../../helpers'
import Post from '../../models/Post'
import User from '../../models/User'
import { GraphQLContext } from '../../types'

export const getPostById = async (postId: string) => {
  try {
    const post = await Post.findById(postId)
    if (!post) return NOT_FOUND_ERROR

    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const deletePost = async (
  _context: GraphQLContext,
  _args: { postId: string }
) => {
  try {
    const { postId } = _args
    const token = _context.cookie?.token
    if (!token) throw NO_TOKEN

    const userId = getPayloadFromJwt(token).id

    const user = await User.findById(userId)
    if (!user) throw NOT_FOUND_ERROR

    const userPosts = [...user.posts].map((id) => id.toString())

    console.log(userPosts)
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
