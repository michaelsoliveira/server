import { Empresa } from "../entities/Empresa";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

interface EmpresaRequest {
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: string,
    respTecnico: string,
    creaResp: string,
    cep: string,
    endereco: string,
    complemento: string,
    municipio: string,
    estado: string,
    telefone: string,
    regAmbiental: string
}

class EmpresaService {
    async create(data: EmpresaRequest, userId: any): Promise<Empresa | any> {
        const repositoryEmpresa = getRepository(Empresa)
        const empresaExists = await repositoryEmpresa.findOne({ where: { razaoSocial: data?.razaoSocial } })
        
        if (empresaExists) {
            throw new Error("Já existe uma empresa cadastrado com estas informações")
        }
        const user = await this.getUser(userId)

        const withUser = {
            user,
            ...data
        }

        const empresa = repositoryEmpresa.create(withUser)

        await empresa.save()
        
        return empresa
    }

    async getUser(id: string) {
        const user = await getRepository(User).findOne(id)
        
        return user
    }

    async update(id: string, data: any, userId: any): Promise<Empresa> {
        
        const user = await this.getUser(userId)
        
        const withUser = {
            user,
            ...data
        }
        await getRepository(Empresa).update(id, withUser);

        return this.findOne(id)
        // return userData
    }

    async delete(id: string): Promise<void> {
        await getRepository(Empresa).delete(id)
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: any): Promise<Empresa[]> {
        
        let query = getRepository(Empresa).createQueryBuilder("empresa")
                    .innerJoinAndSelect("empresa.user", "user")
            query.where("user.id = :id", { id: userId })
        const empresas = await query.getMany()

        return empresas;
    }

    async findOne(id: string): Promise<Empresa> {
        const empresa = await getRepository(Empresa).findOne({ where: { id } });
        if (!empresa) throw new Error("Empresa não encontrada"); 

        return empresa
    }
}

export default new EmpresaService()