import { CounterGateway } from '../../infra/adapters/CounterGateway'
import { Counter } from '../domain/Counter'
import { ValidationException } from '../exceptions/ValidationException'

export class GetVisits {
    constructor(
        readonly counterGateway: CounterGateway
    ) { }

    async execute(url: string): Promise<any> {
        if (!url) throw new ValidationException('URL cannot be empty')
        const response = await this.counterGateway.hit(url)
        const counter = new Counter(response.hits, response.url)
        return counter
    }
}
