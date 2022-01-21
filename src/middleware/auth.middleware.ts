import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "src/entities/User"
import userService from "../services/user.service"
import { getRepository } from "typeorm"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
const config = require("../config")

export const Authentication = () => {

    return async (request: Request, response: Response, next: NextFunction) => {
        const { authorization } = request.headers;
        
        if (!authorization) {
            return response.status(401).json({ error: "Token is missing!" })
        }

        const token = authorization.replace('Bearer', '').trim()

        try {
            const verificationResponse = jwt.verify(token, config.server.JWT_SECRET) as DataStoredInToken

            const user = await userService.findOne(verificationResponse.id)
            
            request.user = {
                id: user.id,
                email: user.email,
                username: user.username
            }

            return next()
        } catch (error) {
            return response.status(401).json(error.message)
        }
    }
}