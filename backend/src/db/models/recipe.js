import mongoose, { Schema } from 'mongoose'
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // milestone 2
  },
  { timestamps: true },
)
export default mongoose.model('Recipe', recipeSchema)
