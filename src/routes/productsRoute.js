import { Router } from 'express'
import productController from '../controllers/productController'

const routes = new Router()

const routeList = [
  routes.get('/', productController.getAll),
  routes.get('/:id', productController.getById),
  routes.post('/register', productController.create),
  routes.put('/update/:id', productController.update),
  routes.delete('/del/:id', productController.deletar),
]

export default routeList
