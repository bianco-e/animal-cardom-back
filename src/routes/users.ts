import express, { Router } from 'express'
import { UsersController } from '../controllers/Users.controllers'
const usersRouter: Router = express.Router()

usersRouter.post('/me', UsersController.getUser)

export default usersRouter
