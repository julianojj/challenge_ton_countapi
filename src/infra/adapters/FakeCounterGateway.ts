import { Counter } from '../../core/domain/Counter'
import { CounterGateway } from './CounterGateway'

export class FakeCounterAPIGateway implements CounterGateway {
    counters: Counter[] = [
        new Counter(0, 'ton.com.br')
    ]

    async hit(url: string): Promise<void> {
        this.counters.map((hit) => {
            if (hit.url === url) {
                return hit.count++
            }
        })
    }   

    async get(url: string): Promise<Counter> {
        return this.counters.find((hit) => hit.url === url)
    }
}

type Hits = {
    url: string,
    hit: number
}
