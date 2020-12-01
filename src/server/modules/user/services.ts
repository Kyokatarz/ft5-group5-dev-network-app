import bcrypt from 'bcryptjs'

import {
  errorHandler,
  IDENTIFICATION_DUPLICATED,
  CREDENTIAL_ERROR,
  NOT_FOUND_ERROR,
} from '../../helpers'
import User, { UserDocument } from '../../models/User'
import Post, { PostDocument } from '../../models/Post'
import * as yupSchemas from './yupSchemas/yupSchemas'

export const getUserById = async (userId: string): Promise<UserDocument> => {
  return await User.findById(userId).exec()
}

export const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find().sort({ email: 1 }).exec()
}

export const signupUser = async (
  email: string,
  password: string
): Promise<Partial<UserDocument>> => {
  try {
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
      email,
      password: hashedPassword,
    })
    await user.save()
    return { id: user.id, email } //TODO: fix when we have jwt
  } catch (err) {
    errorHandler(err)
  }
}

export const loginUser = async (
  email: string,
  password: string
): Promise<Partial<UserDocument>> => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw IDENTIFICATION_DUPLICATED
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw CREDENTIAL_ERROR
    return { id: user.id, email } //TODO: fix when we have jwt
  } catch (err) {
    errorHandler(err)
  }
}

export const updateUserProfile = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> => {
  try {
    const {
      firstName,
      lastName,
      email,
      image,
      // employmentStatus,
      company,
    } = update

    await yupSchemas.yupUserUpdate.validate(
      {
        firstName,
        lastName,
        email,
        image,
        // employmentStatus,
        company,
      },
      { abortEarly: false }
    )

    const user = await User.findById(userId).select('-password')
    if (!user) {
      throw CREDENTIAL_ERROR
    }
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    if (image) user.image = image
    //if (employmentStatus) user.employmentStatus = employmentStatus
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
  userId: string,
  postContent: string
): Promise<PostDocument> => {
  try {
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
    userPosts.push(post)

    await user.save()
    await post.save()
    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const userDeletePost = async (
  userId: string,
  postId: string
): Promise<PostDocument> => {
  try {
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
