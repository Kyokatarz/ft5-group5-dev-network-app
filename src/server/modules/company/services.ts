import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { CompanyDocument } from '../../models/Company'
import Company from '../../models/Company'
import {
  CREDENTIAL_ERROR,
  IDENTIFICATION_DUPLICATED,
  NOT_FOUND_ERROR,
  errorHandler,
  BadRequestError,
  setCookie,
  getPayloadFromJwt,
  NO_TOKEN,
} from '../../helpers'
import { GraphQLContext } from '../../types'
import Post, { PostDocument } from '../../models/Post'
import * as yupSchemas from './yupSchemas/yupSchemas'

/*===========+
 |UNPROTECTED|
 +===========*/
//Get all registered companies
export const getAllCompanies = async () => {
  return await Company.find().exec()
}

//Create a new company account
export const createNewCompany = async (
  companyInfo: CompanyDocument,
  context: GraphQLContext
): Promise<Partial<CompanyDocument>> => {
  const { email, password, companyName } = companyInfo

  try {
    await yupSchemas.yupCompanyInfo.validate(
      {
        email,
        password,
        companyName,
      },
      { abortEarly: false }
    )

    const companyExists = await Company.findOne({ email })
    if (companyExists) {
      throw IDENTIFICATION_DUPLICATED
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const company = new Company({
      email,
      password: hashedPassword,
      companyName,
    })

    await company.save()
    await setCookie(context, { id: company.id })
    return { id: company.id, email, companyName }
  } catch (err) {
    errorHandler(err)
  }
}
//Sign in as a company
export const signInCompany = async (
  companyInfo: CompanyDocument,
  context: GraphQLContext
): Promise<Partial<CompanyDocument>> => {
  const { email, password } = companyInfo
  const company = await Company.findOne({ email })
  if (!company) throw CREDENTIAL_ERROR

  const { password: hashedPassword } = company
  const match = await bcrypt.compare(password, hashedPassword)
  if (!match) throw CREDENTIAL_ERROR

  await setCookie(context, { id: company.id })

  return { id: company.id, email }
}

/*=========+
 |Protected|
 +=========*/
//Create a new post
export const companyCreatePost = async (
  _context: GraphQLContext,
  postContent: string
): Promise<PostDocument> => {
  try {
    const token = _context.cookie?.token
    console.log('context:', _context)
    if (!token) {
      throw NO_TOKEN
    }

    const payload = getPayloadFromJwt(token)
    console.log('PAYLOAD:', payload)
    const companyId = payload.id

    const company = await Company.findById(companyId).exec()
    if (!company) throw NOT_FOUND_ERROR

    const post = new Post({
      content: postContent,
      date: new Date(),
      onModel: 'company',
    })

    const companyPosts = company.posts
    companyPosts.unshift(post)

    await post.save()
    await company.save()

    return post
  } catch (err) {
    errorHandler(err)
  }
}

//Update Company Info
export const updateCompanyInfo = async (
  _context: GraphQLContext,
  newDetails: Partial<CompanyDocument>
): Promise<CompanyDocument> => {
  try {
    const token = _context.cookie?.token

    if (!token) {
      throw NO_TOKEN
    }

    const payload = getPayloadFromJwt(token)
    const companyId = payload.id

    const {
      companyName,
      contactNumber,
      companyDetails,
      address,
      website,
    } = newDetails

    await yupSchemas.yupNewCompanyDetails.validate({
      companyName,
      contactNumber,
      companyDetails,
      address,
      website,
    })

    const company = await Company.findById(companyId).select('-password').exec()

    if (companyName) company.companyName = companyName
    if (contactNumber) company.contactNumber = contactNumber
    if (companyDetails) company.companyDetails = companyDetails
    if (address) company.address = address
    if (website) company.website = website
    await company.save()
    return company
  } catch (err) {
    errorHandler(err)
  }
}

//Company likes posts
export const CompanyLikesPost = async (
  _context: GraphQLContext,
  postId: string
): Promise<PostDocument> => {
  try {
    const token = _context.cookie?.token

    if (!token) {
      throw NO_TOKEN
    }

    const payload = getPayloadFromJwt(token)
    const companyId = payload.id
    const company = await Company.findById(companyId)
    if (!company) throw NOT_FOUND_ERROR
    const post = await Post.findById(postId)
    if (!post) throw NOT_FOUND_ERROR

    const companyAlreadyLikedPost = post.likes.find(
      (id) => id.toString() === companyId
    )

    if (companyAlreadyLikedPost) {
      post.likes = post.likes.filter((id) => id.toString() !== companyId)
      return await post.save()
    } else {
      post.likes.push(mongoose.Types.ObjectId(companyId))
      return await post.save()
    }
  } catch (err) {
    errorHandler(err)
  }
}

export const companyDeletesPost = async (
  _context: GraphQLContext,
  postId: string
): Promise<PostDocument> => {
  try {
    const token = _context.cookie?.token

    if (!token) {
      throw NO_TOKEN
    }

    const payload = getPayloadFromJwt(token)
    const companyId = payload.id
    const company = await Company.findById(companyId)
    if (!company) throw NOT_FOUND_ERROR

    const companyHasPost = company.posts.find(
      (postObj) => postObj.id.toString() === postId
    )
    if (!companyHasPost) throw new BadRequestError('Company did not post it')

    const post = await Post.findByIdAndDelete(postId)
    if (!post) throw NOT_FOUND_ERROR

    return post
  } catch (err) {
    errorHandler(err)
  }
}
