import { Counter } from '../../core/domain/Counter'

export interface CounterGateway {
    hit(url: string): Promise<void>
    get(url: string): Promise<Counter>
}
