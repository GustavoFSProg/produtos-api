import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import productModel from '../models/productModel'

async function getAll(req, res) {
  try {
    const data = await productModel.find()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function getById(req, res) {
  try {
    const data = await productModel.findById(req.params.id, 'title price')

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function deletar(req, res) {
  try {
    await productModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({ message: 'produto deletado com sucesso!' })
  } catch (error) {
    return res.status(400).send({ message: 'Erro ao excluir o produto!' })
  }
}

async function update(req, res) {
  try {
    await productModel.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        price: req.body.price,
      },
    })
    return res.status(200).send({ message: 'Produto Atualizado com sucesso!' })
  } catch (error) {
    return res.status(400).send({ errors: 'Erro ao atualizar o produto!' })
  }
}

async function create(req, res) {
  try {
    const { filename: image } = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', filename))

    fs.unlinkSync(req.file.path)

    await productModel.create({
      title: req.body.title,
      slug: req.body.slug,
      price: req.body.price,
      description: req.body.description,
      image: filename,
    })

    return res.status(201).send({ message: 'Produto cadastrado com sucesso! ' })
  } catch (error) {
    return res.status(400).send(error, 'Erro no cadastro do produto! ')
  }
}

export default { getAll, update, create, deletar, getById }
