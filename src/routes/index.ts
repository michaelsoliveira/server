import express from "express"

import { UserController } from "../controllers/UserController"
import { AuthController } from "../controllers/AuthController"
import { Authentication } from "../middleware/auth.middleware"
import { EmpresaController } from "../controllers/EmpresaController"
import { EspecieController } from "../controllers/EspecieController"
import multer from 'multer'

const routes = express.Router()

routes.get('/users', Authentication(), new UserController().findAll)
routes.get('/users/:id', Authentication(), new UserController().findOne)
routes.post('/users/create', new UserController().store)
routes.post('/users/create-role', new UserController().createRole)
routes.post('/users/create-permission', new UserController().createPermission)
routes.post('/users/create-role-permission', new UserController().createRolePermission)
routes.post('/users/create-user-acl', new UserController().createUserACL)
routes.get('/provider/find', new UserController().findProvider)
routes.post('/auth/login', new AuthController().login)
routes.get('/auth/oauth', new AuthController().googleAuth)
routes.get('/auth/google', new AuthController().googleAuth)
routes.get('/auth/me', Authentication(), new AuthController().getUserByToken)
routes.post('/auth/refresh', new AuthController().refreshToken)
routes.get('/auth/callback/github', new AuthController().signInCallback)
routes.post('/empresa', Authentication(), new EmpresaController().store)
routes.get('/empresa', Authentication(), new EmpresaController().findAll)
routes.get('/empresa/:id', Authentication(), new EmpresaController().findOne)
routes.put('/empresa/:id', Authentication(), new EmpresaController().update)
routes.delete('/empresa/:id', Authentication(), new EmpresaController().delete)


const multerConfig = multer()
//Especie
routes.post('/especie', Authentication(), new EspecieController().store)
routes.get('/especie', Authentication(), new EspecieController().findAll)
routes.get('/especie/:id', Authentication(), new EspecieController().findOne)
routes.put('/especie/:id', Authentication(), new EspecieController().update)
routes.delete('/especie/:id', Authentication(), new EspecieController().delete)
routes.post('/especie/import', multerConfig.single('file'), new EspecieController().importEspecie)


export default routes;