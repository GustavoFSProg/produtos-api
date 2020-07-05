import { Router } from 'express'
import productController from '../controllers/productController'

const routes = new Router()

const routeList = [
  routes.get('/', productController.getAll),
  routes.post('/register', productController.create),
]

export default routeList
