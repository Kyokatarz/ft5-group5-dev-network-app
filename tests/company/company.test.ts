import { request } from 'graphql-request'

import { startMockServer, stopMockServer, host } from '../startMockServer'
import * as dbHelper from '../db-helper'
import * as requestStrings from './graphql-request-string'

describe('Testing company', () => {
  beforeAll(async () => {
    await startMockServer()
    console.log('Before all')
  })

  beforeEach(async () => {
    await dbHelper.connect()
    console.log('Before each')
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
    console.log('after each')
  })
  afterAll(async () => {
    console.log('Test stoping')
    await dbHelper.closeDatabase()
    console.log('after all')
  })

  it('should return all companies', async () => {
    const createCompanyMutation1 = requestStrings.createMockCompany({
      email: 'company1@email.com',
    })
    const createCompanyMutation2 = requestStrings.createMockCompany({
      email: 'company2@email.com',
    })
    const createCompanyMutation3 = requestStrings.createMockCompany({
      email: 'company3@email.com',
    })
    const getCompaniesMutation = requestStrings.getAllCompanies()
    await request(host, createCompanyMutation1)
    await request(host, createCompanyMutation2)
    await request(host, createCompanyMutation3)

    const response = await request(host, getCompaniesMutation)
    expect(response.getAllCompanies.length).toBe(3)
    console.log(response)
  })
})
