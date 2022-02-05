// import { User } from "../entities/User"
import { Request, Response } from "express";
import EmpresaService from "../services/empresa.service";

export class EmpresaController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const empresa = await EmpresaService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                empresa,
                errorMessage: null
            })

        } catch (error) {
            return response.json({
                error: true,
                empresa: null,
                errorMessage: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
             const empresa = await EmpresaService.update(id, request.body, request.user?.id)
             
            return response.json({
                error: false,
                empresa,
                errorMessage: null
            })

        } catch (error) {
            return response.json({
                error: true,
                empresa: null,
                errorMessage: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await EmpresaService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Empresa deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                empresa: null,
                errorMessage: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const empresas = await EmpresaService.getAll(request.user?.id)

            return response.json({
                error: false,
                empresas,
                errorMessage: null
            })
        } catch(error) {
            return response.json({
                error: false,
                empresas: [],
                errorMessage: null
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const empresa = await EmpresaService.findOne(id)

            return response.json(empresa)
        } catch(error) {
            return response.json(error.message)
        }
    }
}