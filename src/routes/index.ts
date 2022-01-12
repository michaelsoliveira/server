import express from "express"

import { UserController } from "../controllers/UserController"
import { AuthController } from "../controllers/AuthController"
import { Authentication } from "../middleware/auth.middleware"

const routes = express.Router()

routes.post('/users', new UserController().store)
routes.get('/users', Authentication(), new UserController().findAll)
routes.post('/auth/login', new AuthController().login)
routes.post('/auth/refresh', new AuthController().refreshToken)

export default routes;