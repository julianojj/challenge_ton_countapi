import { Express, NextFunction, Request, Response, Router } from 'express'
import { GetVisitsController } from '../controllers/GetVisitsController'
export class VisitsRoute {
    private router: Router

    constructor(
        private readonly app: Express,
        private readonly getVisitsController: GetVisitsController
    ) {
        this.router = Router()
        app.use(this.router)
    }

    async init(): Promise<void> {
        this.router.get('/visits/:url', (req: Request, res: Response, next: NextFunction) => {
            return this.getVisitsController.handle(req, res, next)
        })
    }
}
