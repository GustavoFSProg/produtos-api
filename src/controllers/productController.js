import productModel from '../models/productModel'

async function getAll(req, res) {
  try {
    const data = await productModel.find()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function create(req, res) {
  try {
    await productModel.create({
      title: req.body.title,
      slug: req.body.slug,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    })

    return res.status(201).send({ message: 'Produto cadastrado com sucesso! ' })
  } catch (error) {
    return res.status(400).send(error, 'Erro no cadastro do produto! ')
  }
}

export default { getAll, create }
