import { CounterGateway } from './CounterGateway'

export class FakeCounterAPIGateway implements CounterGateway {
    hits: Hits[] = [
        {
            url: 'ton.com.br',
            hit: 0
        }
    ]

    async hit(url: string): Promise<any> {
        this.hits.map((hit) => {
            if (hit.url === url) {
                return hit.hit++
            }
        })
    }   

    async get(url: string): Promise<any> {
        return this.hits.find((hit) => hit.url === url)
    }
}

type Hits = {
    url: string,
    hit: number
}
