import { request } from '../../../tests/request'
import { Counter } from '../../core/domain/Counter'
import { ValidationException } from '../../core/exceptions/ValidationException'
import { CounterGateway } from './CounterGateway'


export class CounterAPIGateway implements CounterGateway {
    async hit(url: string): Promise<void> {
        const response = await request(
            `https://api.countapi.xyz/hit/${url}/visits`,
            'GET'
        )
        const status = response.status
        if (status !== 200) throw new ValidationException(`Error to hit ${url}`)
    }

    async get(url: string): Promise<Counter> {
        const response = await request(
            `https://api.countapi.xyz/get/${url}/visits`,
            'GET'
        )
        const status = response.status
        if (status !== 200) throw new ValidationException(`Error to get ${url}`)
        return new Counter(response.data.value, url)
    }
}
