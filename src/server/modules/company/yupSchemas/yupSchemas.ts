import * as yup from 'yup'

export const yupCompanyInfo = yup.object().shape({
  email: yup.string().email().min(5).max(255),
  password: yup.string().min(8).max(255),
  companyName: yup.string().max(255),
})

export const yupCredentials = yup.object().shape({
  email: yup.string().email().min(5).max(255),
  password: yup.string().min(8).max(255),
  companyName: yup.string().max(255),
})

export const yupNewCompanyDetails = yup.object().shape({
  companyName: yup.string().max(255),
  contactNumber: yup.number().max(30),
  companyDetails: yup.string().max(255),
  address: yup.string().max(255),
  website: yup.string().url(),
})
