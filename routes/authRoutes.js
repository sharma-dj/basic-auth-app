import express from 'express'
import { register,login } from '../controller/authController.js'
const routes = express.Router()

routes.route('/register').post(register)
routes.route('/login').post(login)

export default routes

