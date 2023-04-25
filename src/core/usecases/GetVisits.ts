import { CounterGateway } from '../../infra/adapters/CounterGateway'
import { ValidationException } from '../exceptions/ValidationException'

export class GetVisits {
    constructor(
        readonly counterGateway: CounterGateway
    ) { }

    async execute(url: string): Promise<GetVisitsOutput> {
        if (!url) throw new ValidationException('URL cannot be empty')
        const counter = await this.counterGateway.get(url)
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
