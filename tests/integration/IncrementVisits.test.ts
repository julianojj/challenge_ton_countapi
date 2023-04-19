import { GetVisits } from '../../src/core/usecases/GetVisits'
import { IncrementVisits } from '../../src/core/usecases/IncrementVisits'
import { FakeCounterAPIGateway } from '../../src/infra/adapters/FakeCounterGateway'

const url = 'ton.com.br'

test('Should Increment Visits', async () => {
    const counterGateway = new FakeCounterAPIGateway()
    const incrementVisits = new IncrementVisits(counterGateway)
    await incrementVisits.execute(url)
    const getVisits = new GetVisits(counterGateway)
    const output = await getVisits.execute('ton.com.br')
    expect(output.visits).toBe(1)
})
