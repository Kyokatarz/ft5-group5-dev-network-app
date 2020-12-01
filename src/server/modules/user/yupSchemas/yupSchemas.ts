import * as yup from 'yup'

//user create input validation
export const yupUserInfo = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(8).max(255),
})

//user update input validation
export const yupUserUpdate = yup.object().shape({
  email: yup.string().email(),
  firstName: yup.string(),
  lastName: yup.string(),
  image: yup.string(),
  company: yup.string(),
})
