import mongoose, { Document, Model, Schema } from 'mongoose'

export type PostDocument = Document & {
  id: string
  content: string
  likes: string[]
  date: Date
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
      likedUsers: Schema.Types.ObjectId,
    },
  ],
  comments: [
    {
      commentedUserId: Schema.Types.ObjectId,
      text: String,
    },
  ],
})

export default (mongoose.models.post as Model<PostDocument>) ||
  mongoose.model('post', postSchema)
