import mongoose, { Document, Schema } from 'mongoose'

import { PostDocument } from './Post'
import { UserDocument } from './User'

export type CompanyDocument = Document & {
  id: string
  email: string
  password: string
  companyName: string
  companyDetails: string
  website: string
  contactNumber: string
  address: string
  posts?: PostDocument[]
}

const companySchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  companyName: String,
  companyDetails: String,
  website: String,
  contactNumber: String,
  address: String,
  posts: [
    {
      id: Schema.Types.ObjectId,
    },
  ],
})

export default mongoose.model<UserDocument>('user', companySchema)
