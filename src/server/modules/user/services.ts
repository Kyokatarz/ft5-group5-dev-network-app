import bcrypt from 'bcryptjs'

import {
  errorHandler,
  Identification_Duplicated,
  Credential_Error,
} from '../../helpers'
import { UserDocument } from '../../models/User'
import User from '../../models/User'

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
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw Identification_Duplicated
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
      email,
      password: hashedPassword,
    })
    await user.save()
    return { email, password }
  } catch (err) {
    errorHandler(err)
  }
}

export const loginUser = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw Identification_Duplicated
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw Credential_Error
    return user //TODO: fix when we have jwt
  } catch (err) {
    errorHandler(err)
  }
}

export const updateUserProfile = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> => {
  try {
    const user = await User.findById(userId).select('-password')
    if (!user) {
      throw Credential_Error
    }
    if (update.firstName) user.firstName = update.firstName
    if (update.lastName) user.lastName = update.lastName
    if (update.email) user.email = update.email
    if (update.image) user.image = update.image
    if (update.employmentStatus) user.employmentStatus = update.employmentStatus
    if (update.company) user.company = update.company
    return user.save()
  } catch (err) {
    errorHandler(err)
  }
}

export const forgotPasswordRequest = async (email: string) => {
  return
}

export const createUserPost = async () => {
  return
}

export const deleteUserPost = async () => {
  return
}

export const createUserComment = async () => {
  return
}

export const deleteUserComment = async () => {
  return
}
