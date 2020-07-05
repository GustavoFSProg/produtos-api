import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routeList from './routes/productsRoute'

dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

const app = express()

app.use(express.json())
app.use(cors())

const { PORT } = process.env

app.listen(PORT)
app.use('/', routeList)

console.log(`Api Running Free on port ${PORT}`)

export default app
