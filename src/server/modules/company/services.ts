import bcrypt from 'bcryptjs'

import { CompanyDocument } from '../../models/Company'
import Company from '../../models/Company'

export const getAllCompanies = async () => {
  return await Company.find().exec()
}

export const createNewCompany = async (
  companyInfo: CompanyDocument
): Promise<Partial<CompanyDocument>> => {
  const { email, password, companyName } = companyInfo
  console.log('Okay')

  const companyExists = await Company.findOne({ email })
  if (companyExists) {
    return //TODO: Return an error here
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
}

export const signIn = async (companyInfo: CompanyDocument) => {
  const { email, password } = companyInfo
  const company = await Company.findOne({ email })
  if (!company) return //TODO: ADD ERROR HANDLER

  const { password: hashedPassword } = company
  const match = await bcrypt.compare(password, hashedPassword)
  if (!match) return //TODO: ADD ERROR HANDLER

  return {
    token: '//TODO:Token goes here',
  }
}
