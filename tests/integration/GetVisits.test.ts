import { GetVisits } from '../../src/core/usecases/GetVisits'
import { FakeCounterAPIGateway } from '../../src/infra/adapters/FakeCounterGateway'

test('Should Get Visits', async () => {
    const counterGateway = new FakeCounterAPIGateway()
    const getVisits = new GetVisits(counterGateway)
    const output = await getVisits.execute('ton.com.br')
    expect(output.count).toBe(1)
})
