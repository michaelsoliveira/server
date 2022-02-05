import { CategoriaEspecie } from "src/entities/CategoriaEspecie";
import { Especie } from "../entities/Especie";
import { getRepository } from "typeorm";

export interface EspecieType {
    nome: string;
    nomeOrgao: string;
    nomeCientifico: string;
    categoria?: CategoriaEspecie
}

class EspecieService {
    async create(data: EspecieType): Promise<Especie> {
        const repositoryEspecie = getRepository(Especie)
        const especieExists = await repositoryEspecie.findOne({ where: { nome: data.nome } })

        if (especieExists) {
            throw new Error('Já existe uma espécie cadastrada com este nome')
        }

        const especie = repositoryEspecie.create(data)
        await especie.save()

        return especie
    }

    async update(id: string, data: EspecieType): Promise<Especie> {
        await getRepository(Especie).update(id, data)

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await getRepository(Especie).delete(id)
            .then(response => {
                console.log(response)
            })
    }

    async getAll(): Promise<Especie[]> {
        const especies = await getRepository(Especie).find()

        return especies
    }

    async findById(id: string) : Promise<any> {
        const especie = await getRepository(Especie).findOne({ where: { id } })

        return especie
    }
}

export default new EspecieService