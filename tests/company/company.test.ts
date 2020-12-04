import { createTestClient } from 'apollo-server-testing'

import * as requestStrings from './graphql-request-string'
import * as dbHelper from '../db-helper'
import { createMockServer } from '../mockServer'
import { generateJWT } from '../../src/server/helpers/'

const server = createMockServer()
const { query, mutate } = createTestClient(server)

describe("Testing Company's GraphQL", () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })
  it('should create a company', async () => {
    const createCompanyMutation = requestStrings.createMockCompany({
      companyName: 'Test Company',
    })
    const resp = await mutate({
      mutation: createCompanyMutation,
    })
    console.log(resp)
    expect(resp.data.createNewCompany.companyName).toBe('Test Company')
  })

  it('should not create a company if email existed', async () => {
    const createCompanyMutation = requestStrings.createMockCompany()

    await mutate({
      mutation: createCompanyMutation,
    })
    const resp = await mutate({
      mutation: createCompanyMutation,
    })
    console.log('res', Object.keys(resp.http.headers))
    expect(resp.errors[0].message).toBe('This email has already existed')
  })

  it('should not create a company with wrong validation', async () => {
    const res1 = await mutate({
      mutation: requestStrings.createMockCompany({ email: 'notAnEmail' }),
    })
    expect(res1.errors[0].message).toBe('email must be a valid email')

    const res2 = await mutate({
      mutation: requestStrings.createMockCompany({ password: '123' }),
    })
    expect(res2.errors[0].message).toBe(
      'password must be at least 8 characters'
    )
  })
  it('should get all companies', async () => {
    await mutate({
      mutation: requestStrings.createMockCompany({
        email: 'company1@email.com',
      }),
    })
    await mutate({
      mutation: requestStrings.createMockCompany({
        email: 'company2@email.com',
      }),
    })
    await mutate({
      mutation: requestStrings.createMockCompany({
        email: 'company3@email.com',
      }),
    })

    const res = await query({
      query: requestStrings.getAllCompanies(),
    })

    expect(res.data.getAllCompanies.length).toBe(3)
  })

  it('should sign in with the right credentials', async () => {
    const createCompanyMutation = requestStrings.createMockCompany({
      email: 'testEmail@email.com',
      password: 'hardToGuessEasyToRemember',
    })

    await mutate({
      mutation: createCompanyMutation,
    })

    const signInCompanyMutation = requestStrings.signInCompany({
      email: 'testEmail@email.com',
      password: 'hardToGuessEasyToRemember',
    })

    const res = await mutate({ mutation: signInCompanyMutation })
    console.log(res)
    expect(res.data.signInCompany.email).toBe('testEmail@email.com')
  })

  it('should update company info', async () => {
    const res1 = await mutate({
      mutation: requestStrings.createMockCompany(),
    })
    const companyId = res1.data.createNewCompany.id
    const token = generateJWT({ id: companyId })

    const contextServer = createMockServer({
      cookie: {
        token,
      },
    })

    const { mutate: mutateContext } = createTestClient(contextServer)

    const updateCompanyMutation = requestStrings.updateCompanyInfo({
      companyName: 'New Name',
    })

    const res2 = await mutateContext({
      mutation: updateCompanyMutation,
    })
    console.log('res2:', res2)
    expect(res2.data.updateCompanyInfo.companyName).toBe('New Name')
  })

  it('should create a new post', async () => {
    const res = await mutate({
      mutation: requestStrings.createMockCompany(),
    })
    const companyId = res.data.createNewCompany.id
    const token = generateJWT({ id: companyId })

    const contextServer = createMockServer({
      cookie: { token },
    })

    const { mutate: mutateContext } = createTestClient(contextServer)
    const res2 = await mutateContext({
      mutation: requestStrings.companyCreatePost('This is a test post'),
    })
    console.log(companyId)
    console.log(res2)
    expect(res2.data.companyCreatePost.content).toBe('This is a test post')
  })
  it('should let company like a post', async () => {
    const res1 = await mutate({
      mutation: requestStrings.createMockCompany(),
    })
    console.log('res1:', res1)
    const companyId = res1.data.createNewCompany.id

    const token = generateJWT({ id: companyId })

    const contextServer = createMockServer({
      cookie: { token },
    })

    const { mutate: mutateContext } = createTestClient(contextServer)
    const res2 = await mutateContext({
      mutation: requestStrings.companyCreatePost('This is a test post'),
    })
    console.log('res2:', res2)
    expect(res2.data.companyCreatePost.content).toBe('This is a test post')
    const postId = res2.data.companyCreatePost.id

    const res3 = await mutateContext({
      mutation: requestStrings.companyLikesPost(postId),
    })
    console.log('res3:', res3)
    const expected = [companyId]
    const likeArray = res3.data.companyLikesPost.likes
    expect(likeArray).toEqual(expect.arrayContaining(expected))
  })

  it('should let company unlike a post', async () => {
    const res1 = await mutate({
      mutation: requestStrings.createMockCompany(),
    })
    const companyId = res1.data.createNewCompany.id
    const token = generateJWT({ id: companyId })

    const contextServer = createMockServer({
      cookie: { token },
    })

    const { mutate: mutateContext } = createTestClient(contextServer)

    const res2 = await mutateContext({
      mutation: requestStrings.companyCreatePost('This is a test post'),
    })
    expect(res2.data.companyCreatePost.content).toBe('This is a test post')

    const postId = res2.data.companyCreatePost.id
    await mutateContext({
      mutation: requestStrings.companyLikesPost(postId),
    })
    const res3 = await mutateContext({
      mutation: requestStrings.companyLikesPost(postId),
    })

    const likeArray = res3.data.companyLikesPost.likes
    expect(likeArray.length).toBe(0)
  })
})
