import { NextFunction, Request, Response } from 'express'
import { GetUser } from '../../../core/usecases/GetUser'

export class GetUserController {
    constructor(
        private readonly getUser: GetUser
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const output = await this.getUser.execute(req.params.id)
            return res.status(200).json(output)
        } catch (err) {
            next(err)
        }
    }
}
