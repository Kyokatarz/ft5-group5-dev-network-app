import mongoose from 'mongoose'

const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : process.env.MONGO_LOCAL_URI
// : process.env.MONGO_CLUSTER_URI

export const connectDb = async (): Promise<void> => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to database!')
  } catch (err) {
    console.error(err)
  }
}
