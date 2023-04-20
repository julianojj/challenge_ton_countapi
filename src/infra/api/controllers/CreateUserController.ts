import { NextFunction, Request, Response } from 'express'
import { CreateUser } from '../../../core/usecases/CreateUser'

export class CreateUserController {
    constructor(
        private readonly createUser: CreateUser
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const output = await this.createUser.execute(req.body)
            return res.status(200).json(output)
        } catch (err) {
            next(err)
        }
    }
}
