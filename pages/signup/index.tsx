import { GetServerSideProps } from 'next'
import React from 'react'
import SignUpPage from '../../src/client/components/SignUpPage'

const SignUp = () => {
  return <SignUpPage />
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log('from getserversideprops')
    return { props: { data: '' } }
  } catch (err) {
    console.error(err)
    return { props: { error: {} } }
  }
}
