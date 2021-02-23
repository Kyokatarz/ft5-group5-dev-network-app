import mongoose, { Document, Model, Schema } from 'mongoose'

import { PostDocument } from './Post'

export type CompanyDocument = Document & {
  id: mongoose.Types.ObjectId
  email: string
  password: string
  companyName: string
  companyDetails?: string
  website?: string
  contactNumber?: string
  address?: string
  posts?: PostDocument[]
}

export const companySchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  companyName: String,
  companyDetails: String,
  website: String,
  contactNumber: String,
  address: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
})

export default (mongoose.models.company as Model<CompanyDocument>) ||
  mongoose.model<CompanyDocument>('company', companySchema)
