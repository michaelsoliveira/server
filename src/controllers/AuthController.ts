import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "src/entities/User";
import { getRepository } from "typeorm";
import authService from "../services/auth.service"

export interface BaseUser {
    email: string,
    password: string
}

let refreshTokens: string[] = []

export class AuthController {
    
    async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        
        try {
            const user = await authService.execute({ email, password })
            
            response.setHeader('Set-Cookie', [authService.createCookie(user.token)]);
            
            return response.json({
                error: false,
                errorMessage: null,
                data: user
            })

        } catch (error) {
            return response.status(403).json({
                error: true,
                errorMessage: error.message,
                user: null
            })
        }
    }

    async getUserByToken(request: Request, response: Response): Promise<Response> {
        const user = request.user

        // if (!user) {
        //     return response.status(400).json({ "Error": 'User not is Authenticated' })
        // }

        return response.status(200).json(request.user)
    }

    async refreshToken(request: Request, response: Response): Promise<Response> {
        const refreshToken = request.body.token

        if (!refreshToken) return response.status(401).json('You are not Authenticated')
        try {
            const newToken = authService.handleRefreshToken(refreshToken)   

            return response.json(newToken)
        } catch (error) {
            return response.status(401).json(error.message)
        }
    }
}