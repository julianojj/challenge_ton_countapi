import { CounterGateway } from './CounterGateway'

export class FakeCounterAPIGateway implements CounterGateway {
    async hit(url: string): Promise<any> {
        return {
            url,
            hits: 1
        }
    }   
}
