import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import routesList from './routes/indexRoutes'

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

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use('/', routesList)

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT)

console.log(`Api Running Free on port ${PORT}`)

export default app
