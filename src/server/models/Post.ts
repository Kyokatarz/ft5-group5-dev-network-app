import mongoose, { Document, Model, Schema } from 'mongoose'

export type PostDocument = Document & {
  id: mongoose.Types.ObjectId
  content: string
  date: Date
  likes: mongoose.Types.ObjectId[]
  onModel: 'company' | 'user'
  comments?: Comment[]
}

export type Comment = {
  id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  content: string
  likes?: mongoose.Types.ObjectId[]
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
      likes: [{ type: Schema.Types.ObjectId, refPath: 'onModel' }],
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
