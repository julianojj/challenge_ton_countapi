import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { ValidationException } from './core/exceptions/ValidationException'
import { GetVisits } from './core/usecases/GetVisits'
import { IncrementVisits } from './core/usecases/IncrementVisits'
import { CounterAPIGateway } from './infra/adapters/CounterAPIGateway'
import { GetVisitsController } from './infra/api/controllers/GetVisitsController'
import { IncrementVisitsController } from './infra/api/controllers/IncrementVisitsController'
import { VisitsRoute } from './infra/api/routes/VisitsRoute'
import swaggerDocument from './infra/api/swagger'

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors())
app.use('/swagger', serve, setup(swaggerDocument))

const counterGateway = new CounterAPIGateway()
const getVisits = new GetVisits(counterGateway)
const incrementVisits = new IncrementVisits(counterGateway)
const getVisitsController = new GetVisitsController(getVisits)
const incrementVisitsController = new IncrementVisitsController(incrementVisits)

new VisitsRoute(
    app,
    incrementVisitsController,
    getVisitsController
).init()

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        code: 404,
        message: 'resource not found'
    })
    next()
})

app.use((
    err: Error &
    ValidationException,
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
