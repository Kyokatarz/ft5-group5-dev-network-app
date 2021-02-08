import mongoose, { Document, Model, Schema } from 'mongoose'

import { PostDocument } from './Post'

export enum EmploymentStatus {
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
    enum: Object.values(EmploymentStatus), //['EMPLOYED', 'OPEN_TO_WORK', 'FREELANCER']
  },
  company: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
})

export default (mongoose.models.user as Model<UserDocument>) ||
  mongoose.model<UserDocument>('user', userSchema)
