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

  return gql`
  mutation{
    updateCompanyInfo(companyId: "${companyId}", newCompanyDetails: {
      companyName: "${companyName}",
      contactNumber: "${contactNumber}",
      companyDetails: "${companyDetails}",
      address: "${address}",
      website: "${website}"
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
