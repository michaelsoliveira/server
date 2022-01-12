import bcrypt from "bcrypt"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
import { IUserRequest } from "src/interfaces/IUserRequest"
import { getRepository, Repository, getConnection } from "typeorm"
import { User } from "../entities/User"

export interface UserRequest {
    username: string,
    email: string,
    password: string
}

class UserService {

    async create({ username, email, password }: UserRequest): Promise<User | Error> {
        const userRepository = getRepository(User)
        const userExists = await userRepository.findOne({ where: { email } })

        if (userExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = userRepository.create({ username, email, password: passwordHash })

        await user.save()

        return user
    }

    async getAll(): Promise<User[]> {
        const userRepository = getRepository(User);
        return userRepository.find();
    };

    async findOne(userAuthenticated: DataStoredInToken): Promise<User> {
        const user = await getRepository(User).findOne(userAuthenticated.id);
        if (!user) throw new Error("User not Found");

        return user;
    }
}

export default new UserService()