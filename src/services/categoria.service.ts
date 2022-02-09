import { CategoriaEspecie } from "../entities/CategoriaEspecie";
import { getRepository } from "typeorm";

export interface CategoriaType {
    nome: string;
    criterioFuste?: number;
    criterioDminc?: number;
    criterioDmaxc?: number;
    criterioNMin?: number;
    criterioPercMin?: number;
    preservar?: boolean;
    criterioAltura?: number;
    criterioVolume?: number;
}

class CategoriaService {
    async create(data: CategoriaType): Promise<CategoriaEspecie> {
        const repositoryCategoria = getRepository(CategoriaEspecie)
        const categoriaExists = await repositoryCategoria.findOne({ where: { nome: data.nome } })

        if (categoriaExists) {
            throw new Error('Já existe uma categoria cadastrada com este nome')
        }

        const categoria = repositoryCategoria.create(data)
        await categoria.save()

        return categoria
    }

    async update(id: string, data: CategoriaType): Promise<CategoriaEspecie> {
        await getRepository(CategoriaEspecie).update(id, data)

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await getRepository(CategoriaEspecie).delete(id)
            .then(response => {
                console.log(response)
            })
    }

    async getAll(): Promise<CategoriaEspecie[]> {
        const categorias = await getRepository(CategoriaEspecie).find()

        return categorias
    }

    async search(q: any) {
        const query = await getRepository(CategoriaEspecie)
                .createQueryBuilder("CategoriaEspecie")
                .where("CategoriaEspecie.nome ILIKE :q", { q: `%${q}%` })
                .getMany()
        return query
    }

    async findById(id: string) : Promise<any> {
        const categoria = await getRepository(CategoriaEspecie).findOne({ where: { id } })

        return categoria
    }
}

export default new CategoriaService