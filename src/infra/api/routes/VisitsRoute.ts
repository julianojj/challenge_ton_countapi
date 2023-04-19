import { Express, NextFunction, Request, Response, Router } from 'express'
import { GetVisitsController } from '../controllers/GetVisitsController'
import { IncrementVisitsController } from '../controllers/IncrementVisitsController'
export class VisitsRoute {
    private router: Router

    constructor(
        private readonly app: Express,
        private readonly incrementVisitsController: IncrementVisitsController,
        private readonly getVisitsController: GetVisitsController
    ) {
        this.router = Router()
        app.use(this.router)
    }

    async init(): Promise<void> {
        this.router.post('/visits/hit/:url', (req: Request, res: Response, next: NextFunction) => {
            return this.incrementVisitsController.handle(req, res, next)
        })

        this.router.get('/visits/:url', (req: Request, res: Response, next: NextFunction) => {
            return this.getVisitsController.handle(req, res, next)
        })
    }
}
