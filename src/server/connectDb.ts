import mongoose from 'mongoose'

const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : process.env.MONGO_LOCAL_URI

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to database!')
  } catch (err) {
    console.error(err)
  }
}
