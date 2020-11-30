import * as requestStrings from './graphql-request-string'
import { createTestClient } from 'apollo-server-testing'

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

  it('should not signup user with incorrect email', async () => {
    const signupUserMutation = requestStrings.createMockUser({
      email: 'test@test.com',
      password: 'password123',
    })
    const resp = await mutate({
      mutation: signupUserMutation,
    })
    console.log(resp)
    //expect(resp.data.signupUser).toMatchObject({ email: "test@test.com" })
  })
})
//how to get status?
