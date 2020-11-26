import { createTestClient } from 'apollo-server-testing'
import { getAllCompanies } from '../../src/server/modules/company/services'

import * as requestStrings from './graphql-request-string'
import * as dbHelper from '../db-helper'
import { server } from '../startMockServer'

const { query, mutate } = createTestClient(server)

describe('Testing the... test?', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })
  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should be equal to 2', () => {
    expect(1 + 1).toBe(2)
  })

  it('should create a company', async () => {
    const createCompanyMutation = requestStrings.createMockCompany({
      companyName: 'Test Company',
    })
    const resp = await mutate({
      mutation: createCompanyMutation,
    })
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
    expect(resp.errors[0].message).toBe('This email has already existed')
  })

  it('should get all companies', async () => {
    const res = await query({
      query: `query {
        getAllCompanies{
          companyName
        }
      }`,
    })
    expect(res.data.getAllCompanies.length).toBe(0)
  })
})
