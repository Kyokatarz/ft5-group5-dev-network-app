import { startMockServer, stopMockServer } from './startMockServer'
import * as dbHelper from './db-helper'

describe('Testing the... test?', () => {
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
    await dbHelper.closeDatabase()
    await stopMockServer()
  })

  it('should be equal to 2', () => {
    expect(1 + 1).toBe(2)
  })
})
