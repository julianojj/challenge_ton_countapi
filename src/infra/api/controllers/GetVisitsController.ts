import { NextFunction, Request, Response } from 'express'
import { GetVisits } from '../../../core/usecases/GetVisits'

export class GetVisitsController {
    constructor(
        private readonly getVisits: GetVisits
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const url = req.params.url
            const output = await this.getVisits.execute(String(url))
            return res.status(200).json(output)
        } catch (err) {
            next(err)
        }
    }
}
