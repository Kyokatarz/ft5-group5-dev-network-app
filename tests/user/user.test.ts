import * as requestStrings from './graphql-request-string'
import { createTestClient } from 'apollo-server-testing'
import { gql } from 'graphql-request'

import * as dbHelper from '../db-helper'
import { server } from '../startMockServer'

const { mutate } = createTestClient(server)

describe('Testing user services', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    console.log('Test stoping')
    await dbHelper.closeDatabase()
  })

  //   it('should successfully signup user', async () => {
  //     const signupUserMutation = requestStrings.createMockUser({
  //       email: 'test@test.com',
  //       password: 'password123',
  //     })
  //     const resp = await mutate({
  //       mutation: signupUserMutation,
  //     })
  //     console.log(resp)
  //     expect(resp.data.signupUser).toMatchObject({ email: 'test@test.com' })
  //   })
  // })

  it('should successfully signup user', async () => {
    const signupUser = gql`
      mutation {
        signupUser(user: { email: "test@test.com", password: "password123" }) {
          email
        }
      }
    `
    const res = await mutate({
      mutation: signupUser,
    })

    console.log(res)
    //expect(res.data.signupUser).toMatchObject({ email: 'test@test.com' })
  })
})
