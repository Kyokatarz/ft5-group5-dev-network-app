import mongoose from 'mongoose'

import { NOT_FOUND_ERROR, NO_TOKEN } from '../helpers'
import Post from '../models/Post'
import User from '../models/User'
import { GraphQLContext } from '../types'

export const getTokenFromContext = (_context: GraphQLContext) => {
  console.log('cookie', _context.cookie)
  const token = _context.cookie?.token
  if (!token) throw NO_TOKEN
  return token
}

export const findUserById = async (
  userId: mongoose.Types.ObjectId | string
) => {
  const user = await User.findById(userId)
  if (!user) throw NOT_FOUND_ERROR
  return user
}

export const findPostById = async (
  postId: mongoose.Types.ObjectId | string
) => {
  const post = await Post.findById(postId)
  if (!post) throw NOT_FOUND_ERROR

  return post
}
