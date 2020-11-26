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
        companyName
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
