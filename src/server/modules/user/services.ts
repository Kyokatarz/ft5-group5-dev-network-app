import bcrypt from 'bcryptjs'

import {
  errorHandler,
  setCookie,
  IDENTIFICATION_DUPLICATED,
  CREDENTIAL_ERROR,
  NOT_FOUND_ERROR,
  NO_TOKEN,
  getPayloadFromJwt,
} from '../../helpers'
import { GraphQLContext } from '../../types'
import User, { UserDocument } from '../../models/User'
import Post, { PostDocument } from '../../models/Post'
import * as yupSchemas from './yupSchemas/yupSchemas'
import { logInUserArgs, signUpUserArgs } from '../../types/user'

export const getUserById = async (userId: string): Promise<UserDocument> => {
  try {
    const user = await User.findById(userId).select('-password').exec()
    if (!user) throw NOT_FOUND_ERROR
    return user
  } catch (err) {
    errorHandler(err)
  }
}

export const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find().sort({ email: 1 }).exec()
}

export const signupUser = async (
  context: GraphQLContext,
  _args: signUpUserArgs
): Promise<Partial<UserDocument>> => {
  try {
    const { email, password, lastName, firstName } = _args
    await yupSchemas.yupUserInfo.validate(
      {
        email,
        password,
      },
      { abortEarly: false }
    )

    const userExists = await User.findOne({ email })
    if (userExists) {
      throw IDENTIFICATION_DUPLICATED
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
      lastName,
      firstName,
      email,
      password: hashedPassword,
    })
    await user.save()
    await setCookie(context, { id: user.id })

    return { id: user.id, email, firstName, lastName } //maybe we can only return 'Success'
  } catch (err) {
    errorHandler(err)
  }
}

export const loginUser = async (
  context: GraphQLContext,
  _args: logInUserArgs
): Promise<Partial<UserDocument>> => {
  try {
    const { email, password } = _args
    const user = await User.findOne({ email })
    if (!user) {
      throw CREDENTIAL_ERROR
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw CREDENTIAL_ERROR

    await setCookie(context, { id: user.id })

    return user //maybe we can only return 'Success'
  } catch (err) {
    errorHandler(err)
  }
}

export const updateUserProfile = async (
  _context: GraphQLContext,
  update: Partial<UserDocument>
): Promise<UserDocument> => {
  try {
    const {
      firstName,
      lastName,
      email,
      image,
      employmentStatus,
      company,
    } = update

    const token = _context.cookie?.token

    if (!token) {
      throw NO_TOKEN
    }

    await yupSchemas.yupUserUpdate.validate(
      {
        firstName,
        lastName,
        email,
        image,
        employmentStatus,
        company,
      },
      { abortEarly: false }
    )
    const payload = getPayloadFromJwt(token)
    console.log('PAYLOAD:', payload)
    const userId = payload.id

    const user = await User.findById(userId).select('-password')
    if (!user) {
      throw CREDENTIAL_ERROR
    }
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    if (image) user.image = image
    if (employmentStatus) user.employmentStatus = employmentStatus
    if (company) user.company = company
    return user.save()
  } catch (err) {
    errorHandler(err)
  }
}

export const forgotPasswordRequest = async (email: string) => {
  return
}

export const userCreatePost = async (
  _context: GraphQLContext,
  postContent: string
): Promise<PostDocument> => {
  try {
    console.log('OKAY')
    const token = _context.cookie?.token
    if (!token) {
      throw NO_TOKEN
    }

    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const user = await User.findById(userId)
    if (!user) {
      throw NOT_FOUND_ERROR
    }

    const post = new Post({
      content: postContent,
      date: new Date(),
      onModel: 'user',
    })

    const userPosts = user.posts
    console.log(post._id)
    userPosts.push(post._id)

    await user.save()
    await post.save()

    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const userDeletePost = async (
  _context: GraphQLContext,
  postId: string
): Promise<PostDocument> => {
  try {
    const token = _context.cookie?.token
    if (!token) {
      throw NO_TOKEN
    }

    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const user = await User.findById(userId)
    if (!user) {
      throw NOT_FOUND_ERROR
    }

    const post = await Post.findById(postId)
    if (!post) {
      throw NOT_FOUND_ERROR
    }

    //make sure the posts are on the right order
    const userPosts = user.posts
    userPosts.pop()

    await user.save()
    await post.save()
    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const userCreateComment = async () => {
  return
}

export const userDeleteComment = async () => {
  return
}

export const checkCookieAndRetrieveUser = async (_context: GraphQLContext) => {
  try {
    console.log(`[${new Date().toLocaleString()}] ` + 'Checking cookie ')
    console.log(_context.cookie.token)
    if (!_context.cookie.token) throw NO_TOKEN

    const token = _context.cookie.token
    const payload = getPayloadFromJwt(token)
    const userId = payload.id
    console.log(userId)

    const user = await User.findById(userId).select('-password')
    const a = await user.populate('posts').execPopulate()

    console.log(a)
    return user
  } catch (err) {
    errorHandler(err)
  }
}

export const logOut = async (_context: GraphQLContext) => {
  setCookie(_context)
}
