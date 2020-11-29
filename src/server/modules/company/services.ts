import bcrypt from 'bcryptjs'

import { CompanyDocument } from '../../models/Company'
import Company from '../../models/Company'
import {
  CREDENTIAL_ERROR,
  IDENTIFICATION_DUPLICATED,
  NOT_FOUND_ERROR,
  errorHandler,
} from '../../helpers'
import Post, { PostDocument } from '../../models/Post'

/*===========+
 |UNPROTECTED|
 +===========*/
//Get all registered companies
export const getAllCompanies = async () => {
  return await Company.find().exec()
}

//Create a new company account
export const createNewCompany = async (
  companyInfo: CompanyDocument
): Promise<Partial<CompanyDocument>> => {
  const { email, password, companyName } = companyInfo

  try {
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

    return { id: company.id, email, companyName }
  } catch (err) {
    errorHandler(err)
  }
}
//Sign in as a company
export const signInCompany = async (companyInfo: CompanyDocument) => {
  const { email, password } = companyInfo
  const company = await Company.findOne({ email })
  if (!company) throw CREDENTIAL_ERROR

  const { password: hashedPassword } = company
  const match = await bcrypt.compare(password, hashedPassword)
  if (!match) throw CREDENTIAL_ERROR

  return {
    token: '//TODO:Token goes here',
  }
}

/*=========+
 |Protected|
 +=========*/
//Create a new post
export const companyCreatePost = async (
  companyId: string,
  postContent: string
): Promise<PostDocument> => {
  try {
    const company = await Company.findById(companyId).exec()
    if (!company) throw NOT_FOUND_ERROR

    const post = new Post({
      content: postContent,
      date: new Date(),
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
  companyId: string,
  newDetails: Partial<CompanyDocument>
): Promise<CompanyDocument> => {
  try {
    const {
      companyName,
      contactNumber,
      companyDetails,
      address,
      website,
    } = newDetails
    const company = await Company.findById(companyId)

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
export const CompanyLikesPost = async (companyId: string, postId: string) => {
  try {
    const company = await Company.findById(companyId)
    const post = await Post.findById(postId)
    if (!post) throw NOT_FOUND_ERROR
    if (!company) throw NOT_FOUND_ERROR

    const companyAlreadyLikedPost = post.likes.find((id) => id === companyId)
    if (companyAlreadyLikedPost) {
      post.likes = post.likes.filter((id) => id !== companyId)
      return await post.save()
    } else {
      post.likes.push(companyId)
      return await post.save()
    }
  } catch (err) {
    errorHandler(err)
  }
}
