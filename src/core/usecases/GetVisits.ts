import { CounterGateway } from '../../infra/adapters/CounterGateway'
import { Counter } from '../domain/Counter'
import { ValidationException } from '../exceptions/ValidationException'

export class GetVisits {
    constructor(
        readonly counterGateway: CounterGateway
    ) { }

    async execute(url: string): Promise<GetVisitsOutput> {
        if (!url) throw new ValidationException('URL cannot be empty')
        const response = await this.counterGateway.get(url)
        const counter = new Counter(response.hit, response.url)
        return {
            url: counter.url,
            visits: counter.count
        }
    }
}

export type GetVisitsOutput = {
    url: string,
    visits: number
}
