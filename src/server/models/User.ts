import mongoose, { Document, Model, Schema } from 'mongoose'

import { PostDocument } from './Post'

enum EmploymentStatus {
  employed = 'EMPLOYED',
  openToWork = 'OPEN_TO_WORK',
  Freelancer = 'FREELANCER',
}

export type UserDocument = Document & {
  id: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  image?: string
  employmentStatus?: EmploymentStatus
  company?: string
  posts?: PostDocument[]
}

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  image: String,
  employmentStatus: {
    type: String,
    enum: ['EMPLOYED', 'OPEN_TO_WORK', 'FREELANCER'],
  },
  company: String,
  posts: [
    {
      id: Schema.Types.ObjectId,
    },
  ],
})

export default (mongoose.models.user as Model<UserDocument>) ||
  mongoose.model<UserDocument>('user', userSchema)
