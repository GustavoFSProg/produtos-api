import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    title: String,
    slug: String,
    description: String,
    price: Number,

    image: String,
  },

  {
    timestamps: true,
  }
)

export default model('productModel', schema)
