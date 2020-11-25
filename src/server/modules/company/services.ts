import bcrypt from 'bcryptjs'

import { CompanyDocument } from '../../models/Company'
import Company from '../../models/Company'
import {
  BadRequestError,
  CredentialError,
  InternalServerError,
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
      throw 'IdentificationDuplicated'
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const company = new Company({
      email,
      password: hashedPassword,
      companyName,
    })

    await company.save()

    return { email, companyName }
  } catch (err) {
    errorHandler(err)
  }
}
//Sign in as a company
export const signIn = async (companyInfo: CompanyDocument) => {
  const { email, password } = companyInfo
  const company = await Company.findOne({ email })
  if (!company) return 'CredentialError'

  const { password: hashedPassword } = company
  const match = await bcrypt.compare(password, hashedPassword)
  if (!match) return 'CredentialError'

  return {
    token: '//TODO:Token goes here',
  }
}

/*=========+
 |Protected|
 +=========*/
//Create a new post
export const createPost = async (
  companyId: string,
  postContent: PostDocument
): Promise<PostDocument> => {
  const { content, date } = postContent

  const company = await Company.findById(companyId).exec()
  const post = new Post({
    content,
    date,
  })

  const companyPosts = company.posts
  companyPosts.unshift(post)

  await post.save()
  await company.save()

  return post
}

//Update Company Info
export const updateCompanyInfo = async (
  companyId: string,
  newDetails: Partial<CompanyDocument>
): Promise<CompanyDocument> => {
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
}
/*=============+
 |ErrorHandling|
 +=============*/
const errorHandler = (err: string) => {
  switch (err) {
    case 'IdentificationDuplicated':
      throw new BadRequestError('This email has already existed')
    case 'CredentialError':
      throw new CredentialError()
    default:
      throw new InternalServerError()
  }
}
