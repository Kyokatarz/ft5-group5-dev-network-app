import mongoose, { Document, Model, Schema } from 'mongoose'

export type PostDocument = Document & {
  id: string
  content: string
  date: Date
  likes: string[]
  onModel: 'company' | 'user'
  comments?: Comment[]
}

export type Comment = {
  userId: string
  content: string
  likes?: string[]
}

const postSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      refPath: 'onModel',
    },
  ],
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, refPath: 'onModel' },
      content: String,
    },
  ],
  onModel: {
    type: String,
    required: true,
    enum: ['company', 'user'],
  },
})

export default (mongoose.models.post as Model<PostDocument>) ||
  mongoose.model('post', postSchema)
