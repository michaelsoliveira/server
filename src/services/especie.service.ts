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

    async getAll(search?: any): Promise<Especie[]> {
        const query = getRepository(Especie).createQueryBuilder('especie')

        const especies = await query.select(['especie.id', 'especie.nome', 'especie.nomeOrgao', 'especie.nomeCientifico', 'categoria.id', 'categoria.nome'])
                        .leftJoin('especie.categoria', 'categoria')
                        .where('especie.nome ilike :q', { q: `%${search}%` })
                        .orderBy('especie.nome')
                        .getMany()
                        
        return especies
    }

    async getAllWithCategory(): Promise<Especie[]> {
        const query = getRepository(Especie).createQueryBuilder('especie')
        const especies = query.leftJoinAndSelect('especie.categoria', 'categoria').getMany()

        return especies
    }

    async findById(id: string) : Promise<any> {
        const especie = await getRepository(Especie).createQueryBuilder('especie')
            .leftJoinAndSelect('especie.categoria', 'categoria').where({ id }).getOne()

        return especie
    }
}

export default new EspecieService