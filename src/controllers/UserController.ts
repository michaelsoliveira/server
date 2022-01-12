// import { User } from "../entities/User"
import { Request, Response } from "express";
import UserService from "../services/user.service";

export interface BaseUser {
    username: string,
    email: string,
    password: string
}

export class UserController {
    async store(request : Request, response: Response) : Promise<Response> {
        const { username, email, password } = request.body;
        
        try {    
            const user = await UserService.create({ username, email, password })
            
            return response.json(user)

        } catch (error) {
            return response.status(400).send(error.message)
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            let users = await UserService.getAll()

            return response.json(users)
        } catch(error) {
            return response.json(error.message)
        }
    }

    async findOne(request: Request, response: Response) {
        try {
            let users = await UserService.getAll()

            return response.json(users)
        } catch(error) {
            return response.json(error.message)
        }
    }
}