import { CounterGateway } from '../../infra/adapters/CounterGateway'
import { ValidationException } from '../exceptions/ValidationException'

export class IncrementVisits {
    constructor(
        readonly counterGateway: CounterGateway
    ) { }

    async execute(url: string): Promise<void> {
        if (!url) throw new ValidationException('URL cannot be empty')
        await this.counterGateway.hit(url)
    }
}
