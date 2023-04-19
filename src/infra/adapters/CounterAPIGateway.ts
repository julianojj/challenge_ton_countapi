import { request } from '../../../tests/request'
import { ValidationException } from '../../core/exceptions/ValidationException'
import { CounterGateway } from './CounterGateway'


export class CounterAPIGateway implements CounterGateway {
    async hit(url: string): Promise<any> {
        const response = await request(
            `https://api.countapi.xyz/hit/${url}/visits`,
            'GET'
        )
        const status = response.status
        if (status !== 200) throw new ValidationException(`Error to hit ${url}`)
        return {
            url,
            hit: response.data.value
        }
    }

    async get(url: string): Promise<any> {
        const response = await request(
            `https://api.countapi.xyz/get/${url}/visits`,
            'GET'
        )
        const status = response.status
        if (status !== 200) throw new ValidationException(`Error to get ${url}`)
        return {
            url,
            hit: response.data.value
        }
    }
}
