import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

const mongod = new MongoMemoryServer()

export const connect = async (): Promise<void> => {
  const uri = await mongod.getUri()

  const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }

  await mongoose.connect(uri, mongooseOpts)
}

export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}
