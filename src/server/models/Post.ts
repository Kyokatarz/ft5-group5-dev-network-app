import mongoose, { Document, Schema } from 'mongoose'

export type PostDocument = Document & {
  id: string
  content: string
  likes: number
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
      likedUser: Schema.Types.ObjectId,
    },
  ],
})

export default mongoose.models.post || mongoose.model('post', postSchema)
