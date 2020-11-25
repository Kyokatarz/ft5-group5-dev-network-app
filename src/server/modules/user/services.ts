import bcrypt from 'bcryptjs'

import { BadRequestError } from '../../helpers'
import { UserDocument } from '../../models/User'
import User from '../../models/User'

export const getUserById = async (id: string): Promise<UserDocument> => {
  return await User.findById(id).exec()
}

export const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find().exec()
}

export const signupUser = async (
  email: string,
  password: string
): Promise<Partial<UserDocument>> => {
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new BadRequestError(`User with ${email} already exists`)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({
    email,
    password: hashedPassword,
  })
  await user.save()
  return { email, password }
}

export const loginUser = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw 'IdentificationDuplicated'
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new BadRequestError('Invalid password')
    return user //TODO: fix when we have jwt
  } catch (err) {
    //errorHandler(err);
  }
}

export const logoutUser = async () => {
  return
}

export const updateUserProfile = async (): Promise<UserDocument> => {
  return
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
