import md5 from 'md5'
import dotenv from 'dotenv'
import { generateToken } from '../services/authenticate'
import userModel from '../models/userModel'
import send from '../services/emailService'

dotenv.config()

async function store(req, res) {
  try {
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password, process.env.GLOBAL_SALT_KEY),
      role: req.body.role,
    })

    await send(req, res)

    return res.status(201).send({ message: 'Usuario criado dom sucesso!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function signin(req, res) {
  try {
    const data = await userModel.findOne({
      email: req.body.email,
      password: md5(req.body.password, process.env.GLOBAL_SALT_KEY),
    })

    const token = await generateToken({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    if (!token) return send('Erro ao gerar o token!!')
    return res.status(200).send({ data, token })
  } catch (error) {
    return res.status(400).send('Erro no Login!')
  }
}

async function getAll(req, res) {
  try {
    const data = await userModel.find()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function deleteUser(req, res) {
  try {
    await userModel.deleteMany()

    return res.status(200).send({ Message: 'Usuario de letado com sucesso!' })
  } catch (error) {
    return res.status(400).send({ Message: 'Erro ao deletar!' })
  }
}
export default { store, getAll, signin, deleteUser }
