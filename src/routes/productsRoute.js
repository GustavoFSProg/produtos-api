import multer from 'multer'
import { Router } from 'express'
import productController from '../controllers/productController'
import uploadsConfig from '../config/upload'

const upload = multer(uploadsConfig)

const routes = new Router()

const productsRouteList = [
  routes.get('/', productController.getAll),
  routes.get('/:id', productController.getById),
  routes.post('/register', upload.single('image'), productController.create),
  routes.put('/update/:id', productController.update),
  routes.delete('/del/:id', productController.deletar),
]

export default productsRouteList
