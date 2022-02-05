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
    access_token: string;
    expires_in: number;
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

        if (!user) throw new Error("Usuário informado não existe na base de dados")

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("A senha informada está incorreta")
        }

        const token = this.createToken(user)
        const refresh_token = this.createRefreshToken(user)

        const { access_token, expires_in } = token

        this.refreshTokens.push(refresh_token)

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                image: '',
                access_token,
                expires_in,
                refresh_token
            },
        }
    }

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60 * 2
        const secret = config.server.JWT_SECRET
        const DataStoredInToken: DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(DataStoredInToken, secret, { expiresIn })

        return {
            expires_in: expiresIn,
            access_token: token
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
            access_token: newAccessToken,
            refresh_token: newRefreshToken
        }
    }

    createCookie(tokenData: any) {
        return `Authorization=Bearer ${tokenData.access_token}; HttpOnly; Max-Age=${tokenData.expires_in}`;
    }
}

export default new AuthService()