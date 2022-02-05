// import { User } from "../entities/User"
import { Request, Response } from "express";
import {
    CreatePermissionService,
    CreateRoleService,
    CreateRolePermissionService,
    CreateUserACLService
} from "../services/acl.service";
import UserService from "../services/user.service";

export interface BaseUser {
    username: string,
    email: string,
    password: string
}

export class UserController {
    async store(request : Request, response: Response) : Promise<Response> {
        const { username, email, password, provider, idProvider } = request.body;
        
        try {    
            const user = await UserService.create({ username, email, password, provider, idProvider })
            
            return response.json({
                error: false,
                user,
                errorMessage: null
            })

        } catch (error) {
            return response.json({
                error: true,
                user: null,
                errorMessage: error.message
            })
        }
    }

    async createPermission(request: Request, response: Response) {
        const { name, description } = request.body;

        const createPermissionService = new CreatePermissionService();

        const result = await createPermissionService.execute({ name, description });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async createRole(request: Request, response: Response) {
        const { name, description } = request.body;

        const createRoleService = new CreateRoleService();

        const result = await createRoleService.execute({ name, description });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async createRolePermission(request: Request, response: Response) {
        const { roleId } = request.params;
        const { permissions } = request.body;

        const createRolePermissionService = new CreateRolePermissionService();

        const result = await createRolePermissionService.execute({
            roleId,
            permissions,
        });

        if (result instanceof Error) {
        return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async createUserACL(request: Request, response: Response) {
        const { permissions, roles } = request.body;
        const { id } = request.user;

        const createUserACLService = new CreateUserACLService();

        const result = await createUserACLService.execute({
        id,
        permissions,
        roles,
        });

        if (result instanceof Error) {
        return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async findProvider(request: Request, response: Response): Promise<any> {
        const { provider, idProvider }: any = request.query
        
        try {
            const user = await UserService.findByProvider(provider, idProvider)
            
            return response.json(user)
        } catch (error) {
            return response.json(error)
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            let users = await UserService.getAll()

            return response.json(users)
        } catch(error) {
            return response.json(error.message)
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            let users = await UserService.findOne(id)

            return response.json(users)
        } catch(error) {
            return response.json(error.message)
        }
    }
}