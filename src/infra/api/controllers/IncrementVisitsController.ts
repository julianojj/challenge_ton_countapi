import { NextFunction, Request, Response } from 'express'
import { IncrementVisits } from '../../../core/usecases/IncrementVisits'

export class IncrementVisitsController {
    constructor(
        private readonly incrementVisits: IncrementVisits
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const url = req.params.url
            await this.incrementVisits.execute(String(url))
            return res.status(204).end()
        } catch (err) {
            next(err)
        }
    }
}
