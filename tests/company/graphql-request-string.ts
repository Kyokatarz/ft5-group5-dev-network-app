import { gql } from 'graphql-request'

type CompanyOverride = {
  email?: string
  password?: string
  companyName?: string
}

export const createMockCompany = (override?: CompanyOverride): string => {
  const email = override?.email || 'mockEmail@email.com'
  const password = override?.password || 'mockPassword'
  const companyName = override?.companyName || 'Kyo Company'

  return gql`
    mutation {
      createNewCompany(companyInfo: {
        email: "${email}",
        password: "${password}"
        companyName: "${companyName}"
      }){
        email,
        companyName,
        id
      }
    }
  `
}

export const getAllCompanies = (): string => {
  return gql`
    {
      getAllCompanies {
        email
        companyName
      }
    }
  `
}

export const signInCompany = (credentials: {
  email: string
  password: string
}): string => {
  const { email, password } = credentials
  return gql`
    mutation{
      signInCompany(credentials: {
        email: "${email}",
        password: "${password}"
      }){
        token
      }
    }
  `
}

export const updateCompanyInfo = (
  companyId: string,
  newCompanyDetails: any
): string => {
  const {
    companyName,
    contactNumber,
    companyDetails,
    address,
    website,
  } = newCompanyDetails

  let string = ''
  if (companyName) string += `companyName: "${companyName}",`
  if (contactNumber) string += `contactNumber: "${contactNumber}",`
  if (companyDetails) string += `companyDetails: "${companyDetails}",`
  if (address) string += `address: "${address}",`
  if (website) string += `website: "${website}",`
  console.log('string123:', string)
  return gql`
    mutation{
      updateCompanyInfo(companyId: "${companyId}", newCompanyDetails: {
        ${string}
        }){
        id,
        email,
        companyName,
        contactNumber,
        companyDetails,
        address,
        website
      }
    }
  `
}

export const companyCreatePost = (companyId: string, postContent: string) => {
  return gql`
    mutation{
      companyCreatePost(companyId: "${companyId}", postContent: "${postContent}"){
        id,
        content,
        likes,
        date,
        comments{ content },
      }
    }
  `
}

export const companyLikesPost = (companyId: string, postId: string) => {
  return gql`
    mutation{
      companyLikesPost(companyId: "${companyId}", postId: "${postId}"){
        id,
        content,
        likes,
        date,
        comments{ content }
      }
    }
  `
}
