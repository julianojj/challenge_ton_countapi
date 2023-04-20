import { request } from '../request'

jest.mock('../request', () => {
    return {
        request: jest.fn((url, method) => {
            if (method === 'GET') {
                return Promise.resolve({
                    status: 200,
                    data: {
                        url,
                        visits: 1
                    }
                })
            }
            if (method === 'POST') {
                return Promise.resolve({
                    status: 204
                })
            }
        })
    }
})

afterAll(() => {
    jest.restoreAllMocks()
})

test('Should /visits/hit/:url', async () => {
    const response = await request(
        'http://localhost:3000/visits/hit/ton.com.br',
        'POST'
    )
    expect(response.status).toBe(204)
})

test('Should /visits/:url', async () => {
    const response = await request(
        'http://localhost:3000/visits/ton.com.br',
        'GET'
    )
    expect(response.status).toBe(200)
    expect(response.data.url).toBe('http://localhost:3000/visits/ton.com.br')
    expect(response.data.visits).toBe(1)
})
