import { Permission } from "../entities/Permission"
import { Role } from "../entities/Role"
import { User } from "../entities/User"
import { createConnection } from "typeorm"
import { Empresa } from "../entities/Empresa"
import { Umf } from "../entities/Umf"
import { Upa } from "../entities/Upa"
import { Ut } from "../entities/Ut"
import { CategoriaEspecie } from "../entities/CategoriaEspecie"
import { Especie } from "../entities/Especie"
import { Poa } from "../entities/Poa"
import { SituacaoPoa } from "../entities/SituacaoPoa"
import { TipoMotorista } from "../entities/TipoMotorista"
import { Projeto } from "../entities/Projeto"

const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: process.env.HOST,
            port: 5432,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Permission, Role, User, Empresa, Projeto, Umf, Upa, Ut, CategoriaEspecie, Especie],
            synchronize: true
        })
        console.log('Connected to Postgres')
    } catch (error) {
        console.error()
        throw new Error('Error to Connect to Postgres')
    }
}

main()