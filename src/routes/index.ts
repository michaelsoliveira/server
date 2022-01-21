import express from "express"

import { UserController } from "../controllers/UserController"
import { AuthController } from "../controllers/AuthController"
import { Authentication } from "../middleware/auth.middleware"

const routes = express.Router()

routes.get('/users', Authentication(), new UserController().findAll)
routes.get('/users/:id', Authentication(), new UserController().findOne)
routes.post('/users/create', new UserController().store)
routes.post('/auth/login', new AuthController().login)
routes.get('/auth/me', Authentication(), new AuthController().getUserByToken)
routes.post('/auth/refresh', new AuthController().refreshToken)

export default routes;