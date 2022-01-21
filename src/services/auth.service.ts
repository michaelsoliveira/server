import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import { User } from "../entities/User"
import bcrypt from "bcrypt"
import { response } from "express"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
const config = require("../config")


export interface UserRequest {
    email: string,
    password: string
}

interface TokenData {
    accessToken: string;
    expiresIn: number;
}

class AuthService {
    public refreshTokens: string[]

    constructor() {
        this.refreshTokens = []
    }
    
    async execute({ email, password }: UserRequest) {
        const userRepository = await getRepository(User).createQueryBuilder("users")
        const user = await userRepository
            .select([
                "users.id",
                "users.username",
                "users.password",
                "users.email"
            ])
            .where("users.email = :email", { email })
            .getOne()

        if (!user) throw new Error("User does not exists")

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("User or Password incorrect")
        }

        const token = this.createToken(user)
        const refreshToken = this.createRefreshToken(user)

        this.refreshTokens.push(refreshToken)

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token,
            refreshToken
        }
    }

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60
        const secret = config.server.JWT_SECRET
        const DataStoredInToken: DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(DataStoredInToken, secret, { expiresIn })

        return {
            expiresIn,
            accessToken: token
        }
    }

    async getUserByJWT(token: string) {
        const secret = config.server.JWT_SECRET
        return jwt.verify(token, secret)
    }

    createRefreshToken(user: User) {
        const secret = config.server.JWT_REFRESH
        const DataStoredInToken: DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        return jwt.sign(DataStoredInToken, secret)
    }

    handleRefreshToken(refreshToken: string){
        const secret = config.server.JWT_REFRESH
        const user = jwt.verify(refreshToken, secret) as User

        if (!this.refreshTokens.includes(refreshToken)) {
            throw new Error('Refresh token is not valid')
        }

        this.refreshTokens = this.refreshTokens.filter((token) => token !== refreshToken)

        if (!user) {
            throw new Error("User is not Authenticated")    
        }

        const newAccessToken = this.createToken(user)
        const newRefreshToken = this.createRefreshToken(user)

        this.refreshTokens.push(newRefreshToken)

        return {
            token: newAccessToken,
            refreshToken: newRefreshToken
        }
    }

    createCookie(tokenData: TokenData) {
        return `Authorization=Bearer ${tokenData.accessToken}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export default new AuthService()