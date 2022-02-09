import bcrypt from "bcrypt"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
import { getRepository, Repository, getConnection } from "typeorm"
import { User } from "../entities/User"

export interface UserRequest {
    username: string,
    email: string,
    password: string
}

class UserService {

    async create(data: any): Promise<User> {
        const userRepository = getRepository(User)
        const userExists = await userRepository.findOne({ where: { email: data?.email } })

        if (userExists) {
            throw new Error("Já existe um usuário cadastrado com este e-mail")
        }

        const passwordHash = await bcrypt.hash(data?.password, 10)

        const preparedData = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            provider: data?.provider,
            idProvider: data?.idProvider
        }

        const user = userRepository.create(preparedData)

        await user.save()

        return user
    }

    async update(id: string, data: any): Promise<User> {
        const userRepository = getRepository(User)
        const userExists = await userRepository.findOne({ where: { id } })

        if (!userExists) {
            throw new Error("Usuário não localizado")
        }

        const passwordHash = await bcrypt.hash(data?.password, 10)

        const preparedData = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            provider: data?.provider,
            idProvider: data?.idProvider
        }

        await userRepository.update(id, preparedData)

        return this.findOne(id)
    }

    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        const userRepository = getRepository(User)
        const userData = await this.findWithPassword(id)

        if (!userData) {
            throw new Error("Usuário não localizado")
        }
        const validPassword = await bcrypt.compare(oldPassword, userData.password)
        console.log(validPassword)

        if (!validPassword) {
            throw new Error("Senha informada não corresponde com a cadastrada")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        const preparedData = {
            username: userData?.username,
            email: userData?.email,
            password: passwordHash,
            provider: userData?.provider,
            idProvider: userData?.idProvider
        }

        console.log(preparedData)

        await userRepository.update(id, preparedData)

        return this.findOne(id)
    }

    async getAll(): Promise<User[]> {
        const userRepository = getRepository(User);
        return userRepository.find();
    };

    async findOne(requestId: string): Promise<User> {
        const user = await getRepository(User).findOne({ where: { id: requestId } });
        if (!user) throw new Error("User not Found"); 

        return user
    }

    async findByKey(key: string, value: string): Promise<User> {
        const result = await getRepository(User).findOne({ where: { [key]: value } })

        if (!result) throw new Error("User not found")

        return result
    }

    async findByProvider(provider: string, idProvider: string): Promise<any> {
        const query = await getRepository(User).createQueryBuilder("user")
        const data =
            query.where("user.provider = :provider", { provider })
                .andWhere("user.idProvider = :idProvider", { idProvider })

        return data.getOne()
    }

    async findWithPassword(id: string) {
        const userRepository = await getRepository(User).createQueryBuilder("users")
        const user = await userRepository
            .select([
                "users.id",
                "users.username",
                "users.password",
                "users.email",
                "users.provider",
                "users.idProvider"
            ])
            .where("users.id = :id", { id })
            .getOne()
        
        return user
    }
}

export default new UserService()