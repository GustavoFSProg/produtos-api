import { Router } from 'express'
import userController from '../controllers/userController'

const routes = new Router()

const UserRouteList = [
  routes.get('/users', userController.getAll),
  routes.delete('/users', userController.deleteUser),
  routes.post('/users/store', userController.store),
  routes.post('/signin', userController.signin),
]

export default UserRouteList
