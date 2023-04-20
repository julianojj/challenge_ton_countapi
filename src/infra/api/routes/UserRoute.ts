import { Express, NextFunction, Request, Response, Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { GetUserController } from '../controllers/GetUserController'

export class UserRoute {
    private router: Router

    constructor(
        private readonly app: Express,
        private readonly createUserController: CreateUserController,
        private readonly getUser: GetUserController
    ) {
        this.router = Router()
        app.use(this.router)
    }

    init(): void {
        this.router.post('/users', (req: Request, res: Response, next: NextFunction) => {
            return this.createUserController.handle(req, res, next)
        })

        this.router.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
            return this.getUser.handle(req, res, next)
        })
    }
}
