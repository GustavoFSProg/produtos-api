import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
})

export default model('userModel', schema)
