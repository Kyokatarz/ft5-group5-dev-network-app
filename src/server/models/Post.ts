import mongoose, { Document, Model, Schema } from 'mongoose'

export type PostDocument = Document & {
  id: string
  content: string
  date: Date
  likes: string[]
  onModel: 'company' | 'user'
  comments?: Array<{
    commentUserId: string
    text: string
    avatar: string
  }>
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
      commentedId: { type: Schema.Types.ObjectId, refPath: 'onModel' },
      text: String,
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
