// import { User } from "../entities/User"
import { Request, Response } from "express";
import especieService, { EspecieType } from "../services/especie.service";
import { Readable } from 'stream'
import readline from "readline";

export class EspecieController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            // const empresa = await EmpresaService.create({ razaoSocial, nomeFantasia, cnpj, respTecnico, creaResp, cep, endereco, complemento, municipio, estado, telefone, regAmbiental })
            const especie = await especieService.create(request.body)
            return response.json({
                error: false,
                especie,
                errorMessage: null
            })

        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                errorMessage: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
            const especie = await especieService.update(id, request.body)
            return response.json({
                error: false,
                especie,
                errorMessage: null
            })

        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                errorMessage: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await especieService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Especie deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                errorMessage: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const especies = await especieService.getAll()

            return response.json({
                error: false,
                especies,
                errorMessage: null
            })
        } catch(error) {
            return response.json({
                error: false,
                especies: [],
                errorMessage: null
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const especie = await especieService.findById(id)

            return response.json(especie)
        } catch(error) {
            return response.json(error.message)
        }
    }

    async importEspecie(request: Request, response: Response) {
        const especies: EspecieType[] = []

        try {
            if (request?.file === undefined) {
                return response.status(400).send("Please upload a CSV file!");
            }

            const readableFile = new Readable()
            readableFile.push(request.file?.buffer)
            readableFile.push(null)

            const especiesLine = readline.createInterface({
                input: readableFile
            })

            for await (const line of especiesLine) {
                const especieLineSplit = line.split(";")

                especies.push({
                    nome: especieLineSplit[0],
                    nomeOrgao: especieLineSplit[1],
                    nomeCientifico: especieLineSplit[2]
                })
            }
            
            especies.forEach(async (data, index) => {
                if (index > 0) {
                    await especieService.create(data)
                }
            })
        } catch (error) {
            return response.json(error.message)
        } 
        return response.json('Espécies Importadas com Sucesso!!!')
    }
}