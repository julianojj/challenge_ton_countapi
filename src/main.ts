import cors from 'cors'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { ValidationException } from './core/exceptions/ValidationException'
import { CreateUser } from './core/usecases/CreateUser'
import { GetUser } from './core/usecases/GetUser'
import { GetVisits } from './core/usecases/GetVisits'
import { IncrementVisits } from './core/usecases/IncrementVisits'
import { Bcrypt } from './infra/adapters/Bcrypt'
import { CounterAPIGateway } from './infra/adapters/CounterAPIGateway'
import { CreateUserController } from './infra/api/controllers/CreateUserController'
import { GetUserController } from './infra/api/controllers/GetUserController'
import { GetVisitsController } from './infra/api/controllers/GetVisitsController'
import { IncrementVisitsController } from './infra/api/controllers/IncrementVisitsController'
import { UserRoute } from './infra/api/routes/UserRoute'
import { VisitsRoute } from './infra/api/routes/VisitsRoute'
import swaggerDocument from './infra/api/swagger'
import { UserRepositoryDatabase } from './infra/repository/UserRepositoryDatabase'

(async () => {
    const app = express()

    app.disable('x-powered-by')

    app.use(express.json())
    app.use(cors())
    app.use('/swagger', serve, setup(swaggerDocument))

    const counterGateway = new CounterAPIGateway()
    const userRepository = new UserRepositoryDatabase()
    await userRepository.init()
    const hasher = new Bcrypt()
    const getVisits = new GetVisits(counterGateway)
    const incrementVisits = new IncrementVisits(counterGateway)
    const getVisitsController = new GetVisitsController(getVisits)
    const incrementVisitsController = new IncrementVisitsController(incrementVisits)
    const createUser = new CreateUser(userRepository, hasher)
    const getUser = new GetUser(userRepository)
    const createUserController = new CreateUserController(createUser)
    const getUserController = new GetUserController(getUser)

    new VisitsRoute(
        app,
        incrementVisitsController,
        getVisitsController
    ).init()

    new UserRoute(
        app,
        createUserController,
        getUserController
    ).init()

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({
            code: 404,
            message: 'resource not found'
        })
        next()
    })

    app.use((
        err: Error
            & ValidationException,
        req: Request,
        res: Response,
        next: NextFunction) => {
        const code = err.code || 500
        const message = err.message || 'internal server error'
        res.status(code).json({
            code,
            message
        })
        next()
    })

    app.listen(3000)
})()
