import React from 'react'
import SignUpPage from '../../src/client/components/SignUpPage'

const SignUp = () => {
  return <SignUpPage />
}

export default SignUp

export async function getStaticProps(context: any) {
  return { props: { data: 'data' } }
}
