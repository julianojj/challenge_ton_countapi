import express from 'express'
import { GetVisits } from './core/usecases/GetVisits'
import { CounterAPIGateway } from './infra/adapters/CounterAPIGateway'
import { GetVisitsController } from './infra/api/controllers/GetVisitsController'
import { VisitsRoute } from './infra/api/routes/VisitsRoute'

const app = express()

app.disable('x-powered-by')

app.use(express.json())

const counterGateway = new CounterAPIGateway()
const getVisits = new GetVisits(counterGateway)
const getVIsitsController = new GetVisitsController(getVisits)
new VisitsRoute(
    app,
    getVIsitsController
).init()

app.listen(3000)
