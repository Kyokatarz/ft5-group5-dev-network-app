import bcrypt from 'bcryptjs'
import mongoose, { connections, Promise } from 'mongoose'

import {
  errorHandler,
  setCookie,
  IDENTIFICATION_DUPLICATED,
  CREDENTIAL_ERROR,
  NOT_FOUND_ERROR,
  getPayloadFromJwt,
  findUserById,
  findPostById,
  getTokenFromContext,
  ALREADY_CONNECTED,
  NOT_CONNECTED,
} from '../../helpers'
import { GraphQLContext } from '../../types'
import User, { UserDocument } from '../../models/User'
import Post, { PostDocument } from '../../models/Post'
import * as yupSchemas from './yupSchemas/yupSchemas'
import { logInUserArgs, signUpUserArgs } from '../../types/user'
import { MonochromePhotosTwoTone } from '@material-ui/icons'

export const getUserById = async (userId: string): Promise<UserDocument> => {
  try {
    const user = await User.findById(userId).select('-password').exec()
    if (!user) throw NOT_FOUND_ERROR
    await user
      .populate({
        path: 'posts connections',
        populate: {
          path: 'comments.user',
          select: 'firstName lastName company employmentStatus',
        },
      })
      .execPopulate()
    return user
  } catch (err) {
    errorHandler(err)
  }
}

export const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find().sort({ email: 1 }).exec()
}

export const signupUser = async (
  _context: GraphQLContext,
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
    await setCookie(_context, { id: user.id })

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

    const token = getTokenFromContext(_context)
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
    const token = getTokenFromContext(_context)
    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const user = await findUserById(userId)

    const post = new Post({
      content: postContent,
      date: new Date(),
      onModel: 'user',
    })

    //Save post to user
    const userPosts = user.posts
    userPosts.push(post._id)

    await user.save()
    await post.save()

    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const userLikePost = async (
  _context: GraphQLContext,
  postId: mongoose.Types.ObjectId
): Promise<PostDocument> => {
  try {
    const token = getTokenFromContext(_context)
    const userId = getPayloadFromJwt(token).id
    const post = await findPostById(postId)
    const user = await findUserById(userId)

    const postLikes = [...post.likes].map((like) => like.toString())
    if (postLikes.includes(userId.toString())) {
      post.likes = postLikes
        .filter((id) => id !== userId)
        .map((id) => mongoose.Types.ObjectId(id))
    } else {
      post.likes.push(mongoose.Types.ObjectId(userId))
    }
    await post.save()
    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const userCreateComment = async (
  _context: GraphQLContext,
  commentObj: { content: string; postId: mongoose.Types.ObjectId }
) => {
  try {
    const token = getTokenFromContext(_context)
    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const { content, postId } = commentObj
    const post = await findPostById(postId)

    post.comments.push({
      id: new mongoose.Types.ObjectId(),
      user: mongoose.Types.ObjectId(userId),
      content,
    })
    console.log(post.comments)
    await post.save()
    await post
      .populate({ path: 'comments.user', select: 'firstName lastName' })
      .execPopulate()
    return post
  } catch (err) {
    errorHandler(err)
  }
}

export const checkCookieAndRetrieveUser = async (_context: GraphQLContext) => {
  try {
    const token = getTokenFromContext(_context)
    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const user = await User.findById(userId).select('-password')
    if (!user) throw NOT_FOUND_ERROR
    await user
      .populate({
        path: 'posts connections',
        populate: {
          path: 'comments.user',
          select: 'firstName lastName ',
        },
      })
      .execPopulate()

    return user
  } catch (err) {
    errorHandler(err)
  }
}

export const searchUsersByName = async (searchString: string) => {
  try {
    const searchRegexArray = searchString
      .split(' ')
      .map((string) => new RegExp(string, 'i'))
    let searchResult: UserDocument[] = []

    await new Promise((resolve: any) => {
      searchRegexArray.forEach(async (regex, index) => {
        const result = await User.find({
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
          ],
        }).select('-password -posts')
        searchResult = searchResult.concat(result)
        if (index === searchRegexArray.length - 1) resolve()
      })
    })

    //This final result removes all duplicated searches.
    //Stackoverflow code
    const finalResult = searchResult.filter(
      (obj, index) => index === searchResult.findIndex((el) => el.id === obj.id)
    )

    return finalResult
  } catch (err) {
    errorHandler(err)
  }
}

export const logOut = async (_context: GraphQLContext) => {
  setCookie(_context)
}

export const connectToAnotherUser = async (
  _context: GraphQLContext,
  connectingId: string
) => {
  try {
    const token = getTokenFromContext(_context)
    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const userAskingToConnect = await User.findById(userId)
    if (!userAskingToConnect) throw NOT_FOUND_ERROR

    const userGettingConnected = await User.findById(connectingId)
    if (!userGettingConnected) throw NOT_FOUND_ERROR

    //If user is already connected
    if (
      userAskingToConnect.connections
        .map((id) => id.toString())
        .includes(connectingId)
    )
      throw ALREADY_CONNECTED

    userAskingToConnect.connections.push(mongoose.Types.ObjectId(connectingId))
    userGettingConnected.connections.push(mongoose.Types.ObjectId(userId))

    await userAskingToConnect.save()
    await userGettingConnected.save()

    return await userAskingToConnect
      .populate({ path: 'connections', select: 'firstName lastName' })
      .execPopulate()
  } catch (err) {
    errorHandler(err)
  }
}

export const disconnectFromAnotherUser = async (
  _context: GraphQLContext,
  disconnectingId: string
) => {
  try {
    const token = getTokenFromContext(_context)
    const payload = getPayloadFromJwt(token)
    const userId = payload.id

    const userAskingToDisconnect = await User.findById(userId)
    if (!userAskingToDisconnect) throw NOT_FOUND_ERROR

    const userGettingDisconnected = await User.findById(disconnectingId)
    if (!userGettingDisconnected) throw NOT_FOUND_ERROR

    //If user is not connected in the first place
    if (
      !userAskingToDisconnect.connections
        .map((id) => id.toString())
        .includes(disconnectingId)
    )
      throw NOT_CONNECTED

    userAskingToDisconnect.connections = [
      ...userAskingToDisconnect.connections,
    ].filter((id) => id.toString() !== disconnectingId)

    userGettingDisconnected.connections = [
      ...userGettingDisconnected.connections,
    ].filter((id) => id.toString() !== userId)

    await userAskingToDisconnect.save()
    await userGettingDisconnected.save()

    return await userAskingToDisconnect
      .populate({ path: 'connections', select: 'firstName lastName' })
      .execPopulate()
  } catch (err) {
    errorHandler(err)
  }
}
