import mongoose, { Document, Schema } from 'mongoose'

import { PostDocument } from './Post'

export type UserDocument = Document & {
  id: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  image?: string
  currentPosition: string
  company?: string
  posts?: PostDocument[]
}

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  image: String,
  currentPosition: String,
  company: String,
  posts: [
    {
      id: Schema.Types.ObjectId,
    },
  ],
})

export default mongoose.model<UserDocument>('user', userSchema)
