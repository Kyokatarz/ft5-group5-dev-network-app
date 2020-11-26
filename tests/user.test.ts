import { gql } from 'apollo-server-micro'

import { startMockServer, stopMockServer } from './startMockServer'
import * as dbHelper from './db-helper'

describe('Testing user services', () => {
  beforeAll(async () => {
    console.log('Test starting')
    await startMockServer()
  })

  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    console.log('Test stoping')
    await stopMockServer()
    await dbHelper.closeDatabase()
  })

  it('should not signup user with incorrect email', () => {
    const signupUser = gql`
      mutation {
        signupUser(data: { email: "test@test.com", password: "test123" }) {
          token
          user {
            id
            email
            password
          }
        }
      }
    `
    expect(401)
  })
})
