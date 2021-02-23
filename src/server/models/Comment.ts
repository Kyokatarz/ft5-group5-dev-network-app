import mongoose, { Document, Model } from 'mongoose'
import { string } from 'yup'

export type CommentDocument = Document & {
  fromPost: mongoose.Schema.Types.ObjectId[]
  likes: mongoose.Schema.Types.ObjectId[]
  content: string
}

const commentSchema = new mongoose.Schema({
  fromPost: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  content: String,
})

export default (mongoose.models.comment as Model<CommentDocument>) ||
  mongoose.model<CommentDocument>('comment', commentSchema)
