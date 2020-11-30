import * as requestStrings from './graphql-request-string'
import { createTestClient } from 'apollo-server-testing'

import * as dbHelper from '../db-helper'
import { server } from '../startMockServer'

const { mutate, query } = createTestClient(server)

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

  it('should successfully signup user', async () => {
    const signupUserMutation = requestStrings.createMockUser()
    const res = await mutate({
      mutation: signupUserMutation,
    })
    // console.log(res)
    expect(res.data.signupUser).toHaveProperty('email')
  })

  it('should successfully login user', async () => {
    //signup a user with default credentials
    await mutate({
      mutation: requestStrings.createMockUser(),
    })
    const loginUserMutation = requestStrings.loginMockUser({
      email: 'userEmail@test.com',
      password: 'userPassword',
    })
    const res = await mutate({
      mutation: loginUserMutation,
    })
    expect(res.data.loginUser).toHaveProperty('email')
    expect(res.data.loginUser).toHaveProperty('id')
  })

  it('should successfully get all users', async () => {
    await mutate({
      mutation: requestStrings.createMockUser(),
    })

    await mutate({
      mutation: requestStrings.createMockUser({
        email: 'user1@test.com',
        password: 'user1Password',
      }),
    })

    await mutate({
      mutation: requestStrings.createMockUser({
        email: 'user2@test.com',
        password: 'user2Password',
      }),
    })

    await mutate({
      mutation: requestStrings.createMockUser({
        email: 'user3@test.com',
        password: 'user3Password',
      }),
    })

    const res = await query({
      query: requestStrings.getAllMockUsers(),
    })
    expect(res.data.getAllUsers.length).toBe(4)
  })

  it('should successfully update user profile', async () => {
    //signup a user with default credentials
    const mockUser = await mutate({
      mutation: requestStrings.createMockUser(),
    })
    console.log(mockUser.data.signupUser)
    const updateUserProfileMutation = requestStrings.updateMockUserProfile(
      mockUser.data.signupUser.id,
      {
        firstName: 'Bilbo',
        lastName: 'Baggins',
      }
    )
    console.log(updateUserProfileMutation)
    const res = await mutate({
      mutation: updateUserProfileMutation,
    })
    console.log(res)
    expect(res.data.updateUserProfile.firstName).toBe('Bilbo')
  })
})

//TODO: test token and input validation
