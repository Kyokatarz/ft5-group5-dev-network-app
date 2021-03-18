import { createTestClient } from 'apollo-server-testing'

import * as requestStrings from './graphql-request-string'
import * as dbHelper from '../db-helper'
import { createMockServer } from '../mockServer'
import { generateJWT } from '../../src/server/helpers'

const server = createMockServer()
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
    expect(res.data.signupUser).toHaveProperty('email')
  })

  it('should get user by userId', async () => {
    const res = await mutate({
      mutation: requestStrings.createMockUser(),
    })
    expect(res.data.signupUser).toHaveProperty('id')
    const userId = res.data.signupUser.id

    const res2 = await query({
      query: requestStrings.getUserById(userId),
    })

    expect(res2.data.getUserById.id).toBe(userId)
  })

  it('should not signup user with invalid email', async () => {
    const signupUserMutation = requestStrings.createMockUser({
      email: 'wrongemail',
    })
    const res = await mutate({
      mutation: signupUserMutation,
    })
    expect(res.errors[0].message).toBe('email must be a valid email')
  })

  it('should not signup with duplicated email', async () => {
    await mutate({ mutation: requestStrings.createMockUser() })
    const res = await mutate({ mutation: requestStrings.createMockUser() })
    expect(res.errors[0].message).toBe('This email has already existed')
  })
  //goes back to default if a password is an empty string (e.g. '')
  it('should not signup user with invalid password', async () => {
    const signupUserMutation = requestStrings.createMockUser({
      email: 'test@test.com',
      password: 'test',
    })
    const res = await mutate({
      mutation: signupUserMutation,
    })
    expect(res.errors[0].message).toBe('password must be at least 8 characters')
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

    const userId = mockUser.data.signupUser.id
    const token = generateJWT({ id: userId })

    const contextServer = createMockServer({
      cookie: { token },
    })

    const { mutate: mutateContext } = createTestClient(contextServer)

    const updateUserProfileMutation = requestStrings.updateMockUserProfile({
      firstName: 'Bilbo',
      lastName: 'Baggins',
    })

    const res = await mutateContext({
      mutation: updateUserProfileMutation,
    })
    expect(res.data.updateUserProfile.firstName).toBe('Bilbo')
    expect(res.data.updateUserProfile.lastName).toBe('Baggins')
  })

  it('should successfully create a new user post', async () => {
    //signup a user with default credentials
    const mockUser = await mutate({
      mutation: requestStrings.createMockUser(),
    })
    const userId = mockUser.data.signupUser.id

    const token = generateJWT({ id: userId })

    const contextServer = createMockServer({
      cookie: { token },
    })

    const { mutate: mutateContext } = createTestClient(contextServer)

    const userCreatePostMutation = requestStrings.userCreateMockPost('New post')
    const res = await mutateContext({
      mutation: userCreatePostMutation,
    })
    console.log(res)
    expect(res.data.userCreatePost.content).toBe('New post')
  })
})
