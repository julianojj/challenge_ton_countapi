import express from 'express'
import { GetVisits } from './core/usecases/GetVisits'
import { IncrementVisits } from './core/usecases/IncrementVisits'
import { CounterAPIGateway } from './infra/adapters/CounterAPIGateway'
import { GetVisitsController } from './infra/api/controllers/GetVisitsController'
import { IncrementVisitsController } from './infra/api/controllers/IncrementVisitsController'
import { VisitsRoute } from './infra/api/routes/VisitsRoute'

const app = express()

app.disable('x-powered-by')

app.use(express.json())

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

app.listen(3000)
