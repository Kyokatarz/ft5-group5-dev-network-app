import mongoose from 'mongoose'

import { errorHandler, getPayloadFromJwt, NOT_FOUND_ERROR, NO_TOKEN } from '.'
import Post from '../models/Post'
import User from '../models/User'
import { GraphQLContext } from '../types'

export const getTokenFromContext = (_context: GraphQLContext) => {
  try {
    console.log('cookie', _context.cookie)
    const token = _context.cookie?.token
    if (!token) throw NO_TOKEN
    return token
  } catch (err) {
    errorHandler(err)
  }
}

export const findUserById = async (userId: mongoose.Types.ObjectId) => {
  try {
    const user = await User.findById(userId)
    if (!user) throw NOT_FOUND_ERROR
    return user
  } catch (err) {
    errorHandler(err)
  }
}

export const findPostById = async (postId: mongoose.Types.ObjectId) => {
  try {
    const post = await Post.findById(postId)
    if (!post) throw NOT_FOUND_ERROR

    return post
  } catch (err) {
    errorHandler(err)
  }
}
